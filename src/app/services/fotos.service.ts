import { Injectable } from '@angular/core';
import { Cosas } from '../enums/cosas';
import { FirestoreService } from './firebase/firestore.service';
import { orderBy, Timestamp, where } from '@angular/fire/firestore';
import { SessionService } from './session.service';
import { CamaraService } from './camara.service';
import { StorageService } from './firebase/storage.service';
import { DatePipe } from '@angular/common';

export interface Foto {
  id: number,
  usuario: string,
  categoria: Cosas,
  url: string,
  votos: string[],
  fecha: Timestamp
}

export interface DatasetFoto {
  name: string;
  value: number;
  extra: string;
}

@Injectable({
  providedIn: 'root'
})
export class FotosService {
  private readonly table: string = 'fotos';
  private fotos: Foto[] = [];
  public dataSetLindas!: DatasetFoto[];
  public dataSetFeas!: DatasetFoto[];
  
  private galeria: Cosas = Cosas.feas;
  setGaleria(galeria: Cosas) { this.galeria = galeria; }
  getGaleria(): Cosas { return this.galeria; }

  constructor(
    private firestoreService: FirestoreService,
    private session: SessionService,
    private camara: CamaraService,
    private storage: StorageService,
    private datePipe: DatePipe
  ) {
    this.fetchAll();
  }

  public getFoto(i: number): Foto {
    return this.fotos.filter((f) => { return f.categoria == this.getGaleria() })[i];
  }

  public getFotoPropia(i: number): Foto {
    return this.getFotosPropias()[i];
  }

  public takeAndUploadFoto() {
    this.camara.sacarFoto()
    .then(async (photo) => {
      if (photo && photo.base64String) {
        let filename = this.session.getCurrentUser() + '_' + this.galeria + '_' + new Date();
        let url = await this.storage.uploadFile(this.camara.convertPhotoToFile(photo, filename));
        await this.pushOne(url);
      }
    })
  }

  public like(foto: Foto) {
    foto.votos = this.switchLike(foto);
    this.firestoreService.updateOne(this.table, where('id', '==', foto.id), { votos: foto.votos } );
  }

  private async pushOne(url_foto: string): Promise<void> {
    let foto: Foto = {
      id: this.getNextId(),
      usuario: this.session.getCurrentUser(),
      categoria: this.getGaleria(),
      url: url_foto,
      votos: [],
      fecha: new Date as unknown as Timestamp,
    };

    if (foto) {
      this.firestoreService.pushOne(this.table, foto);
    }
  } 

  private async fetchAll(): Promise<void> {
    this.firestoreService.fetchAll(this.table, orderBy('fecha', 'desc'))
    .subscribe((res) => {
      this.fotos = res as Foto[];
      this.dataSetFeas = this.mapearFotos(this.filtrarPorCategoria(this.fotos, Cosas.feas));
      this.dataSetLindas = this.mapearFotos(this.filtrarPorCategoria(this.fotos, Cosas.lindas));
    });
  }

  public getFotos(): Foto[] {
    return this.fotos.filter((f) => { return f.categoria == this.getGaleria() });
  }

  public getFotosPropias(): Foto[] {
    return this.fotos.filter((f) => { return f.usuario == this.session.getCurrentUser() });
  }

  switchLike(foto: Foto): string[] {
    let usuarioActual = this.session.getCurrentUser();
    if (foto.votos.includes(usuarioActual)){
      return foto.votos.filter((usuario) => { return usuario != usuarioActual });
    } else {
      foto.votos.push(usuarioActual);
      return foto.votos;
    }
  }

  getNextId(): number {
    let id = 1;
    if (this.fotos && this.fotos.length > 0) {
      let ids = this.fotos.map((f) => { return f.id });
      id = Math.max(...ids) + 1;
    }
    return id;
  }

  filtrarPorCategoria(fotos: Foto[], categoria: Cosas): Foto[] {
    return fotos.filter((f) => { return f.categoria == categoria });
  }

  mapearFotos(fotos: Foto[]): DatasetFoto[] {
    return fotos.map((f) => {
      let info = f.usuario.split('@')[0] + ' | ' + this.datePipe.transform(f.fecha.seconds * 1000, 'dd/MM/yy HH:mm');
      return { "name": info, "value": f.votos.length, "extra": f.url }
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton } from '@ionic/angular/standalone';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { AuthenService } from '../../services/authen.service';
import { FotosService } from 'src/app/services/fotos.service';
import { Cosas } from 'src/app/enums/cosas';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
  standalone: true,
  imports: [IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, RouterLink]
})
export class InicioPage implements OnInit {
  cosas = Cosas;
  ocultar:boolean = false;
  mostrar:boolean = false;
  usuario:any;
  mostrarUser:boolean = false;
  dropdownOpen:boolean = false;

  constructor(private router: Router,
    private fotoService: FotosService,
    private auth:AuthenService) { }

  ngOnInit() {
    this.auth.DatosAutenticacion().subscribe({
      next: (email) => {
        if(email){
          this.usuario = email;
          this.mostrarUser = !!email;
        }
        else{
          this.usuario = email;
          this.mostrarUser = !!email;
        }
        this.ocultar = !!email;
        // this.mostrarS = !!email;
      },
      error: (error) => {
        console.error(error);
      }
    });
    this.router.events.subscribe(e => {
      if(e instanceof NavigationEnd){
        this.mostrar = false;
      }
    })
  }
  cerrarSesion(){
    this.auth.CerrarSesion().then(() => {
      this.router.navigate(['/login']);
    })
    .catch(e => console.log(e));
  }
  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  irGaleria(galeria: Cosas) {
    this.fotoService.setGaleria(galeria);
    this.router.navigate(['/galeria']);
  }
}

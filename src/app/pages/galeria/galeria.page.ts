import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonIcon, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonFooter, IonButton } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { cameraOutline, cloudUpload, thumbsUp, thumbsUpOutline, logOutOutline, arrowUndo, statsChartSharp, cameraSharp } from 'ionicons/icons';
import { FotosService } from 'src/app/services/fotos.service';
import { SessionService } from 'src/app/services/session.service';
import { RouterLink } from '@angular/router';
import { MotionHandlerService } from 'src/app/services/motion-handler.service';

@Component({
  selector: 'app-galeria',
  templateUrl: './galeria.page.html',
  styleUrls: ['./galeria.page.scss'],
  standalone: true,
  imports: [IonButton, IonFooter, IonCardContent, IonCardSubtitle, IonCardTitle, IonCardHeader, IonCard, IonIcon, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, RouterLink]
})
export class GaleriaPage implements OnInit {
  index: number = 0;
  blocked: boolean = false;
  moved: boolean = false;
  private intervalo?: any;

  constructor(
    public fotoService: FotosService,
    private session: SessionService,
    public motion: MotionHandlerService,
  ) {
    addIcons({ cameraSharp, arrowUndo, statsChartSharp, cameraOutline, logOutOutline, thumbsUp, thumbsUpOutline, cloudUpload });
  }

  takePhoto() {
    this.fotoService.takeAndUploadFoto();
  }

  usuarioVoto(votos: string[]): boolean {
    return votos.includes(this.session.getCurrentUser());
  }

  ngOnInit(): void {
    this.intervalo = setInterval(() => {
      if (!this.blocked){
        switch(this.motion.phoneStatus()){
          case 'NORMAL':
            this.moved = false;
            break;
          case 'UPWARDS':
            if (!this.moved) {
              this.moved = true;
              this.first();
            }
            break;
          case 'TILTED-L':
            if (!this.moved) {
              this.moved = true;
              this.next();
            }
            break;
          case 'TILTED-R':
            if (!this.moved) {
              this.moved = true;
              this.previous();
            }
            break;
        }
      }
    }, 100);
  }

  block() {
    this.blocked = !this.blocked;
  }

  next() {
    let len = this.fotoService.getFotos().length;
    if (len > this.index + 1) {
      this.index++;
    }
  }

  first(){
    this.index = 0;
  }

  previous(){
    if (this.index > 0) {
      this.index--;
    }
  }
}

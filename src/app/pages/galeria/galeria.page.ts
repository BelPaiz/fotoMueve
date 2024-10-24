import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonIcon, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonFooter, IonButton } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { cameraOutline, cloudUpload, thumbsUp, thumbsUpOutline, logOutOutline, arrowUndo, statsChartSharp, cameraSharp } from 'ionicons/icons';
import { FotosService } from 'src/app/services/fotos.service';
import { SessionService } from 'src/app/services/session.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-galeria',
  templateUrl: './galeria.page.html',
  styleUrls: ['./galeria.page.scss'],
  standalone: true,
  imports: [IonButton, IonFooter, IonCardContent, IonCardSubtitle, IonCardTitle, IonCardHeader, IonCard, IonIcon, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, RouterLink]
})
export class GaleriaPage {

  constructor(
    public fotoService: FotosService,
    private session: SessionService
  ) {
    addIcons({ cameraSharp, arrowUndo, statsChartSharp, cameraOutline, logOutOutline, thumbsUp, thumbsUpOutline, cloudUpload });
  }

  takePhoto() {
    this.fotoService.takeAndUploadFoto();
  }

  usuarioVoto(votos: string[]): boolean {
    return votos.includes(this.session.getCurrentUser());
  }
}

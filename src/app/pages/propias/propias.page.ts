import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardContent, IonIcon, IonCardTitle, IonCardSubtitle, IonFooter } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { SessionService } from 'src/app/services/session.service';
import { FotosService } from 'src/app/services/fotos.service';
import { addIcons } from 'ionicons';
import { star, starOutline, arrowUndo } from 'ionicons/icons';

@Component({
  selector: 'app-propias',
  templateUrl: './propias.page.html',
  styleUrls: ['./propias.page.scss'],
  standalone: true,
  imports: [IonFooter, IonCardSubtitle, IonCardTitle, IonIcon, IonCardContent, IonCard, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, RouterLink]
})
export class PropiasPage {

  constructor(
    public fotoService: FotosService,
    private session: SessionService
  ) {
    addIcons({arrowUndo,star,starOutline});
  }

  usuarioVoto(votos: string[]): boolean {
    return votos.includes(this.session.getCurrentUser());
  }
}

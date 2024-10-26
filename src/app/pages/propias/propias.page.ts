import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardContent, IonIcon, IonCardTitle, IonCardSubtitle, IonFooter, IonButton } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { SessionService } from 'src/app/services/session.service';
import { FotosService } from 'src/app/services/fotos.service';
import { addIcons } from 'ionicons';
import { star, starOutline, arrowUndo } from 'ionicons/icons';
import { MotionHandlerService } from 'src/app/services/motion-handler.service';

@Component({
  selector: 'app-propias',
  templateUrl: './propias.page.html',
  styleUrls: ['./propias.page.scss'],
  standalone: true,
  imports: [IonButton, IonFooter, IonCardSubtitle, IonCardTitle, IonIcon, IonCardContent, IonCard, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, RouterLink]
})
export class PropiasPage {
  index: number = 0;
  blocked: boolean = false;
  moved: boolean = false;
  private intervalo?: any;

  constructor(
    public fotoService: FotosService,
    private session: SessionService,
    public motion: MotionHandlerService,
  ) {
    addIcons({arrowUndo,star,starOutline});
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

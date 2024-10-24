import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonFooter, IonIcon, IonButton } from '@ionic/angular/standalone';
import { LegendPosition, NgxChartsModule } from '@swimlane/ngx-charts';
import { Cosas } from 'src/app/enums/cosas';
import { FotosService } from 'src/app/services/fotos.service';
import { RouterLink } from '@angular/router';
import { addIcons } from 'ionicons';
import { arrowUndo, statsChartSharp } from 'ionicons/icons';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.page.html',
  styleUrls: ['./resultados.page.scss'],
  standalone: true,
  imports: [IonButton, IonIcon, IonFooter, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, NgxChartsModule, RouterLink]
})
export class ResultadosPage {
  cosas = Cosas;
  position: LegendPosition = LegendPosition.Below;
  display: Cosas = Cosas.lindas;

  dataLindas!: any[];
  dataFeas!: any[];

  constructor(public fotoService: FotosService) {
    this.display = fotoService.getGaleria();
    addIcons({arrowUndo,statsChartSharp});
  }

  switchDisplay(){
    this.display = this.display == Cosas.lindas ? Cosas.feas : Cosas.lindas ;
  }
}

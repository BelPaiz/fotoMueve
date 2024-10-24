import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { Router } from '@angular/router';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class SplashPage implements OnInit {
  animacion: boolean = false;

  constructor(
    public router: Router
  ) {   }

  ngOnInit() {
    setTimeout(()=>{
      this.animacion = true;
      setTimeout(()=>{
        this.router.navigateByUrl('inicio')
      }, 2000);
    }, 1000);
    
  }

}

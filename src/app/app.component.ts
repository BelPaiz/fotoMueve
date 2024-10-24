import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonApp, IonRouterOutlet, IonContent, IonTitle, IonToolbar, IonHeader } from '@ionic/angular/standalone';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonApp, IonRouterOutlet],
})
export class AppComponent implements OnInit{
  constructor(
    public router: Router
  ) {}

  ngOnInit(): void {
    this.router.navigateByUrl('splash');
  }
}

import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)), provideFirebaseApp(() => initializeApp({"projectId":"app-pps-01","appId":"1:220128409034:web:6c14e353e4924d55500b33","storageBucket":"app-pps-01.appspot.com","apiKey":"AIzaSyBQnjlSbqQsRSy7kIwDTIToM-AExNuVPDQ","authDomain":"app-pps-01.firebaseapp.com","messagingSenderId":"220128409034"})), provideAuth(() => getAuth()), provideFirestore(() => getFirestore()),
  ],
});

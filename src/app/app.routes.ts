import { Routes } from '@angular/router';
import { canActivate, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'splash',
    pathMatch: 'full',
  },
  {
    path: 'inicio',
    loadComponent: () => import('./pages/inicio/inicio.page').then( m => m.InicioPage), ...canActivate(() => redirectUnauthorizedTo(['/login']))
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'registro',
    loadComponent: () => import('./pages/registro/registro.page').then( m => m.RegistroPage)
  },
  {
    path: 'splash',
    loadComponent: () => import('./pages/splash/splash.page').then( m => m.SplashPage)
  },
  {
    path: 'galeria',
    loadComponent: () => import('./pages/galeria/galeria.page').then( m => m.GaleriaPage)
  },
  {
    path: 'resultados',
    loadComponent: () => import('./pages/resultados/resultados.page').then( m => m.ResultadosPage)
  },
  {
    path: 'propias',
    loadComponent: () => import('./pages/propias/propias.page').then( m => m.PropiasPage)
  },

];

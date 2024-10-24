import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { AuthenService } from '../services/authen.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class RegistroPage implements OnInit {

  email:string = "";
  clave:string = "";
  error:string = "";
  infom:string = "";
  infop:string = "";
  ocultarm:boolean = true;
  ocultarp:boolean = true;

  constructor(private auth:AuthenService,
    private router:Router) { }


  registro(){
    this.error = "";
    this.ocultarm = true;
    this.ocultarp = true;
    if(this.email === '' || this.clave === ''){
      this.error = "Ingrese email y contraseña";
    }
    else{
      this.auth.Registro(this.email, this.clave)
      .then((resp) => {
        console.log(resp);
        this.router.navigate(['/inicio']);
      }).catch((e) => {
        switch (e.code) {
          case 'auth/invalid-email':
            this.error = "Email incorrecto";
            break;
          case 'auth/email-already-in-use':
            this.error = "El email ya se encuentra registrado";
            break;
          case 'auth/weak-password':
            this.error = "Contraseña débil";
            break;
          default:
            this.error = "Ocurrió un error inesperado";
            break;
        }
        console.log(e);
      });
   }
    this.email = '';
    this.clave ='';
  }
  infoEmail(){
    this.ocultarp = true;
    this.error = "";
    this.infom = "example@mail.com";
    this.ocultarm = !this.ocultarm;
  }
  infoPass(){
    this.ocultarm = true;
    this.error = "";
    this.infop = "<ul><li>mínimo 6 caracteres</li><li>pueden utilizarse números, letras y/o caracteres especiales</li></ul>";
    this.ocultarp = !this.ocultarp;
  }
  login(){
    this.router.navigate(['/login']);
  }
  
  ngOnInit() {
  }

}

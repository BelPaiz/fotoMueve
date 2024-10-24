import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonLabel } from '@ionic/angular/standalone';
import { AuthenService } from '../services/authen.service';
import { FirestoreService } from '../services/firestore.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonLabel, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class LoginPage implements OnInit {

  email:string = "";
  clave:string = "";
  error:string = "";
  usuarioLogueado:string = "";

  usuarioLog: string[] = ["belen@mail.com", "c@mail.com", "h@mail.com"];
  passLog: string[] = ["123456", "123456", "123456"]

  constructor(private auth: AuthenService,
    private firestore: FirestoreService,
    private router:Router
  ) { }

  ngOnInit() {
  }

  login(){
    this.auth.Login(this.email, this.clave)
    .then((res) => {
      if(res.user.email != null) this.usuarioLogueado = res.user.email;
      this.firestore.loginRegister(this.usuarioLogueado);
      this.router.navigate(['/inicio']);
    }).catch((e) => {if(e = 'auth/invalid-credential'){
      this.error = "Usuario y/o contraseña invalido"
      console.log(this.error)
    }});
    this.email = "";
    this.clave = "";
  }

  rellenarUsuario(index:number){
    this.email = this.usuarioLog[index];
    this.clave = this.passLog[index];
  }

  registrarse(){
    this.router.navigate(['/registro']);
  }

}

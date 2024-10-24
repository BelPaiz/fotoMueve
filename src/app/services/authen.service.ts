import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, getAuth, onAuthStateChanged} from '@angular/fire/auth';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthenService {

  private authState = new BehaviorSubject<string | null>(null);
  constructor(public auth: Auth) {
    onAuthStateChanged(this.auth, (user) => {
      if (user?.email) {
        this.authState.next(user.email);
      } else {
        this.authState.next(null);
      }
    });
  }

  Registro(email:string, password:string){
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  Login(email:string, pass:string){
    return signInWithEmailAndPassword(this.auth, email, pass);
  }

  CerrarSesion(){
    return signOut(this.auth);
  }

  DatosAutenticacion(){
  return this.authState.asObservable();
  }
}
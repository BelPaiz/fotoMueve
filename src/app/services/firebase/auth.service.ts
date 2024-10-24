import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, sendEmailVerification } from '@angular/fire/auth';
import { Persistence, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { inMemoryPersistence, setPersistence } from 'firebase/auth';

export interface LoginResult {
  error: boolean;
  content: any;
}

export interface RegisterResult {
  error: boolean;
  msg: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: Auth) { }

  async login(email: string, password: string, persistence: Persistence = inMemoryPersistence): Promise<LoginResult> {
    return setPersistence(this.auth, persistence)
      .then(() =>
        signInWithEmailAndPassword(this.auth, email, password)
        .then(
          async (userCredential) => {
            if (userCredential == null){
              return { error: true, content: userCredential };
            } else {
              return { error: false, content: userCredential };
            }
          }
        ).catch((e) => {
          return {error: true, content: e};
        })
      )
    .catch((e) => {
      return {error: true, content: e};
    });
  }

  async register(email: string, pwd: string, sendVerificationEmail: boolean = false, loginOnRegister: boolean = true): Promise<RegisterResult> {
    let result: RegisterResult = { error: true, msg: "Failed register." };
    let currentUser = this.auth.currentUser;

    return createUserWithEmailAndPassword(this.auth, email, pwd)
    .then(
      async (response) => {
        if (response.user !== null){
          result = { error: false, msg: "Successfull register." };
        }

        if (sendVerificationEmail && response.user.email !== null) {
          await sendEmailVerification(response.user);
        }

        if (!loginOnRegister) {
          await this.auth.updateCurrentUser(currentUser);
        }

        return result;
      }).catch((e) => {
        result.msg = e.code;
        return result
      });
  }

  async logout(): Promise<void> {
    return signOut(this.auth);
  }

}

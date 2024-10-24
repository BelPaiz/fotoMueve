import { Injectable } from '@angular/core';
import { browserLocalPersistence, inMemoryPersistence } from '@angular/fire/auth';
import { AuthService } from './firebase/auth.service';
import { Router } from '@angular/router';
import { LoaderService } from './loader.service';

export interface RegisterResult {
  error: boolean;
  msg: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private authService: AuthService,
    private loader: LoaderService,
    private router: Router,
  ) { }
  
  async login(email: string, password: string, remember: boolean = true): Promise<boolean> {
    let persistence = remember ? browserLocalPersistence : inMemoryPersistence ;
    this.loader.setLoading(true);

    return this.authService.login(email, password, persistence)
    .then((response) => {
        this.loader.setLoading(false);
        if (!response.error){
          this.router.navigateByUrl("/inicio");
        }
        return response.error;
    });
  }
  
  logout(): void {
    this.authService.logout()
    .then(() => {
      this.router.navigateByUrl("/login");
    });
  }
}

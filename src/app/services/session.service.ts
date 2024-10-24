import { Injectable } from '@angular/core';
import { AuthenService } from './authen.service';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private authen: AuthenService) { }


  public getCurrentUser(): string {
    return this.authen.currentUser ? this.authen.currentUser : '';
  }
}

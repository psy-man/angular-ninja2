import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isAuthorized = false;
  public authChanged = new BehaviorSubject(this.isAuthorized);

  toggleAuth() {
    this.isAuthorized = !this.isAuthorized;
    this.authChanged.next(this.isAuthorized);
  }
}

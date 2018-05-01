import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';

@Injectable()
export class AuthService {

  private loggedIn: boolean = false;
  redirectUrl: string;

  constructor() { }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  login(username:string, password: string): Observable<boolean> {
    // Make an http request, send username and password, get a user object back
    // from the server, and save the user object in this class
    return Observable.of(true).delay(1000).do(val => {
      this.loggedIn = true;
    });
  }

  logout(): void {
    this.loggedIn = false;
  }
}

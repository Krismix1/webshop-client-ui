import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import { TokenStorageService } from './../auth/token-storage.service';

@Injectable()
export class AuthService {

  private loggedIn: boolean = false;
  redirectUrl: string;

  constructor(private httpClient: HttpClient, private tokenStorage: TokenStorageService) { }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  login(username: string, password: string): Observable<any> {
    let formData = new FormData();
    formData.append('grant_type', 'password', );
    formData.append('scope', 'webclient');
    formData.append('username', username);
    formData.append('password', password);
    const basicAuth = btoa('webshopclient:mysecret');
    return this.httpClient.post('http://localhost:8082/oauth/token', formData, {
      headers: {
        'authorization': `Basic ${basicAuth}` // TODO: Make this a variable from environment object
      }
    }).shareReplay().map(result => {
      console.log(result);
      if (result && result.access_token) {
        console.log('success login');
        this.loggedIn = true;
        this.tokenStorage.saveToken(result.access_token);
        // TODO: Create a new request to retrieve the roles of the user
        return Observable.of(true).delay(500).do(val => {
        });
      } else {
        throw new Error("Invalid credentials")
      }
    });
    // Make an http request, send username and password, get a user object back
    // from the server, and save the user object in this class
  }

  logout(): void {
    this.loggedIn = false;
  }
}

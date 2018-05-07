import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import { TokenStorageService } from './../auth/token-storage.service';
import { AccessToken } from './../entities/access-token';
import { Principal } from './../entities/principal';
import { environment } from './../../environments/environment';

@Injectable()
export class AuthService {

  redirectUrl: string;
  private readonly _baseUrl = `${environment.authService}`;
  private user: Principal;

  constructor(private httpClient: HttpClient, private tokenStorage: TokenStorageService) { }

  isLoggedIn(): boolean {
    const token = this.tokenStorage.getToken();
    return token != undefined && token != null && token !== '';
  }

  login(username: string, password: string): Observable<any> {
    let formData = new FormData();
    formData.append('grant_type', 'password', );
    formData.append('scope', 'webclient');
    formData.append('username', username);
    formData.append('password', password);
    const basicAuth = btoa('webshopclient:mysecret');
    return this.httpClient.post<AccessToken>(`${this._baseUrl}/oauth/token`, formData, {
      headers: {
        'authorization': `Basic ${basicAuth}` // TODO: Make this a variable from environment object
      }
    }).shareReplay().map(result => {
      console.log(result);
      if (result && result.access_token) {
        this.tokenStorage.saveToken(result.access_token);
        // TODO: Create a new request to retrieve the roles of the user
        this.httpClient.get<Principal>(`${this._baseUrl}/user`).
          subscribe(res => {
            this.user = res;
          });
        return Observable.of(true);
      } else {
        throw new Error("Invalid credentials")
      }
    });
    // Make an http request, send username and password, get a user object back
    // from the server, and save the user object in this class
  }

  logout(): void {
    // this.loggedIn = false;
    this.tokenStorage.logout();
  }
}

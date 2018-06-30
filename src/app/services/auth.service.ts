import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/shareReplay';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { _throw } from "rxjs/observable/throw";
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
    const basicAuth = btoa(`${environment.jwtClient}:${environment.jwtSecret}`);
    return this.httpClient.post<AccessToken>(`${this._baseUrl}/oauth/token`, formData, {
      headers: {
        'authorization': `Basic ${basicAuth}`
      }
    }).shareReplay().map(result => {
      console.log(result);
      if (result && result.access_token) {
        this.tokenStorage.saveToken(result.access_token);
        // Create a new request to retrieve the roles of the user
        this.httpClient.get<Principal>(`${this._baseUrl}/user`).
          subscribe(res => {
            this.user = res;
          });
        return true;
      } else {
        console.log('DEBUG', {'debug': result})
        return _throw("No access token received.")
      }
    }).catch(this.handleError);
  }

  logout(): void {
    this.tokenStorage.discardToken();
  }

  private handleError(error: HttpErrorResponse): ErrorObservable {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An client-side or network error occurred:', JSON.stringify(error));
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      switch (error.status) {
        case 0:
          return _throw('No connection with the server.')
        case 401:
          return _throw('Invalid credentials.')
        default:
          console.warn('Error status not handled')
          break
      }
      console.error(`Backend returned code ${error.status}, `,
        `body was: ${JSON.stringify(error)}`)
    }
    // return an observable with a user-facing error message
    return _throw('Something bad happened. Please try again later.')
  }
}

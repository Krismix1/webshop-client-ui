import { Injectable } from '@angular/core'
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { TokenStorageService } from './../auth/token-storage.service'
import { AccessToken } from './../entities/access-token'
import { Account } from './../entities/account'
import { environment } from './../../environments/environment'
import { Observable , throwError } from 'rxjs'
import { shareReplay, map, catchError } from 'rxjs/operators'

@Injectable()
export class AuthService {

  redirectUrl: string
  private readonly _baseUrl = `${environment.authService}`
  private user: Account

  constructor(private httpClient: HttpClient, private tokenStorage: TokenStorageService) { }

  isLoggedIn(): boolean {
    const token = this.tokenStorage.getToken()
    if (!token) {
      return false
    }
    // check if token is still valid
    const tokenDate = this.tokenStorage.getTimestamp().valueOf()
    const currDate = new Date().valueOf()
    const elapsed = (currDate - tokenDate) / 1000
    return elapsed < token.expires_in
  }

  logout(): void {
    this.tokenStorage.clean()
  }

  // TODO: Add support to refresh token

  login(username: string, password: string): Observable<any> {
    const formData = new FormData()
    formData.append('grant_type', 'password')
    formData.append('username', username)
    formData.append('password', password)
    const basicAuth = btoa(`${environment.jwtClient}:${environment.jwtSecret}`)
    return this.httpClient.post<AccessToken>(`${this._baseUrl}/oauth/token`, formData, {
      headers: {
        'authorization': `Basic ${basicAuth}`
      }
    })
    .pipe(
      shareReplay(),
      map(result => {
        if (result && result.access_token) {
          this.tokenStorage.save(result)
          // Create a new request to retrieve the roles of the user
          this.httpClient.get<Account>(`${this._baseUrl}/user`).
            subscribe(res => {
              this.user = res
            })
          return true
        } else {
          console.log({ debug: result })
          return throwError('No access token received.')
        }
      }),
    catchError(this.handleError)
    )
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An client-side or network error occurred:', JSON.stringify(error))
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      switch (error.status) {
        case 0:
          return throwError('No connection with the server.')
        case 401:
          return throwError('Invalid credentials.')
        default:
          console.warn('Error status not handled')
          break
      }
      console.error(`Backend returned code ${error.status}, `,
        `body was: ${JSON.stringify(error)}`)
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened. Please try again later.')
  }
}

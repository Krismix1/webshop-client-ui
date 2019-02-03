import { Injectable } from '@angular/core'
import {
  HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse, HttpHeaders, HttpEvent
} from '@angular/common/http'
import { Observable } from 'rxjs/Observable'
import { Router } from '@angular/router'
import { TokenStorageService } from './../../auth/token-storage.service'
import 'rxjs/add/operator/do'

const TOKEN_HEADER_KEY = 'Authorization'
const CONTENT_TYPE_HEADER = 'Content-Type'

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private tokenStorageService: TokenStorageService, private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('auth')
    if ((req.url.toLowerCase().includes('oauth/token') && req.method.toLowerCase() === 'post')) {
    } else {
      const token = this.tokenStorageService.getToken()
      if (token) {
        req = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, `Bearer ${token.access_token}`) })
        // TODO: Is it bad that we mutate the request directly?
        req.headers.set(TOKEN_HEADER_KEY, `Bearer ${token}`)
      }
    }
    return next.handle(req).do(
      (err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this.router.navigate(['error'])
          }
        }
      }
    )
  }
}

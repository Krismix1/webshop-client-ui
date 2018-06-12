import { Injectable } from '@angular/core';
import {
  HttpInterceptor, HttpRequest, HttpHandler, HttpSentEvent, HttpHeaderResponse, HttpProgressEvent,
  HttpResponse, HttpUserEvent, HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { TokenStorageService } from './auth/token-storage.service';
import 'rxjs/add/operator/do';

const TOKEN_HEADER_KEY = 'Authorization';
const CONTENT_TYPE_HEADER = 'Content-Type';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private TokenStorageService: TokenStorageService, private router: Router) { }

  intercept(req: any, next: HttpHandler): any {
    let authReq = req;
    if (req.url.toLowerCase().includes('oauth/token') && req.method.toLowerCase() === 'post') {
      console.log('Intercepted login request.')
    } else {
      const token = this.TokenStorageService.getToken();
      if (token != null) {
        authReq = req.clone({
          headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token)
                    .set(CONTENT_TYPE_HEADER, 'application/json')
        });
      }
    }
    return next.handle(authReq).do(
      (err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
            this.router.navigate(['error']);
          }
        }
      }
    );
  }
}

import { Injectable } from '@angular/core'
import {
  HttpInterceptor, HttpRequest, HttpHandler, HttpEvent
} from '@angular/common/http'
import { Observable } from 'rxjs'

const ACCEPT_HEADER = 'Accept'
const CONTENT_TYPE_HEADER = 'Content-Type'
const APPLICATION_JSON_MIME_TYPE = 'application/json'

@Injectable()
export class ContentTypeInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // TODO: Filter which requests should be modified
    // TODO: Is it bad that we mutate the request directly?
    req.headers.set(ACCEPT_HEADER, APPLICATION_JSON_MIME_TYPE)
      .set(CONTENT_TYPE_HEADER, APPLICATION_JSON_MIME_TYPE)
    return next.handle(req)
  }
}

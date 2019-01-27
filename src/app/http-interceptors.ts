/* "Barrel" of Http Interceptors */
import { HTTP_INTERCEPTORS } from '@angular/common/http'

import { AuthInterceptor } from './auth-interceptor'

/** Http interceptor providers in outside-in order */
export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  // This required setting tells Angular that HTTP_INTERCEPTORS is a token for a
  // multiprovider that injects an array of values, rather than a single value.
]

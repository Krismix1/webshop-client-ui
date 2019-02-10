import { Injectable } from '@angular/core'
import { AccessToken } from '../entities/access-token'

const ACCESS_TOKEN_KEY = 'ACCESS_TOKEN'
const REFRESH_TOKEN_KEY = 'REFRESH_TOKEN'
const EXPIRES_KEY = 'EXPIRES'
const SCOPE_KEY = 'SCOPE'
const TOKEN_TYPE_KEY = 'TOKEN_TYPE'
const JTI_KEY = 'JTI'
const TOKEN_TIMESTAMP_KEY = 'TOKEN_TIMESTAMP'

@Injectable()
export class TokenStorageService {

  constructor () { }

  save (token: AccessToken) {
    localStorage.setItem(ACCESS_TOKEN_KEY, token.access_token)
    localStorage.setItem(REFRESH_TOKEN_KEY, token.refresh_token)
    localStorage.setItem(EXPIRES_KEY, token.expires_in.toString())
    localStorage.setItem(SCOPE_KEY, token.scope)
    localStorage.setItem(TOKEN_TYPE_KEY, token.token_type)
    localStorage.setItem(JTI_KEY, token.jti)
    localStorage.setItem(TOKEN_TIMESTAMP_KEY, new Date().getTime().toString())
  }

  clean () {
    localStorage.removeItem(ACCESS_TOKEN_KEY)
    localStorage.removeItem(REFRESH_TOKEN_KEY)
    localStorage.removeItem(EXPIRES_KEY)
    localStorage.removeItem(SCOPE_KEY)
    localStorage.removeItem(TOKEN_TYPE_KEY)
    localStorage.removeItem(JTI_KEY)
    localStorage.removeItem(TOKEN_TIMESTAMP_KEY)
  }

  getToken (): AccessToken {
    const token = new AccessToken()
    token.access_token = localStorage.getItem(ACCESS_TOKEN_KEY)
    token.refresh_token = localStorage.getItem(REFRESH_TOKEN_KEY)
    token.expires_in = parseInt(localStorage.getItem(EXPIRES_KEY), 10)
    token.scope = localStorage.getItem(SCOPE_KEY)
    token.token_type = localStorage.getItem(TOKEN_TYPE_KEY)
    token.jti = localStorage.getItem(JTI_KEY)
    if (!(token.access_token && token.refresh_token && token.expires_in
          && token.scope)) {
      // jti and token_type should not matter for determining
      // whether or not a user is online
      return null
    }
    return token as AccessToken
  }

  getTimestamp (): Date {
    return new Date(parseInt(localStorage.getItem(TOKEN_TIMESTAMP_KEY), 10))
  }
}

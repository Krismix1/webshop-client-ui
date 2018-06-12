import { Injectable } from '@angular/core';

const TOKEN_KEY = 'AuthToken';

@Injectable()
export class TokenStorageService {

  constructor() { }

  discardToken() {
    window.sessionStorage.removeItem(TOKEN_KEY);
  }

  saveToken(token: string) {
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  getToken(): string {
    return window.sessionStorage.getItem(TOKEN_KEY);
  }
}

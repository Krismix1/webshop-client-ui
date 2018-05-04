import { Injectable } from '@angular/core';

const TOKEN_KEY = 'AuthToken';

@Injectable()
export class TokenStorageService {

  constructor() { }

  logout() {
    window.sessionStorage.removeItem(TOKEN_KEY);
  }

  saveToken(token: string) {
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }
}

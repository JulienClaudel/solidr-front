import { Injectable } from '@angular/core';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }

  // Empty active sessions
  signOut(): void {
    window.sessionStorage.clear();
  }

  // Save the token in a session
  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  // Retrieve the token from the session
  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  // Save user in a session
  public saveUser(user): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  // Retrieve the user from the session
  public getUser(): any {
    return JSON.parse(sessionStorage.getItem(USER_KEY));
  }
}

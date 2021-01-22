import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:8080/solidr/api/login/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  // Login with email and password
  login(credentials): Observable<any> {
    return this.http.post(baseUrl + 'signin', {
      email: credentials.email,
      password: credentials.password
    }, httpOptions);
  }

  // Login with email, password and code for 2FA
  verifyTotp(code: string, credentials): Observable<any> {
    return this.http.post(baseUrl + 'verify-totp/' + code, {
      email: credentials.email,
      password: credentials.password
    }, httpOptions);
  }

  // Redirection to the forgot password
  forgotPassword(email: string): Observable<any> {
    return this.http.get(baseUrl + 'forgot-password/' + email);
  }

  resetPassword(token: string, password: string): Observable<any> {
    return this.http.put(baseUrl + 'reset-password/' + token, password);
  }
}

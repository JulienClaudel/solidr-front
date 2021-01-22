import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:8080/solidr/api/register/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http: HttpClient) { }

  // Register with secret and 2fa if the user activated it
  register(user): Observable<any> {
    return this.http.post(baseUrl + 'signup', {
      username: user.username,
      email: user.email,
      password: user.password,
      matchingPassword: user.matchingPassword,
      secret: user.secret,
      using2FA: user.using2FA
    }, httpOptions);
  }

  // Verify if the username exist in the BDD
  verifyUsername(username: string): Observable<any> {
    return this.http.get(baseUrl + 'verify-username/' + username);
  }

  // Verify if the mail exist in the BDD
  verifyEmail(email: string): Observable<any> {
    return this.http.get(baseUrl + 'verify-email/' + email);
  }

  // Send a new mail to the user to confirm his account
  verifyAccount(email: string): Observable<any> {
    return this.http.get(baseUrl + 'verify-account/' + email);
  }

  // Send a new mail to the user to confirm his account
  confirmAccount(token: string): Observable<any> {
    return this.http.put(baseUrl + 'confirm-account/', token);
  }
}

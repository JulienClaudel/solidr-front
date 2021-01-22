import { Injectable} from '@angular/core';
import { HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UserData} from '../model/userData';

const baseUrl = 'http://localhost:8080/solidr/api/profile/';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) {
  }

  // Get a new secret key for the 2fa of the user
  getSecret(): Observable<any> {
    return this.http.get(baseUrl + 'secret', { responseType: 'text' });
  }

  getUserByToken(token: string): Observable<any> {
    return this.http.get(baseUrl + 'user-token/' + token);
  }

  // Add information to the user profile
  addInformations(email: string, user: UserData): Observable<object> {
    return this.http.put(baseUrl + 'add-informations/' + email, user);
  }

  // Update information of the user profile
  updateProfile(email: string, user: UserData): Observable<object> {
    return this.http.put(baseUrl + 'update-profile/' + email, user);
  }

  // Verify if the code and secret code match
  verifyCode(code: string, secret: string): Observable<any> {
    return this.http.get(baseUrl + 'confirm-secret/' + code + '&' + secret);
  }

  // Deactivate 2FA in the user profile
  deactivate2FA(user: UserData): Observable<object> {
    return this.http.put(baseUrl + 'deactivate-2fa', user);
  }

  // Activate 2FA in the user profile
  activate2FA(user: UserData): Observable<object> {
    return this.http.put(baseUrl + 'activate-2fa', user);
  }

  // Close user account since the user profile
  closeAccount(user: UserData): Observable<object> {
    return this.http.put(baseUrl + 'close-account' , user);
  }

  // Reactivate user account since the user profile
  confirmReactivate(email: string): Observable<any> {
    return this.http.get(baseUrl + 'confirm-reactivate/' + email);
  }

  // Reactivate user account since the user profile
  reactivateAccount(user: UserData): Observable<object> {
    return this.http.put(baseUrl + 'reactivate-account/', user);
  }
}

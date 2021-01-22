import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {UserData} from '../model/userData';

const baseUrl = 'http://localhost:8080/solidr/api/users/';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private listenerNewUser = new Subject<any>();

  constructor(private http: HttpClient) { }

  // Get user from his email
  getUser(email: string): Observable<any> {
    return this.http.get(baseUrl + 'user/' + email);
  }

  // Get all users
  getAllUsers(): Observable<any> {
    return this.http.get(baseUrl + 'all');
  }

  // Admin or staff can update user information with his email
  updateUser(email: string, user: UserData): Observable<object> {
    return this.http.put(baseUrl + 'update-user/' + email, user);
  }

  // Update gas after buy
  updateGas(email: string, user: UserData): Observable<object> {
    return this.http.put(baseUrl + 'update-gas/' + email, user);
  }

  // Admin or staff can close the user account
  closeAccount(email: string, user: UserData): Observable<object> {
    return this.http.put(baseUrl + 'close-account/' + email, user);
  }

  // Admin or staff can reactivate the user account
  activateAccount(email: string, user: UserData): Observable<object> {
    return this.http.put(baseUrl + 'activate-account/' + email, user);
  }

  // Refresh of the page part 1
  listen(): Observable<any> {
    return this.listenerNewUser.asObservable();
  }

  // Refresh of the page part 2
  filter(filterBy: string): void {
    this.listenerNewUser.next(filterBy);
  }
}

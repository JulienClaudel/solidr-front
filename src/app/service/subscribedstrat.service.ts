import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SubscribedstratService {
  private baseUrl = 'http://localhost:8080/solidr/api/subscribed/';
  private listenerNewStrategy = new Subject<any>();

  constructor(private http: HttpClient) {
  }

  getAllUsersByStrategy(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}id/${id}`);
  }

  getAllStrategiesByUser(email: string): Observable<any> {
    return this.http.get(`${this.baseUrl}email/${email}`);
  }

  // All FOLLOWERS where EXPERT is
  getAllFollowersByExpert(email: string): Observable<any> {
    return this.http.get(`${this.baseUrl}followers/${email}`);
  }

  // All FOLLOWERS by EXPERT'S ANGEL where EXPERT is
  getAllFollowersByAngelAndExpert(id: number, email: string): Observable<any> {
    return this.http.get(`${this.baseUrl}followersangel/${id}/${email}`);
  }

  // All ANGELS followed by one USER
  getAllAngelsFollowedByUser(email: string): Observable<any> {
    return this.http.get(`${this.baseUrl}angels/${email}`);
  }

  createSubscription(subscription: object): Observable<object> {
    return this.http.post(`${this.baseUrl}`, subscription);
  }

  // Refresh of the page part 1
  listen(): Observable<any> {
    return this.listenerNewStrategy.asObservable();
  }

  // Refresh of the page part 2
  filter(filterBy: string): void {
    this.listenerNewStrategy.next(filterBy);
  }

}

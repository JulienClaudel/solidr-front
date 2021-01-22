import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {Strategy} from '../model/strategy';

@Injectable({
  providedIn: 'root'
})
export class StrategyService {
  private baseUrl = 'http://localhost:8080/solidr/api/strategies/';
  private listenerNewStrategy = new Subject<any>();

  constructor(private http: HttpClient) {
  }

  getStrategy(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}strategy/${id}`);
  }

  getAllStrategies(): Observable<any> {
    return this.http.get(`${this.baseUrl}all`);
  }

  getAllStrategiesByUserEmail(email: string): Observable<any> {
    return this.http.get(`${this.baseUrl}email/${email}`);
  }

  getAllOtherStrategies(email: string): Observable<any> {
    return this.http.get(`${this.baseUrl}allstrategies/${email}`);
  }

  createStrategy(strategy: object): Observable<object> {
    return this.http.post(`${this.baseUrl}`, strategy);
  }

  updateStrategy(id: number, strategy: Strategy): Observable<object> {
    return this.http.put(`${this.baseUrl}${id}`, strategy);
  }

  deleteStrategy(id: number, strategy: Strategy): Observable<object> {
    return this.http.put(`${this.baseUrl}delete/${id}`, strategy);
  }

  getAllUsersSubscribeByStratId(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}users/${id}`);
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

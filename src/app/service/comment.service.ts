import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private baseUrl = 'http://localhost:8080/solidr/api/comments/';
  private listenerNewStrategy = new Subject<any>();

  constructor(private http: HttpClient) {
  }

  getAllComments(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  getAllCommentsByStrategyId(strategyId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}strategy/${strategyId}`);
  }

  createComment(comment: object): Observable<object> {
    return this.http.post(`${this.baseUrl}`, comment);
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

import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TablePriceService {
  private baseUrl = 'http://localhost:8080/solidr/api/tableprices/';

  constructor(private http: HttpClient) { }

  getTablePrice(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}${id}`);
  }

  createTablePrice(tablePrice: object): Observable<object> {
    return this.http.post(`${this.baseUrl}`, tablePrice);
  }

  updateTablePrice(id: number, value: any): Observable<object> {
    return this.http.put(`${this.baseUrl}${id}`, value);
  }

  deleteTablePrice(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}${id}`, {responseType: 'text'});
  }

  getTablePriceList(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

}

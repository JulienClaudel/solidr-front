import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InformationService {
  private baseUrl = 'http://localhost:8080/solidr/api/informations/';

  constructor(private http: HttpClient) {
  }

  getAllInformations(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  getAllInformationsBySymbol(type: string): Observable<any> {
    return this.http.get(`${this.baseUrl}${type}`);
  }

  getAllInformationsBySymbolExceptCode(type: string, code: string): Observable<any> {
    return this.http.get(`${this.baseUrl}${type}/${code}`);
  }
}

import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WalletService {
  private baseUrl = 'http://localhost:8080/solidr/api/wallets/';

  constructor(private http: HttpClient) { }

  getBinanceWallets(): Observable<any> {
    return this.http.get(`${this.baseUrl}binancewallet`);
  }
}

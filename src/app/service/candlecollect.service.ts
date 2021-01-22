import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {Observable, Subscription} from 'rxjs';
import {webSocket} from 'rxjs/webSocket';


@Injectable({
  providedIn: 'root'
})
export class CandlecollectService {
  private baseUrl = 'http://localhost:8080/solidr/api/candlecollect/';
  obj: any;
  candleSeries: JSON;

  constructor(private http: HttpClient) { }

  extractCandles(symbol: string, interval: string, limit: number): Observable<any> {
    return this.http.get(`${this.baseUrl}${symbol}/${interval}/CINQCENT`);
  }

  getTestnetCurrentPrice(symbol: string): Observable<any> {
    const subject = webSocket(`wss://testnet.binance.vision/api/v3/avgPrice?symbol=${symbol}`);

    return this.http.get(`https://testnet.binance.vision/api/v3/avgPrice?symbol=${symbol}`);
  }
}

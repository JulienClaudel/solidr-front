import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Trade} from '../model/trade';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TradeService {
  private baseUrl = 'http://localhost:8080/solidr/api/trades/';
  private listenerNew = new Subject<any>();

  constructor(private http: HttpClient) {
  }

  getAllTrades(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  getLittleTrades(): Observable<any> {
    return this.http.get(`${this.baseUrl}min`);
  }

  getTrade(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}${id}`);
  }

  getAllTradesByUserEmail(email: string): Observable<any> {
    return this.http.get(`${this.baseUrl}email/${email}`);
  }

  // method to save the trade into the db
  createTrade(trade: object): Observable<object> {
    // faire boucle
    return this.http.post(`${this.baseUrl}`, trade);
  }

  updateTrade(id: number, trade: Trade): Observable<object> {
    return this.http.put(`${this.baseUrl}${id}`, trade);
  }

  // method to send the trade request to Binance
  binanceBuyTrade(symbol: string, timeinforce: string, quantity: string, price: string, trade: object): Observable<any> {
    return this.http.post(`${this.baseUrl}buy/${symbol}/${timeinforce}/${quantity}/${price}`, trade);
  }

  // method to send the trade request to Binance
  binanceSellTrade(symbol: string, timeinforce: string, quantity: string, price: string, trade: object): Observable<any> {
    return this.http.post(`${this.baseUrl}sell/${symbol}/${timeinforce}/${quantity}/${price}`, trade);
  }

  // method to find current price to Binance
  getBinanceCurrentPrice(symbol: string): Observable<any> {
    return this.http.get(`https://api.binance.com/api/v3/avgPrice?symbol=${symbol}`);
  }

  // method to find current price to Binance TestNet
  getTestnetCurrentPrice(symbol: string): Observable<any> {
    return this.http.get(`https://testnet.binance.vision/api/v3/avgPrice?symbol=${symbol}`);
  }

  // Refresh of the page part 1
  listen(): Observable<any> {
    return this.listenerNew.asObservable();
  }

  // Refresh of the page part 2
  filter(filterBy: string): void {
    this.listenerNew.next(filterBy);
  }
}

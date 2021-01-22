import {Component, Injectable, OnInit} from '@angular/core';
import {createChart, CrosshairMode} from 'lightweight-charts';
import {CandlecollectService} from '../../../service/candlecollect.service';
import {Observable, Subscription} from 'rxjs';
import {Candlecollect} from '../../../model/candlecollect';
import {SpinnerService} from '../../../service/spinner.service';

@Component({
  selector: 'app-staticchart',
  templateUrl: './staticchart.component.html',
  styleUrls: ['./staticchart.component.scss']
})
export class StaticchartComponent implements OnInit {
  candles: Observable<Candlecollect[]>;
  data: Array<any>;
  candlecollect: Candlecollect;
  start = Date.now();
  end = Date.now() + 1;
  symbol: 'btcusdt';
  interval = '5m';
  count = false;

  pairs: Array<any> = [
    {value: 'btc/usdt-0', viewValue: 'btc/usdt'},
    {value: 'btc/bnb-1', viewValue: 'btc/bnb'},
    {value: 'btc/eos-2', viewValue: 'btc/eos'}
  ];

  minutes: Array<any> = [
    {value: '1m-0', viewValue: '1m'},
    {value: '3m-1', viewValue: '3m'},
    {value: '5m-2', viewValue: '5m'},
    {value: '15m-3', viewValue: '15m'},
    {value: '30m-4', viewValue: '30m'}
  ];

  hours: Array<any> = [
    {value: '1h-0', viewValue: '1h'},
    {value: '2h-1', viewValue: '2h'},
    {value: '4h-2', viewValue: '4h'},
    {value: '6h-3', viewValue: '6h'},
    {value: '8h-4', viewValue: '8h'},
    {value: '12h-5', viewValue: '12h'}
  ];

  constructor(private candlecollectService: CandlecollectService,
              public spinnerService: SpinnerService) {
  }

  ngOnInit(): void {
    this.loadChart();
  }

  loadChart(): void {

    /*
    * Candlesticks chart creation - Design only
     */
    const chart = createChart(document.getElementById('chart'), {
      localization: {
        locale: 'us-US',
        dateFormat: 'yyyy/MM/dd',
      },
      height: 300,
      layout: {
        backgroundColor: '#303030',
        textColor: 'rgba(255, 255, 255, 0.9)',
      },
      grid: {
        vertLines: {
          color: 'rgba(197, 203, 206, 0.5)',
        },
        horzLines: {
          color: 'rgba(197, 203, 206, 0.5)',
        },
      },
      crosshair: {
        mode: CrosshairMode.Normal,
      },
      rightPriceScale: {
        borderColor: 'rgba(197, 203, 206, 0.8)',
      },
      timeScale: {
        borderColor: 'rgba(197, 203, 206, 0.8)',
        timeVisible: true,
        secondsVisible: false,
      },
    });

    const candleSeries = chart.addCandlestickSeries({
      upColor: '#2EBD85',
      downColor: '#E0294A',
      borderDownColor: '#E0294A',
      borderUpColor: '#2EBD85',
      wickDownColor: '#E0294A',
      wickUpColor: '#2EBD85',
    });

    /*
    * Request to get the 500 latest Candlesticks - send by rest to the back api
    */
    const answer = this.candlecollectService.extractCandles('BTCUSDT', 'FIFTEEN_MIN', 500)
      .subscribe(data => {
        // tslint:disable-next-line:forin
        for (let counter = 1; counter < 500; counter++) {
          candleSeries.update({
            // @ts-ignore
            time: data[counter].openTime / 1000,
            open: data[counter].open,
            high: data[counter].high,
            low: data[counter].low,
            close: data[counter].close
          });
        }
      });



    /*
    * Request send by REST to the trading api to get the price in real time
    */
    const binanceSocket = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@kline_15m');
    // tslint:disable-next-line:only-arrow-functions
    binanceSocket.onmessage = function(event) {
      const message = JSON.parse(event.data);
      candleSeries.update({
        // @ts-ignore8
        time: message.k.t / 1000,
        open: message.k.o,
        high: message.k.h,
        low: message.k.l,
        close: message.k.c
      });
    };
  }
}

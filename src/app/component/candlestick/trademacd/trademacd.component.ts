import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CandlecollectService} from '../../../service/candlecollect.service';
import {createChart, CrosshairMode, IChartApi, ISeriesApi} from 'lightweight-charts';
import {TradeService} from '../../../service/trade.service';
import {finalize} from 'rxjs/operators';

@Component({
  selector: 'app-trademacd',
  templateUrl: './trademacd.component.html',
  styleUrls: ['./trademacd.component.scss']
})
export class TrademacdComponent implements OnInit {
  @Output() redirect = new EventEmitter<any>();

  /* CHART SETTINGS */
  candleSeries: ISeriesApi<'Candlestick'>;
  volumeSeries;
  macdChart: IChartApi;

  /* CANDLES SETTINGS */
  symbol: string;
  interval: string;
  newInterval: string;
  symbol1;
  symbol2;
  symbol3;

  /* DYNAMIC INFORMATIONS */
  currentPrice: JSON;
  currentPriceString: string;
  priceStringyfied: string;

  MACD = 0;
  macdSignal = 0;
  EMA12 = 0;
  EMA26 = 0;

  pairs: Array<any> = [
    {value: 'BTCUSDT', viewValue: 'btc/usdt'},
    {value: 'LTCUSDT', viewValue: 'ltc/usdt'},
    {value: 'BNBBUSD', viewValue: 'bnb/busd'},
    {value: 'BTCBUSD', viewValue: 'btc/busd'},
    {value: 'ETHBUSD', viewValue: 'eth/busd'},
    {value: 'LTCBUSD', viewValue: 'ltc/busd'},
    {value: 'TRXBUSD', viewValue: 'trx/busd'},
    {value: 'XRPBUSD', viewValue: 'xrp/busd'},
    {value: 'BNBUSDT', viewValue: 'bnb/usdt'},
    {value: 'ETHUSDT', viewValue: 'eth/usdt'},
    {value: 'TRXUSDT', viewValue: 'trx/usdt'},
    {value: 'XRPUSDT', viewValue: 'xrp/usdt'},
    {value: 'BNBBTC', viewValue: 'bnb/btc'},
    {value: 'ETHBTC', viewValue: 'eth/btc'},
    {value: 'LTCBTC', viewValue: 'ltc/btc'},
    {value: 'TRXBTC', viewValue: 'trx/btc'},
    {value: 'XRPBTC', viewValue: 'xrp/btc'},
    {value: 'LTCBNB', viewValue: 'ltc/bnb'},
    {value: 'TRXBNB', viewValue: 'trx/bnb'},
    {value: 'XRPBNB', viewValue: 'xrp/bnb'}
  ];
  symbolBeforeSplit;

  minutes: Array<any> = [
    {value: 'ONE_MIN', viewValue: '1m'},
    {value: 'THREE_MIN', viewValue: '3m'},
    {value: 'FIVE_MIN', viewValue: '5m'},
    {value: 'FIFTEEN_MIN', viewValue: '15m'},
    {value: 'THIRTY_MIN', viewValue: '30m'}
  ];

  hours: Array<any> = [
    {value: 'ONE_HOUR', viewValue: '1h'},
    {value: 'TWO_HOUR', viewValue: '2h'},
    {value: 'FOUR_HOUR', viewValue: '4h'},
    {value: 'SIX_HOUR', viewValue: '6h'},
    {value: 'EIGHT_HOUR', viewValue: '8h'},
    {value: 'TWELVE_HOUR', viewValue: '12h'}
  ];

  days: Array<any> = [
    {value: 'ONE_HOUR', viewValue: '1h'},
    {value: 'TWO_HOUR', viewValue: '2h'},
    {value: 'FOUR_HOUR', viewValue: '4h'},
    {value: 'SIX_HOUR', viewValue: '6h'},
    {value: 'EIGHT_HOUR', viewValue: '8h'},
    {value: 'TWELVE_HOUR', viewValue: '12h'}
  ];

  week: Array<any> = [
    {value: 'ONE_WEEK', viewValue: '1w'}
  ];

  month: Array<any> = [
    {value: 'ONE_MONTH', viewValue: '1M'}
  ];
  private lineSeriesUp: ISeriesApi<'Line'>;
  private lineSeriesDown: ISeriesApi<'Line'>;

  constructor(private candlecollectService: CandlecollectService,
              private tradeService: TradeService) {
  }

  ngOnInit(): void {
    this.symbol = 'BTCUSDT';
    this.interval = 'FIFTEEN_MIN';
    this.createChart();
  }

  /*
    * Candlesticks chart creation -
  */
  createChart(): void {
    this.setChartOptions();
    this.setCandlesDesign();
    this.setCandleHistory();
  }

  /*
    * Define the chart properties (design, language)
  */
  setChartOptions(): void {
    this.macdChart = createChart(document.getElementById('macdChart'), {
      localization: {
        locale: 'fr-FR',
        dateFormat: 'yyyy/MM/dd',
      },
      height: 150,
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
  }

  /*
    * Define the candles properties (design only)
  */
  setCandlesDesign(): void {
    this.lineSeriesUp = this.macdChart.addLineSeries({
      color: 'rgba(224, 41, 74, 0.5)',
      lineWidth: 2,
      lineType: 2,
    });
    this.lineSeriesDown = this.macdChart.addLineSeries({
      color: 'rgba(46, 189,133, 0.5)',
      lineWidth: 2,
      lineType: 2,
    });
  }

  /*
    * Request to get the 500 latest Candlesticks - send by rest to the back api
  */
  setCandleHistory(): void {
    this.candlecollectService.extractCandles(this.symbol, this.interval, 500)
      .subscribe(data => {
        // tslint:disable-next-line:forin
        for (let counter = 1; counter < 500; counter++) {

          if (counter > 26) {
            for (let i = 26; i > 1; i--) {
              this.EMA26 = (this.EMA26 + Number(data[counter].close));
            }
            this.EMA26 = this.EMA26 / 26;

            for (let i = 12; i > 1; i--) {
              this.EMA12 = (this.EMA12 + Number(data[counter].close));
            }
            this.EMA12 = this.EMA12 / 12;
          }

          this.MACD = this.EMA26 - this.EMA12;

          for (let i = 9; i > 1; i--) {
            this.macdSignal = this.macdSignal + this.MACD;
          }
          this.macdSignal = this.macdSignal / 9;

          this.lineSeriesUp.update({
            // @ts-ignore
            time: data[counter].closeTime / 1000,
            value: this.MACD,
          });

          this.lineSeriesDown.update({
            // @ts-ignore
            time: data[counter].closeTime / 1000,
            value: this.macdSignal,
          });
        }
      });

    this.listenSocket(this.volumeSeries, this.lineSeriesUp);
  }


  /*
    * Dedicated method to set the live websocket
  */
  listenSocket(volumeSeries, lineSeries): void {
    // tslint:disable-next-line:prefer-for-of
    for (let counter = 0; counter < this.minutes.length; counter++) {
      if (this.interval === this.minutes[counter].value) {
        this.newInterval = this.minutes[counter].viewValue;
      }
      if (this.interval === this.hours[counter].value) {
        this.newInterval = this.hours[counter].viewValue;
      }
    }

    const binanceSocket = new WebSocket('wss://stream.binance.com:9443/ws/' + this.symbol.toLowerCase() + '@kline_' + this.newInterval);
    /*
      * loop to transform the symbol from "btc/usdt" to "btc"
      * destined to change symbol inside the trade-create
    */
    // tslint:disable-next-line:prefer-for-of
    for (let counter = 0; counter < this.pairs.length; counter++) {
      if (this.symbol === this.pairs[counter].value) {
        this.symbolBeforeSplit = this.pairs[counter].viewValue;
        this.symbol1 = this.symbolBeforeSplit.split('/', 1);
        this.symbol2 = this.symbolBeforeSplit.substring(this.symbolBeforeSplit.indexOf('/') + 1);

        this.candlecollectService.getTestnetCurrentPrice(this.symbol)
          .pipe()
          .subscribe(data => {
            this.currentPriceString = data.price.toString();
            this.changeComponent(this.symbol1, this.symbol2, this.currentPriceString, null, null);
          });
      }
    }


    // tslint:disable-next-line:only-arrow-functions no-shadowed-variable typedef
    binanceSocket.onmessage = function(event) {
      const message = JSON.parse(event.data);
      const volumeStick = message.k;
    };
  }

  /*
    * Renewing of the candles after changing the pair value
  */
  changeChart(): void {
    this.macdChart.removeSeries(this.volumeSeries);
    this.setCandlesDesign();
    this.setCandleHistory();

  }

  changeWeekBtn(): void {
    this.interval = 'ONE_WEEK';
    this.newInterval = '1w';
    this.changeChart();
  }

  changeMonthBtn(): void {
    this.interval = 'ONE_MONTH';
    this.newInterval = '1M';
    this.changeChart();
  }

  priceChange(): void {
    const test = this.tradeService.getTestnetCurrentPrice(this.symbol);
    test.subscribe(data => {
      this.currentPriceString = data.price.toString();
      console.log('price change currentPrice : ' + this.currentPriceString);
    });
  }

  /*
    * Dedicated method to change the symbol inside the brother component: Trade-create
    * by the parent component: Trade
  */
  changeComponent(pair1: string, pair2: string, price: string, qty: number, total: number): void {
    this.redirect.emit({symbol: pair1, symbol2: pair2, symbol3: price, quantity: qty, refresh: total});
  }
}

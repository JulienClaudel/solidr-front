import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CandlecollectService} from '../../../service/candlecollect.service';
import {createChart, CrosshairMode, IChartApi, ISeriesApi} from 'lightweight-charts';
import {TradeService} from '../../../service/trade.service';
import {finalize} from 'rxjs/operators';

@Component({
  selector: 'app-tradecandle',
  templateUrl: './tradecandle.component.html',
  styleUrls: ['./tradecandle.component.scss']
})
export class TradecandleComponent implements OnInit {
  @Output() redirect = new EventEmitter<any>();

  /* CHART SETTINGS */
  candleSeries: ISeriesApi<'Candlestick'>;
  volumeSeries;
  buyerVolumeSeries;
  makeBuyAssetVolume: string;
  chart: IChartApi;

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
    this.chart = createChart(document.getElementById('chart'), {
      localization: {
        locale: 'fr-FR',
        dateFormat: 'yyyy/MM/dd',
      },
      height: 500,
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
    this.candleSeries = this.chart.addCandlestickSeries({
      upColor: '#2EBD85',
      downColor: '#E0294A',
      borderDownColor: '#E0294A',
      borderUpColor: '#2EBD85',
      wickDownColor: '#E0294A',
      wickUpColor: '#2EBD85',
    });
    this.volumeSeries = this.chart.addHistogramSeries({
      color: 'rgba(224, 41, 74, 0.5)',
      priceFormat: {
        type: 'volume',
      },
      priceScaleId: '',
      scaleMargins: {
        top: 0.8,
        bottom: 0,
      },
    });
    this.buyerVolumeSeries = this.chart.addHistogramSeries({
      color: 'rgba(46, 189,133, 0.5)',
      priceFormat: {
        type: 'volume',
      },
      priceScaleId: '',
      scaleMargins: {
        top: 0.8,
        bottom: 0,
      },
    });
  }

  /*
    * Request to get the 500 latest Candlesticks - send by rest to the back api
  */
  setCandleHistory(): void {
    this.candlecollectService.extractCandles(this.symbol, this.interval, 500)
      .subscribe(data => {
        // tslint:disable-next-line:forin
        for (let counter = 0; counter < 500; counter++) {
          this.candleSeries.update({
            // @ts-ignore
            time: data[counter].openTime / 1000,
            open: data[counter].open,
            high: data[counter].high,
            low: data[counter].low,
            close: data[counter].close,
          });
          if (data[counter].takerBuyBaseAssetVolume > (data[counter].volume - data[counter].takerBuyBaseAssetVolume)) {
            this.volumeSeries.update({
              // @ts-ignore
              time: data[counter].openTime / 1000,
              value: data[counter].takerBuyBaseAssetVolume,
              color: data[counter].color,
            });
          } else {
            this.buyerVolumeSeries.update({
              // @ts-ignore
              time: data[counter].openTime / 1000,
              value: data[counter].volume - data[counter].takerBuyBaseAssetVolume,
              color: data[counter].color,
            });
          }
        }
      });
    this.listenSocket(this.candleSeries, this.volumeSeries, this.buyerVolumeSeries);
  }

  /*
    * Dedicated method to set the live websocket
  */
  listenSocket(candleSeries, volumeSeries, buyerVolumeSeries): void {
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
      const candlestick = message.k;
      candleSeries.update({
        // @ts-ignore8
        time: candlestick.t / 1000,
        open: candlestick.o,
        high: candlestick.h,
        low: candlestick.l,
        close: candlestick.c
      });
      if (candlestick.V > (candlestick.v - candlestick.V)) {
        volumeSeries.update({
          // @ts-ignore
          time: candlestick.t / 1000,
          value: candlestick.V,
        });
      } else {
        buyerVolumeSeries.update({
          // @ts-ignore
          time: candlestick.t / 1000,
          value: candlestick.V,
        });
      }
    };
  }

  /*
    * Renewing of the candles after changing the pair value
  */
  changeChart(): void {
    this.chart.removeSeries(this.candleSeries);
    this.chart.removeSeries(this.volumeSeries);
    this.chart.removeSeries(this.buyerVolumeSeries);
    this.setCandlesDesign();
    this.setCandleHistory();

  }

  /*
    * Renewing of the candles after changing the time value
  */
  changeWeekBtn(): void {
    this.interval = 'ONE_WEEK';
    this.newInterval = '1w';
    this.changeChart();
  }

  /*
    * Renewing of the candles after changing the time value
  */
  changeMonthBtn(): void {
    this.interval = 'ONE_MONTH';
    this.newInterval = '1M';
    this.changeChart();
  }

  /*
    * Renewing of the price after changes
  */
  priceChange(): void {
    const test = this.tradeService.getTestnetCurrentPrice(this.symbol);
    test.subscribe(data => {
      this.currentPriceString = data.price.toString();
    });
  }

  /*
    * Dedicated method to change the symbol inside the brother component: Trade-create
    * by the parent component: Trade
  */
  changeComponent(pair1: string, pair2: string, price: string, qty: number, total: number): void {
    this.redirect.emit({symbol: pair1, symbol2: pair2, symbol3: price, quantity: qty, refresh: total});
  }

  /* rsiCalculation(): void {
    Const ema14high =
    RSI = 100 – (100 / (1 + (hausse moyenne / baisse moyenne)))
  } */
}



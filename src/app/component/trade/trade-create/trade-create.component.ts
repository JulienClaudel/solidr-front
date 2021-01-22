import {Component, Input, OnInit} from '@angular/core';
import {TradeService} from '../../../service/trade.service';
import {NgForm} from '@angular/forms';
import {Trade} from '../../../model/trade';
import {ToastrService} from 'ngx-toastr';
import {ProgressBarMode} from '@angular/material/progress-bar';
import {ThemePalette} from '@angular/material/core';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {Strategy} from '../../../model/strategy';
import {StrategyService} from '../../../service/strategy.service';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {StrategyCreateComponent} from '../../strategy/strategy-create/strategy-create.component';
import {TokenStorageService} from '../../../service/token-storage.service';
import {UserSubscribeStrat} from '../../../model/userSubscribeStrat';
import {SubscribedstratService} from '../../../service/subscribedstrat.service';

@Component({
  selector: 'app-trade-create',
  templateUrl: './trade-create.component.html',
  styleUrls: ['./trade-create.component.scss']
})
export class TradeCreateComponent implements OnInit {
  @Input() symbols: any;

  ////////////////////////////////////////////////////////////////////
  followers: Observable<UserSubscribeStrat[]>;
  ////////////////////////////////////////////////////////////////////
  userEmail = 'test@test.com';
  currentUser: any;
  qtyAsked: number;
  total: number;

  trade: Trade = new Trade();
  tradeCreationDate: Date = new Date();
  strategies: Observable<Strategy[]>;
  strategy: Strategy = new Strategy();

  /* TESTNET INFORMATIONS */
  testnetprice: JSON;
  symbol2;
  symbol;
  symbol3;

  /* PROGRESS BAR */
  color: ThemePalette = 'primary';
  mode: ProgressBarMode = 'determinate';
  value = 50;
  bufferValue = 75;

  /* TOOGLE BUTTON */
  buttonMessage: string;
  selectedVal: string;
  buttonColor: ThemePalette;

  /* SLIDE TOGGLE */
  checked = false;
  slideColor: ThemePalette;
  disabled = true;

  constructor(private tradeService: TradeService,
              private subService: SubscribedstratService,
              private subscribeService: SubscribedstratService,
              private strategyService: StrategyService,
              private toastr: ToastrService,
              private router: Router,
              private dialog: MatDialog,
              private tokenService: TokenStorageService) {
  }

  ngOnInit(): void {
    if (this.tokenService.getUser()) {
      this.currentUser = this.tokenService.getUser().email;
    }
    this.strategies = this.strategyService.getAllStrategiesByUserEmail(this.currentUser);
    this.onValChange('buy');
  }

  getSymbol(): void {
    this.symbol = (this.symbols.symbol + this.symbols.symbol2).toUpperCase();
  }

  onSubmit(createTrade: NgForm): void {
    this.totalPrice();
    console.log(createTrade);
    if (this.selectedVal === 'buy') {
      this.tradeBuyBinance();
    }
    if (this.selectedVal === 'sell') {
      this.tradeSellBinance();
    }
  }

  save(symbol: string, side: string, user: string): void {
    this.trade.userEmail = user;
    this.trade.statusId = 1;
    this.trade.tradePlatform = 'Binance';
    this.trade.tradePairLimit = '1';
    this.trade.tradeAmountLimit = '1';
    this.trade.tradeSymbol = symbol;
    this.trade.tradeClientorderlist = 'refclient';
    this.trade.tradeTransactime = 1605865234341;
    this.trade.tradePrice = this.symbols.symbol3;
    this.trade.tradeOrigqty = '1';
    this.trade.tradeCummulativequoteqty = '1';
    this.trade.tradeStatus = 'filled';
    this.trade.tradeTimeinforce = 'GTC';
    this.trade.tradeType = 'LIMIT';
    this.trade.tradeSide = side;
    this.trade.tradeCreationDate = this.tradeCreationDate;
    this.trade.tradeUpdateDate = this.tradeCreationDate;
    this.tradeService.createTrade(this.trade).subscribe(data => {
        this.trade = new Trade();
        this.showSuccessToaster('Trade BDD successfully sended');
        this.strategyService.filter('create click');
      },
      error => this.showErrorToaster(JSON.stringify(error.error.message)));
  }

  addBuyTrade(): void {
    this.subService.getAllFollowersByExpert(this.currentUser).subscribe(data => {
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < data.length; i++) {
        this.save(this.symbol, 'BUY', data[i].userEmail);
      }
    });
  }

  addSellTrade(): void {
    this.subService.getAllFollowersByExpert(this.currentUser).subscribe(data => {
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < data.length; i++) {
        this.save(this.symbol, 'SELL', data[i].userEmail);
      }
    });
  }

  /* sending trade to Binance */
  tradeBuyBinance(): void {
    this.getSymbol();
    this.tradeService.binanceBuyTrade(this.symbol, 'GTC', this.trade.tradeAmountSymbol1, this.symbols.symbol3.toString(), this.trade)
      .subscribe(data => {
          this.showSuccessToaster('Trade BUY successfully sended');
          this.save(this.symbol, 'BUY', this.currentUser);
          this.addBuyTrade();
        },
        error => this.showErrorToaster(JSON.stringify(error.error.message)));
  }

  /* sending trade to Binance */
  tradeSellBinance(): void {
    this.getSymbol();
    this.tradeService.binanceSellTrade(this.symbol, 'GTC', this.trade.tradeAmountSymbol1, this.symbols.symbol3.toString(), this.trade)
      .subscribe(data => {
          this.showSuccessToaster('Trade SELL successfully sended');
          this.save(this.symbol, 'SELL', this.currentUser);
          this.addSellTrade();
        },
        error => console.log(error.message));
  }

  goFollowers(): void {
    this.subscribeService.getAllFollowersByAngelAndExpert(5, this.currentUser);


  }

  totalPrice(): void {
    const price: number = +this.symbols.symbol3;
    this.symbols.refresh = (price * +this.trade.tradeAmountSymbol1);
    console.log('total ' + this.total);
  }

  /* Dynamic changes of the values in html page */
  onValChange(value: string): void {
    this.selectedVal = value;
    if (value === 'buy') {
      this.buttonMessage = 'Buy';
      this.buttonColor = 'primary';
      this.color = 'primary';
    }
    if (value === 'sell') {
      this.buttonMessage = 'Sell';
      this.buttonColor = 'accent';
      this.color = 'accent';
    }
  }

  selected(): void {
    this.checked = true;
    this.color = 'primary';
  }

  onSlideChange(): void {
    this.slideColor = 'primary';
    this.goFollowers();
  }

  onDisabled(): void {
    this.disabled = false;
  }

  onCreate(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.dialog.open(StrategyCreateComponent, dialogConfig);
  }

  reset(): void {
    this.qtyAsked = 0;
    this.total = this.symbols.refresh;
  }

  /* Success message */
  showSuccessToaster(success: string): void {
    this.toastr.success(success, 'Well done!', {timeOut: 2000});
  }

  /* Error message */
  showErrorToaster(error: string): void {
    this.toastr.error(error, 'Oups!', {timeOut: 2000});
  }

  goToStrategy(): void {
    this.router.navigate(['/marketPlace']);
  }
}

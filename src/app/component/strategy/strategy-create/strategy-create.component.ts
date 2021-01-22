import {Component, OnInit} from '@angular/core';
import {Strategy} from '../../../model/strategy';
import {StrategyService} from '../../../service/strategy.service';
import {NgForm} from '@angular/forms';
import {Observable} from 'rxjs';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Information} from '../../../model/information';
import {InformationService} from '../../../service/information.service';
import {TokenStorageService} from '../../../service/token-storage.service';
import {DialogElementsComponent} from '../../../shared/dialog-elements/dialog-elements.component';
import {ToastrService} from 'ngx-toastr';


@Component({
  selector: 'app-strategy-create',
  templateUrl: './strategy-create.component.html',
  styleUrls: ['./strategy-create.component.scss']
})
export class StrategyCreateComponent implements OnInit {
  strategy: Strategy = new Strategy();
  symbols: Observable<Information[]>;
  symbols2: Observable<Information[]>;
  pictures: Observable<Information[]>;
  executeAction = false;

  isMember: false;
  currentUser: any;

  constructor(private strategyService: StrategyService,
              private informationService: InformationService,
              private dialogRef: MatDialogRef<StrategyCreateComponent>,
              private tokenService: TokenStorageService,
              private toastr: ToastrService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    /* Authorizations for a profile MEMBER */
    if (this.tokenService.getUser()) {
      this.isMember = this.tokenService.getUser().roles.includes('ROLE_Member');
      this.currentUser = this.tokenService.getUser();
    }

    /* Get all symbols available in the database */
    this.symbols = this.informationService.getAllInformationsBySymbol('symbol');

    /* Get all symbols available in the database */
    this.pictures = this.informationService.getAllInformationsBySymbol('picture');
    // this.strategy.strategySymbol1 = 'BTC';
  }

  save(): void {
    this.symbols2 = this.informationService.getAllInformationsBySymbolExceptCode('symbol', this.strategy.strategySymbol2);
    /* Set symbols for foreign keys */
    this.strategy.statusId = 1;
    this.strategy.userEmail = this.currentUser.email;
    this.strategy.strategyCreationDate = new Date();
    this.strategy.strategyUpdateDate = new Date();
    /* Create a new strategy */
    this.strategyService.createStrategy(this.strategy).subscribe(() => {
        this.showSuccessToaster('Strategy successfully created');
      },
      error => this.showErrorToaster(JSON.stringify(error.error.message)));
  }

  onSubmit(createStrat: NgForm): void {
    this.openDialog();
  }

  /* Success message */
  showSuccessToaster(success: string): void {
    this.toastr.success(success, 'Well done!');
  }

  /* Error message */
  showErrorToaster(error: string): void {
    this.toastr.error(error, 'Oups!');
  }

  /* Opening method of confirm modal */
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogElementsComponent, {
      height: '175px', data: {label: this.strategy.strategyLabel, action: 'create'}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.executeAction = result;
      if (this.executeAction) {
        this.save();
        this.onClose();
        window.location.reload();
      } else {
        this.dialog.closeAll();
      }
    });
  }

  /* Closing method of confirm modal */
  onClose(): void {
    this.dialog.closeAll();
    this.strategyService.filter('create click');
  }

  onSelectionChangeSymbol1(): void {
    this.symbols2 = this.informationService.getAllInformationsBySymbolExceptCode('symbol', this.strategy.strategySymbol1);
  }

  onSelectionChangeSymbol2(): void {
    this.symbols = this.informationService.getAllInformationsBySymbolExceptCode('symbol', this.strategy.strategySymbol2);
  }

}

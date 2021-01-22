import {Component, Inject, NgZone, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Strategy} from '../../../model/strategy';
import {StrategyService} from '../../../service/strategy.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {Information} from '../../../model/information';
import {InformationService} from '../../../service/information.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {ToastrService} from 'ngx-toastr';
import {DialogElementsComponent} from '../../../shared/dialog-elements/dialog-elements.component';
import {CdkTextareaAutosize} from '@angular/cdk/text-field';
import {take} from 'rxjs/operators';

@Component({
  selector: 'app-strategy-update',
  templateUrl: './strategy-update.component.html',
  styleUrls: ['./strategy-update.component.scss']
})
export class StrategyUpdateComponent implements OnInit {
  @ViewChild('autosize') autosize: CdkTextareaAutosize;
  symbols: Observable<Information[]>;
  symbols2: Observable<Information[]>;
  pictures: Observable<Information[]>;

  strategy: Strategy;
  executeAction = false;

  constructor(private route: ActivatedRoute,
              private ngZone: NgZone,
              private router: Router,
              private strategyService: StrategyService,
              private informationService: InformationService,
              @Inject(MAT_DIALOG_DATA) public data: Strategy,
              private dialogRef: MatDialogRef<StrategyUpdateComponent>,
              private toastr: ToastrService,
              private dialog: MatDialog) {
  }

  triggerResize(): void {
    // Wait for changes to be applied, then trigger textarea resize.
    this.ngZone.onStable.pipe(take(1))
      .subscribe(() => this.autosize.resizeToFitContent(true));
  }

  ngOnInit(): void {

    /* Get all symbols available in the database */
    this.pictures = this.informationService.getAllInformationsBySymbol('picture');
    this.strategy = this.data;
    /* Get all symbols available in the database */
    this.symbols = this.informationService.getAllInformationsBySymbol('symbol');
    this.symbols2 = this.informationService.getAllInformationsBySymbol('symbol');

  }

  updateStrategy(): void {
    this.strategy.strategyUpdateDate = new Date();
    this.strategyService.updateStrategy(this.data.strategyId, this.strategy)
      .subscribe(data => {
        this.showSuccessToaster('Strategy successfully updated');
      }, error => this.showErrorToaster(JSON.stringify(error.error.message)));
  }

  onSubmit(createStrat: NgForm): void {
    this.openDialog();
  }

  /* Success message */
  showSuccessToaster(success: string): void {
    this.toastr.success(success, 'Well done!', {timeOut: 2000});
  }

  /* Error message */
  showErrorToaster(error: string): void {
    this.toastr.error(error, 'Oups!', {timeOut: 2000});
  }

  /* Opening method of confirm modal */
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogElementsComponent, {
      height: '175px', data: {label: this.strategy.strategyLabel, action: 'update'}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.executeAction = result;
      if (this.executeAction) {
        this.updateStrategy();
        this.onClose();
      } else {
        this.dialog.closeAll();
      }
    });
  }

  /* Closing method of confirm modal */
  onClose(): void {
    this.dialog.closeAll();
    this.strategyService.filter('update click');
  }


  onSelectionChangeSymbol1(): void {
    this.symbols2 = this.informationService.getAllInformationsBySymbolExceptCode('symbol', this.strategy.strategySymbol1);
  }

  onSelectionChangeSymbol2(): void {
    this.symbols = this.informationService.getAllInformationsBySymbolExceptCode('symbol', this.strategy.strategySymbol2);
  }

}

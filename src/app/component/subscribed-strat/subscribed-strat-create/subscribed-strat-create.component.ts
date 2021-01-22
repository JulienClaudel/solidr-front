import {Component, Inject, OnInit} from '@angular/core';
import {SubscribedstratService} from '../../../service/subscribedstrat.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {TokenStorageService} from '../../../service/token-storage.service';
import {NgForm} from '@angular/forms';
import {DialogElementsComponent} from '../../../shared/dialog-elements/dialog-elements.component';
import {Strategy} from '../../../model/strategy';
import {UserSubscribeStrat} from '../../../model/userSubscribeStrat';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-subscribed-strat-create',
  templateUrl: './subscribed-strat-create.component.html',
  styleUrls: ['./subscribed-strat-create.component.scss']
})
export class SubscribedStratCreateComponent implements OnInit {
  strategy: Strategy;
  userSubscribeStrat: UserSubscribeStrat = new UserSubscribeStrat();

  currentUser: any;
  executeAction = false;

  constructor(private subService: SubscribedstratService,
              private dialogRef: MatDialogRef<SubscribedStratCreateComponent>,
              private toastr: ToastrService,
              @Inject(MAT_DIALOG_DATA) public data: Strategy,
              private tokenService: TokenStorageService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    if (this.tokenService.getUser()) {
      this.currentUser = this.tokenService.getUser();
    }
    this.strategy = this.data;
  }

  save(): void {
    this.userSubscribeStrat.strategyId = this.strategy.strategyId;
    this.userSubscribeStrat.userEmail = this.currentUser.email;
    this.userSubscribeStrat.primeSolidr = 10;
    this.userSubscribeStrat.primeExpert = this.strategy.strategyPrime;
    this.userSubscribeStrat.symbolAffect1 = this.strategy.strategySymbol1;
    this.userSubscribeStrat.symbolAffect2 = this.strategy.strategySymbol2;
    this.userSubscribeStrat.subscribeStratStartDate = new Date();
    this.subService.createSubscription(this.userSubscribeStrat).subscribe(data => {
        console.log(data);
        this.showSuccessToaster('Subscription successfully created');
      },
      error => this.showErrorToaster(JSON.stringify(error.error.message)));
  }

  onSubmit(subscribeStrat: NgForm): void {
    this.openDialog();
  }

  /* Opening method of confirm modal */
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogElementsComponent, {
      height: '175px', data: {label: this.strategy.strategyLabel, action: 'follow'}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.executeAction = result;
      if (this.executeAction) {
        this.save();
        this.onClose();
      } else {
        this.dialog.closeAll();
      }
    });
  }

  /* Closing method of confirm modal */
  onClose(): void {
    this.dialog.closeAll();
    this.subService.filter('create click');
  }

  /* Success message */
  showSuccessToaster(success: string): void {
    this.toastr.success(success, 'Well done!');
  }

  /* Error message */
  showErrorToaster(error: string): void {
    this.toastr.error(error, 'Oups!');
  }
}

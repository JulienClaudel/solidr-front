import {Component, OnInit} from '@angular/core';
import {Strategy} from '../../../model/strategy';
import {Observable} from 'rxjs';
import {StrategyService} from '../../../service/strategy.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {StrategyUpdateComponent} from '../strategy-update/strategy-update.component';
import {TokenStorageService} from '../../../service/token-storage.service';
import {DialogElementsComponent} from '../../../shared/dialog-elements/dialog-elements.component';
import {ToastrService} from 'ngx-toastr';
import {CommentService} from '../../../service/comment.service';
import {SubscribedstratService} from '../../../service/subscribedstrat.service';
import {SubscribedStratCreateComponent} from '../../subscribed-strat/subscribed-strat-create/subscribed-strat-create.component';

@Component({
  selector: 'app-strategy-details',
  templateUrl: './strategy-details.component.html',
  styleUrls: ['./strategy-details.component.scss']
})
export class StrategyDetailsComponent implements OnInit {
  strategy: Strategy;
  id: number;

  isMember: false;
  isExpert: false;
  executeAction = false;

  followers: Observable<Strategy[]>;
  follower = 0;

  comments: Observable<Comment[]>;

  constructor(private strategyService: StrategyService,
              private subService: SubscribedstratService,
              private commentService: CommentService,
              private tokenService: TokenStorageService,
              private route: ActivatedRoute,
              private toastr: ToastrService,
              private router: Router,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.strategy = new Strategy();
    this.id = this.route.snapshot.params.id;
    this.strategyService.getStrategy(this.id).subscribe(data => {
      this.strategy = data;
    }, error => console.log(error));

    if (this.tokenService.getUser()) {
      this.isMember = this.tokenService.getUser().roles.includes('ROLE_Member');
      this.isExpert = this.tokenService.getUser().roles.includes('ROLE_Expert');
    }
    this.follower = this.getFollowers();
  }

  /* Find all the followers of the strategy and count them */
  getFollowers(): number {
    this.followers = this.subService.getAllUsersByStrategy(this.id);
    this.followers.subscribe(data => {
      for (let counter = 0; counter < data.length; counter++) {
        this.follower = this.follower + 1;
      }
    });
    return this.follower;
  }

  /* Edit a strategy */
  onEdit(strategy: Strategy): void {
    this.dialog.open(StrategyUpdateComponent, {maxHeight: '800px', disableClose: true, autoFocus: true, data: strategy});
  }

  /* Subscribe to a strategy */
  becomeFollower(strategy: Strategy): void {
    this.dialog.open(SubscribedStratCreateComponent, {maxHeight: '800px', disableClose: true, autoFocus: true, data: strategy});
  }

  /* Confirmation invalidate the strategy */
  onDelete(): void {
    const dialogRef = this.dialog.open(DialogElementsComponent, {
      height: '175px', data: {label: this.strategy.strategyLabel, action: 'delete'}
    });
    dialogRef.afterClosed().subscribe(result => {
      this.executeAction = result;
      if (this.executeAction) {
        this.delete();
        this.onClose();
      } else {
        this.dialog.closeAll();
      }
    });
  }

  /* Invalidate a strategy */
  delete(): void {
    this.strategy.strategyUpdateDate = new Date();
    this.strategy.statusId = 11;
    this.strategyService.updateStrategy(this.strategy.strategyId, this.strategy)
      .subscribe(data => {
          this.showSuccessToaster('Strategy successfully deleted');
        },
        error => this.showErrorToaster(JSON.stringify(error.error.message)));
  }

  /* Success message */
  showSuccessToaster(success: string): void {
    this.toastr.success(success, 'Well done!');
  }

  /* Error message */
  showErrorToaster(error: string): void {
    this.toastr.error(error, 'Oups!');
  }

  /* Closing of all the modals */
  onClose(): void {
    this.dialog.closeAll();
    this.strategyService.filter('delete click');
  }

  /* Back to the MarketPlace */
  backToMarketPlace(): void {
    this.router.navigate(['marketPlace']);
  }
}

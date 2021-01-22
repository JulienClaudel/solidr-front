import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {TokenStorageService} from '../../../service/token-storage.service';
import {ThemePalette} from '@angular/material/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {UserSubscribeStrat} from '../../../model/userSubscribeStrat';
import {MatTableDataSource} from '@angular/material/table';
import {SubscribedstratService} from '../../../service/subscribedstrat.service';

@Component({
  selector: 'app-subscribed-strat-container',
  templateUrl: './subscribed-strat-container.component.html',
  styleUrls: ['./subscribed-strat-container.component.scss']
})
export class SubscribedStratContainerComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  currentUser: any;

  /* TOOGLE BUTTON */
  color: ThemePalette = 'primary';
  buttonMessage: string;
  selectedVal: string;
  buttonColor: ThemePalette;

  displayedColumns: string[];
  column1: string;
  colname: string;
  data: string;

  ELEMENT_DATA: UserSubscribeStrat[];
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
    // displayedColumns = ['userEmail', 'amountAffect'];
  subscribedListSource = new MatTableDataSource<UserSubscribeStrat>();

  constructor(private subscribedStratService: SubscribedstratService,
              private tokenService: TokenStorageService) {
    this.subscribedStratService.listen().subscribe((m: any) => {
      this.getAllUsers();
    });
    this.subscribedListSource = new MatTableDataSource<UserSubscribeStrat>(this.ELEMENT_DATA);
  }

  ngOnInit(): void {
    this.selectedVal = 'followers';
    if (this.tokenService.getUser()) {
      this.currentUser = this.tokenService.getUser().email;
    }
    this.onValChange(this.selectedVal);
  }

  //////////// TOGGLE BUTTON ///////////////////////////////////////////////

  /* Dynamic changes of the values in html page */
  onValChange(value: string): void {
    this.selectedVal = value;

    if (value === 'followers') {
      this.colname = 'User';
      this.column1 = 'userEmail';
      this.displayedColumns = [this.column1, 'amountAffect1', 'amountAffect2'];
      this.getAllUsers();
    }
    if (value === 'angels') {
      this.colname = 'Angel';
      this.column1 = 'strategyLabel';
      this.displayedColumns = [this.column1, 'amountAffect1', 'amountAffect2'];
      this.getAllStrategies();
    }
  }

  /////// TABLE ///////////////////////////////////////////////////////////
  ngAfterViewInit(): void {
    this.subscribedListSource.paginator = this.paginator;
    this.subscribedListSource.sort = this.sort;
  }

  getAllUsers(): void {
    const resp = this.subscribedStratService.getAllFollowersByExpert(this.currentUser);
    resp.subscribe(report => this.subscribedListSource.data = report as UserSubscribeStrat[]);
  }

  getAllStrategies(): void {
    const resp = this.subscribedStratService.getAllAngelsFollowedByUser(this.currentUser);
    resp.subscribe(report => this.subscribedListSource.data = report as UserSubscribeStrat[]);
  }

  applyFilter($event: KeyboardEvent): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.subscribedListSource.filter = filterValue.trim().toLowerCase();

    if (this.subscribedListSource.paginator) {
      this.subscribedListSource.paginator.firstPage();
    }
  }

}

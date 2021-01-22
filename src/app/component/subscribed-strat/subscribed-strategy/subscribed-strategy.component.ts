import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {UserSubscribeStrat} from '../../../model/userSubscribeStrat';
import {MatTableDataSource} from '@angular/material/table';
import {SubscribedstratService} from '../../../service/subscribedstrat.service';
import {TokenStorageService} from '../../../service/token-storage.service';
import {Strategy} from '../../../model/strategy';

@Component({
  selector: 'app-subscribed-strategy',
  templateUrl: './subscribed-strategy.component.html',
  styleUrls: ['./subscribed-strategy.component.scss']
})
export class SubscribedStrategyComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  currentUser: any;
  strategy: Strategy;

  ELEMENT_DATA: UserSubscribeStrat[];
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['userEmail', 'primeSolidr', 'subscribeStratStartDate', 'subscribeStratEndDate'];
  subscribedListSource = new MatTableDataSource<UserSubscribeStrat>();

  constructor(private subscribedStratService: SubscribedstratService,
              private tokenService: TokenStorageService) {
    this.subscribedStratService.listen().subscribe((m: any) => {
      this.getAllUsers();
    });
    this.subscribedListSource = new MatTableDataSource<UserSubscribeStrat>(this.ELEMENT_DATA);
  }

  ngOnInit(): void {
    if (this.tokenService.getUser()) {
      this.currentUser = this.tokenService.getUser().email;
    }
    this.getAllUsers();
  }

  ngAfterViewInit(): void {
    this.subscribedListSource.paginator = this.paginator;
    this.subscribedListSource.sort = this.sort;
  }

  getAllUsers(): void {
    const resp = this.subscribedStratService.getAllUsersByStrategy(4);
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

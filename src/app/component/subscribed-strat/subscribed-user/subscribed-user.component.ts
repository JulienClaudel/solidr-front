import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {UserSubscribeStrat} from '../../../model/userSubscribeStrat';
import {SubscribedstratService} from '../../../service/subscribedstrat.service';
import {TokenStorageService} from '../../../service/token-storage.service';

@Component({
  selector: 'app-subscribed-user',
  templateUrl: './subscribed-user.component.html',
  styleUrls: ['./subscribed-user.component.scss']
})
export class SubscribedUserComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  currentUser: any;

  ELEMENT_DATA: UserSubscribeStrat[];
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['strategyLabel', 'primeSolidr', 'subscribeStratStartDate', 'subscribeStratEndDate'];
  subscribedListSource = new MatTableDataSource<UserSubscribeStrat>();

  constructor(private subscribedStratService: SubscribedstratService,
              private tokenService: TokenStorageService) {
    this.subscribedStratService.listen().subscribe((m: any) => {
      this.getAllStrategies();
    });
    this.subscribedListSource = new MatTableDataSource<UserSubscribeStrat>(this.ELEMENT_DATA);
  }

  ngOnInit(): void {
    if (this.tokenService.getUser()) {
      this.currentUser = this.tokenService.getUser().email;
    }
    this.getAllStrategies();
  }

  ngAfterViewInit(): void {
    this.subscribedListSource.paginator = this.paginator;
    this.subscribedListSource.sort = this.sort;
  }

  getAllStrategies(): void {
    const resp = this.subscribedStratService.getAllStrategiesByUser(this.currentUser);
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

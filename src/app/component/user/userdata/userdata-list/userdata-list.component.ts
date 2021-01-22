import {AfterViewInit, Component, OnInit, Output, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {EventEmitter} from 'events';
import {Router} from '@angular/router';
import {UserData} from '../../../../model/userData';
import {UserService} from '../../../../service/user.service';
import {TokenStorageService} from '../../../../service/token-storage.service';
import {UserdataUpdateComponent} from '../userdata-update/userdata-update.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-userdata-list',
  templateUrl: './userdata-list.component.html',
  styleUrls: ['./userdata-list.component.scss']
})
export class UserdataListComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();

  currentUser: any;
  userData: UserData;

  ELEMENT_DATA: UserData[];
  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['details', 'userEmail', 'userUsername', 'userFirstname', 'userLastname', 'userSignin', 'userGaz', 'edit'];
  usersListSource = new MatTableDataSource<UserData>();

  constructor(private userService: UserService,
              private tokenService: TokenStorageService,
              private router: Router,
              private dialog: MatDialog) {
    this.userService.listen().subscribe((m: any) => {
      this.getAllUsers();
    });
    this.usersListSource = new MatTableDataSource<UserData>(this.ELEMENT_DATA);
  }

  ngOnInit(): void {
    if (this.tokenService.getUser()) {
      this.currentUser = this.tokenService.getUser();
    }
    this.getAllUsers();
  }

  onEdit(email: string): void {
    this.userService.getUser(email).subscribe(user => {
      this.userData = user;
      console.log(user);
      this.dialog.open(UserdataUpdateComponent, {autoFocus: true, data: this.userData});
    }, error => {
      console.log(error);
    });
  }

  ngAfterViewInit(): void {
    this.usersListSource.paginator = this.paginator;
    this.usersListSource.sort = this.sort;
  }

  // Get all users
  getAllUsers(): void {
    const resp = this.userService.getAllUsers();
    resp.subscribe(report => this.usersListSource.data = report as UserData[]);
  }

  applyFilter($event: KeyboardEvent): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.usersListSource.filter = filterValue.trim().toLowerCase();

    if (this.usersListSource.paginator) {
      this.usersListSource.paginator.firstPage();
    }
  }

  showDetails(email: string): void {
    this.router.navigate(['detailsUser/', email]);
  }
}

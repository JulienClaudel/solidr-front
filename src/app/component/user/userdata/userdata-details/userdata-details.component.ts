import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from '../../../../service/token-storage.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {MatDialog} from '@angular/material/dialog';
import {UserData} from '../../../../model/userData';
import {UserService} from '../../../../service/user.service';
import {UserdataUpdateComponent} from '../userdata-update/userdata-update.component';
import {ConfirmCloseComponent} from '../confirm-close/confirm-close.component';
import {ConfirmActivateComponent} from '../confirm-activate/confirm-activate.component';

@Component({
  selector: 'app-userdata-details',
  templateUrl: './userdata-details.component.html',
  styleUrls: ['./userdata-details.component.scss']
})
export class UserdataDetailsComponent implements OnInit {

  userData: UserData;
  email: string;
  valid: boolean;
  isMember: false;
  isExpert: false;

  constructor(private userService: UserService,
              private tokenService: TokenStorageService,
              private route: ActivatedRoute,
              private toastr: ToastrService,
              private router: Router,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.email = this.route.snapshot.params.email;
    this.userService.getUser(this.email).subscribe(data => {
      this.userData = data;
    });
    if (this.tokenService.getUser()) {
      this.isMember = this.tokenService.getUser().roles.includes('ROLE_Member');
      this.isExpert = this.tokenService.getUser().roles.includes('ROLE_Expert');
    }
    // If the user is activate, the slide toggle will be turn on
    this.userService.getUser(this.email).subscribe( data => {
      if ( data.statusId === 11) {
        this.valid = false;
      } else {
        this.valid = true;
      }
    });
  }

  onEdit(userData: UserData): void {
    this.dialog.open(UserdataUpdateComponent, {autoFocus: true, data: userData});
  }

  onClose(): void {
    this.dialog.open(ConfirmCloseComponent, {height: '175px', data: this.userData});
  }

  // Request to activate or deactivate the user according to the state of the button
  activate(): void {
    if (this.valid.valueOf()) {
        this.dialog.open(ConfirmCloseComponent, {height: '175px', data: this.userData});
    } else {
      this.dialog.open(ConfirmActivateComponent, {height: '175px', data: this.userData});
    }
  }

  backToUsers(): void {
    this.router.navigate(['detailsProfile']);
  }
}

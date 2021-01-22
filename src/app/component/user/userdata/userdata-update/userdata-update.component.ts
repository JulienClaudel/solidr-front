import {Component, Inject, OnInit} from '@angular/core';
import {UserData} from '../../../../model/userData';
import {Router} from '@angular/router';
import {UserService} from '../../../../service/user.service';
import {TokenStorageService} from '../../../../service/token-storage.service';
import {FormBuilder, Validators} from '@angular/forms';
import {DateAdapter, NativeDateAdapter} from '@angular/material/core';
import {formatDate} from '@angular/common';
import {ToastrService} from 'ngx-toastr';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';

class PickDateAdapter extends NativeDateAdapter {
  format(date: Date): string {
    return formatDate(date, 'yyyy-MM-dd', this.locale);
  }
}
@Component({
  selector: 'app-userdata-update',
  templateUrl: './userdata-update.component.html',
  styleUrls: ['./userdata-update.component.scss'],
  providers: [{ provide: DateAdapter, useClass: PickDateAdapter }]
})
export class UserdataUpdateComponent implements OnInit {

  isLoggedIn = false;
  isUpdateFailed = false;
  errorMessage = '';
  start = new Date(2000);
  minDate = new Date(1900, 1, 1);
  maxDate = new Date(2002, 1, 1);

  updateForm = this.rf.group({
    userUsername: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
    userFirstname: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
    userLastname: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
    userLinkContact: [null, [Validators.required, Validators.email, Validators.maxLength(60)]],
    userDescription: [null, [Validators.required, Validators.maxLength(500)]]
  });

  constructor(private router: Router,
              private userService: UserService,
              private token: TokenStorageService,
              private rf: FormBuilder,
              private toastr: ToastrService,
              private dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public userData: UserData) {
  }

  ngOnInit(): void {
  }

  updateUser(): void {
    // Update user information from the admin
    this.userService.updateUser(this.userData.userEmail, this.userData)
      .subscribe(data => {
          console.log(data);
          this.dialog.closeAll();
          this.toastr.success('Modifications successful');
          }, error => {
          console.log(error);
          this.isUpdateFailed = true;
        }
      );
  }

  onSubmit(): void {
    this.updateUser();
    window.location.reload();
  }
}


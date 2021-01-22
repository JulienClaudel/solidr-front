import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {UserData} from '../../../../model/userData';
import {UserService} from '../../../../service/user.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-confirm-activate',
  templateUrl: './confirm-activate.component.html',
  styleUrls: ['./confirm-activate.component.scss']
})
export class ConfirmActivateComponent {

  constructor(public userService: UserService,
              public toastr: ToastrService,
              public dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public userData: UserData) {
  }

  close(): void {
    this.userService.activateAccount(this.userData.userEmail, this.userData)
      .subscribe(() => {
          this.dialog.closeAll();
          window.location.reload();
          this.showSuccessToaster('User account has been successfully activate');
        },
        error => this.showErrorToaster(JSON.stringify(error.error.message)));
  }

  cancel(): void {
    this.dialog.closeAll();
    window.location.reload();
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



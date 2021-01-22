import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {UserData} from '../../../../model/userData';
import {ProfileService} from '../../../../service/profile.service';

@Component({
  selector: 'app-deactivate2fa',
  templateUrl: './deactivate2FA.component.html',
  styleUrls: ['./deactivate2FA.component.scss']
})
export class Deactivate2FAComponent {

  constructor(private dialog: MatDialog,
              private profileService: ProfileService,
              @Inject(MAT_DIALOG_DATA) public userData: UserData) {
  }

  confirmDeactivate(): void {
    this.profileService.deactivate2FA(this.userData)
      .subscribe(() => {
        window.location.reload();
      });
  }

  onClose(): void {
    this.dialog.closeAll();
  }
}

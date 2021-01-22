import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {UserService} from '../../../../service/user.service';
import {TokenStorageService} from '../../../../service/token-storage.service';
import {ProfileService} from '../../../../service/profile.service';
import {RegisterService} from '../../../../service/register.service';

@Component({
  selector: 'app-activate-account',
  templateUrl: './activate-account.component.html',
  styleUrls: ['./activate-account.component.scss']
})
export class ActivateAccountComponent {

  emailSend = false;

  constructor(private userService: UserService,
              private profileService: ProfileService,
              private tokenService: TokenStorageService,
              private dialog: MatDialog,
              private registerService: RegisterService,
              @Inject(MAT_DIALOG_DATA) public email: string) {
  }

  // Button to verify your account and receive a mail
  verifyAccount(): void {
    this.registerService.verifyAccount(this.email).subscribe(() => {
      this.emailSend = true;
    });
  }

  onClose(): void {
    this.dialog.closeAll();
  }
}

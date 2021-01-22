import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from '../../../../service/token-storage.service';
import {Router} from '@angular/router';
import {UserData} from '../../../../model/userData';
import {UserService} from '../../../../service/user.service';
import {MatDialog} from '@angular/material/dialog';
import {formatDate} from '@angular/common';
import {ToastrService} from 'ngx-toastr';
import {RegisterService} from '../../../../service/register.service';
import {Activate2FAComponent} from '../activate2FA/activate2FA.component';
import {Deactivate2FAComponent} from '../deactivate2FA/deactivate2FA.component';
import {ProfileService} from '../../../../service/profile.service';
import {CloseAccountComponent} from '../close-account/close-account.component';

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.scss']
})
export class ProfileDetailsComponent implements OnInit {

  using2FA = false;
  log = false;
  enabled = false;
  currentUser: any;
  signIn: string;
  status = false;
  birthdate: string;
  userData: UserData;

  constructor(private token: TokenStorageService,
              private registerService: RegisterService,
              private profileService: ProfileService,
              private userService: UserService,
              private toastr: ToastrService,
              private router: Router,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {
    // If the user is not logged, it will be redirected to the dashboard
    this.currentUser = this.token.getUser();
    if (!this.token.getUser()) {
      this.router.navigate(['']);
    } else {
      this.userData = new UserData();
      // Retrieves user information and displays the different buttons depending on whether he is activated or not
      this.userService.getUser(this.currentUser.email)
        .subscribe(data => {
            console.log(data);
            this.userData = data;
            this.enabled = this.userData.enabled;
            this.status = this.userData.statusId === 10;
            this.signIn = formatDate(this.userData.userSignin, 'yyyy-MM-dd hh:mm:ss', 'en_US');
            this.birthdate = formatDate(this.userData.userBirthdate, 'yyyy-MM-dd', 'en_US');
            // To display the button to activate or deactivate the 2fa
            if (this.currentUser.using2FA) {
              this.using2FA = true;
            }
          },
          error => console.log(error));
    }
  }

  // Button to verify your account and receive a mail
  verifyAccount(email: string): void {
    this.registerService.verifyAccount(email)
      .subscribe(data => {
        console.log(data);
      });
    this.showSuccess();
  }

  // Button to send to modal deactivation of 2fa
  deactivate2FA(): void {
    this.dialog.open(Deactivate2FAComponent, {autoFocus: true, data: this.userData});
  }

  // Button to send to modal activation of 2fa
  activate2FA(): void {
    this.profileService.getSecret().subscribe(secret => {
      this.userData.userSecret = secret;
      this.dialog.open(Activate2FAComponent, {autoFocus: true, data: this.userData});
    });
  }

  // Button to close the user account
  closeAccount(): void {
    this.dialog.open(CloseAccountComponent, {autoFocus: true, data: this.userData});
  }

  // Button to update profile information
  goToUpdateProfile(email: string): void {
    this.router.navigate(['/updateProfile', email]);
  }

  // Button to add profile information
  goToAddInformations(email: string): void {
    this.router.navigate(['/addInformations', email]);
  }

  showSuccess(): void {
    this.toastr.success('An email has been sent to you again !', 'Email confirmation!');
  }
}

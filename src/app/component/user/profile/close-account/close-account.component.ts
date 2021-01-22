import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {UserData} from '../../../../model/userData';
import {UserService} from '../../../../service/user.service';
import {TokenStorageService} from '../../../../service/token-storage.service';
import {Router} from '@angular/router';
import {ProfileService} from '../../../../service/profile.service';

@Component({
  selector: 'app-close-account',
  templateUrl: './close-account.component.html',
  styleUrls: ['./close-account.component.scss']
})
export class CloseAccountComponent {

  close = false;

  constructor(private userService: UserService,
              private profileService: ProfileService,
              private tokenService: TokenStorageService,
              private dialog: MatDialog,
              private router: Router,
              @Inject(MAT_DIALOG_DATA) public userData: UserData) {
  }

  confirmClose(): void {
    this.profileService.closeAccount(this.userData)
      .subscribe(() => {
        this.tokenService.signOut();
        this.close = true;
        setTimeout(() => {
          this.router.navigate(['/login']).then(() => window.location.reload());
        }, 3000);
      }, error => {
        console.log(error);
      });
  }

  onClose(): void {
    this.dialog.closeAll();
  }
}

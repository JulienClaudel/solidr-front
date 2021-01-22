import {Component, Inject} from '@angular/core';
import {Router} from '@angular/router';
import {TokenStorageService} from '../../../../service/token-storage.service';
import {LoginService} from '../../../../service/login.service';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-login-oauth',
  templateUrl: './login-oauth.component.html',
  styleUrls: ['./login-oauth.component.scss']
})
export class LoginOauthComponent {

  auth = false;
  qr = false;
  errorMessage = '';

  constructor(private readonly router: Router,
              private readonly loginService: LoginService,
              private tokenService: TokenStorageService,
              private dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public form: any = {}) {
  }

  async verifyTotp(code: string): Promise<void> {
    this.loginService.verifyTotp(code, this.form).subscribe(
      data => {
        this.auth = true;
        this.tokenService.saveToken(data.accessToken);
        this.tokenService.saveUser(data);
        setTimeout(() => {
          this.dialog.closeAll();
          this.router.navigate([''])
            .then(() => window.location.reload());
        }, 3000);
      },
      err => {
        this.auth = false;
        this.qr = true;
        this.errorMessage = err.error.message;
      }
    );
  }
}

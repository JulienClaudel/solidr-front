import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from '../../../service/token-storage.service';
import {FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {ForgotPasswordComponent} from './forgot-password/forgot-password.component';
import {UserService} from '../../../service/user.service';
import {LoginService} from '../../../service/login.service';
import {ProfileService} from '../../../service/profile.service';
import {LoginOauthComponent} from './login-oauth/login-oauth.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  token: string;
  hide = true;
  form: any = {};
  loginForm = this.fb.group({
    email: [null, [Validators.required, Validators.email, Validators.maxLength(60)]],
    password: [null, [Validators.required, Validators.minLength(8), Validators.maxLength(30)]]
  });

  close = false;
  captcha = false;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';

  constructor(private loginService: LoginService,
              private router: Router,
              private tokenStorage: TokenStorageService,
              private fb: FormBuilder,
              private dialog: MatDialog,
              private profileService: ProfileService,
              private userService: UserService) {
  }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
    }
  }

  onSubmit(): void {
    window.sessionStorage.setItem('auth', this.form.password);
    this.userService.getUser(this.form.email).subscribe(
      user => {
        // If the user is activate and don't use 2FA, it will connect and be added in a session
        if (user.statusId !== 11) {
          if (!user.using2FA) {
            this.loginService.login(this.form).subscribe(
              data => {
                this.tokenStorage.saveToken(data.accessToken);
                this.tokenStorage.saveUser(data);
                this.isLoggedIn = true;
                this.router.navigate([''])
                  .then(() => window.location.reload());
              },
              err => {
                this.errorMessage = err.error.message;
                this.isLoginFailed = true;
              }
            );
          } else {
            // If the user has 2fa he  will be sent to the component to validate its code
            this.dialog.open(LoginOauthComponent, {data: this.form});
          }
        } else {
          // If the user is deactivate he will receive an email to reactivate his account
          this.close = true;
          this.profileService.confirmReactivate(this.form.email).subscribe();
          this.errorMessage = 'This account is close ! An email has been sent if you want to reactivate this account';
        }
      }, err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }

  // Validation of the captcha to validate the login
  onRecaptchaSuccess(token: string): void {
    this.token = token;
    this.captcha = true;
  }

  // Link to create an account
  newAccount(): void {
    this.router.navigate(['register']);
  }

  // Link if the user forgot his password
  forgotPassword(): void {
    this.dialog.closeAll();
    this.dialog.open(ForgotPasswordComponent, {autoFocus: true, data: this.form});
  }
}

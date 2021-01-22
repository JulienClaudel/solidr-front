import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MyErrorStateMatcher} from '../../../helper/MyErrorStateMatcher';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {RegisterService} from '../../../service/register.service';
import {ConfirmRegisterComponent} from './confirm-register/confirm-register.component';
import {RegisterOauthComponent} from './register-oauth/register-oauth.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  show = false;
  buttonName = 'Show';

  hideP = true;
  hideMP = true;
  form: any = {};
  token: string;
  captcha = false;
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  matcher = new MyErrorStateMatcher();

  // Form control for register
  registerForm = this.rf.group({
      username: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(8), Validators.maxLength(30)]],
      matchingPassword: [null, [Validators.required, Validators.minLength(8), Validators.maxLength(30)]]
    },
    {validator: this.checkPasswords});

  // Form control for terms
  terms = new FormControl('', [(control) => {
      return !control.value ? {required: true} : null;
    }]
  );

  using2FA = new FormControl('', [(control) => {
      return !control.value ? {required: true} : null;
    }]
  );

  constructor(private registerService: RegisterService,
              private rf: FormBuilder,
              private dialog: MatDialog,
              private router: Router) {
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    // If the user don't use 2FA, he will simply be register
    this.form.using2FA = this.using2FA.valid;
    if (!this.form.using2FA) {
      this.registerService.register(this.form)
        .subscribe(() => {
          this.confirmRegister();
          setTimeout(() => {
            this.router.navigate(['login']);
          }, 3000);
          this.isSuccessful = true;
          this.isSignUpFailed = false;
        }, err => {
          this.errorMessage = err.error.message;
          this.isSignUpFailed = true;
        });
    } else {
      // If the user use 2FA, his email and username will be verified before being sent to the qr code
      this.registerService.verifyEmail(this.form.email)
        .subscribe(() => {
          this.registerService.verifyUsername(this.form.username)
            .subscribe(() => {
              this.dialog.open(RegisterOauthComponent, { data: this.form});
            }, err => {
              this.isSignUpFailed = true;
              this.errorMessage = err.error.message;
              console.log(err);
            });
        }, error => {
          console.log(error);
          this.isSignUpFailed = true;
          this.errorMessage = error.error.message;
        });
    }
  }

  connect(): void {
    this.router.navigate(['login']);
  }

  // Modal to confirm the registration
  confirmRegister(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    this.dialog.open(ConfirmRegisterComponent, dialogConfig);
  }

  // Check if the passwords match
  // tslint:disable-next-line:typedef
  checkPasswords(group: FormGroup) {
    const password = group.get('password').value;
    const matchingPassword = group.get('matchingPassword').value;

    return password === matchingPassword ? null : {notSame: true};
  }

  // Validation of the captcha to validate the register
  onRecaptchaSuccess(token: string): void {
    this.token = token;
    this.captcha = true;
  }

  // Hide or Show details password
  toggle(): void {
    this.show = !this.show;
    if (this.show) {
      this.buttonName = 'Hide';
    } else {
      this.buttonName = 'Show';
    }
  }
}

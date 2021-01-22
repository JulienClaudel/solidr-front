import {Component} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {LoginService} from '../../../../service/login.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {

  token: string;
  hide = true;
  email: string;
  form: any = {};
  valid: boolean;
  errorMessage = '';
  isSuccessful = false;

  forgotForm = this.fb.group({
    email: [null, [Validators.required, Validators.email]]
  });

  constructor(private fb: FormBuilder,
              private loginService: LoginService) {
  }

  onSubmit(): void {
    this.email = this.form.email;
    this.loginService.forgotPassword(this.email)
      .subscribe(() => {
          this.valid = false;
          this.isSuccessful = true;
        },
        err => {
          this.valid = true;
          this.isSuccessful = false;
          this.errorMessage = err.error.message;
        }
      );
  }
}

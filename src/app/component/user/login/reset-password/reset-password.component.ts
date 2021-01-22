import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {LoginService} from '../../../../service/login.service';
import {ProfileService} from '../../../../service/profile.service';
import {ToastrService} from 'ngx-toastr';
import {MyErrorStateMatcher} from '../../../../helper/MyErrorStateMatcher';

enum TokenStatus {
  Validating,
  Valid,
  Invalid
}

@Component({
  selector: 'app-reset-password',
  templateUrl: 'reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  TokenStatus = TokenStatus;
  tokenStatus = TokenStatus.Validating;
  show = false;
  buttonName = 'Show';
  token = null;
  hideP = true;
  hideMP = true;
  form: any = {};
  loading = false;
  submitted = false;
  matcher = new MyErrorStateMatcher();

  resetPassword = this.rp.group({
      password: [null, [Validators.required, Validators.minLength(8), Validators.maxLength(30)]],
      confirmPassword: [null, [Validators.required, Validators.minLength(8), Validators.maxLength(30)]]
    },
    {validator: this.checkPasswords});

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private toastr: ToastrService,
              private rp: FormBuilder,
              private loginService: LoginService,
              private profileService: ProfileService) {
  }

  ngOnInit(): void {
    const token = this.route.snapshot.queryParams.token;
    // remove token from url to prevent http referer leakage
    this.router.navigate([], { relativeTo: this.route, replaceUrl: true });

    this.profileService.getUserByToken(token)
      .subscribe({
        next: () => {
          this.token = token;
          this.tokenStatus = TokenStatus.Valid;
        },
        error: () => {
          this.tokenStatus = TokenStatus.Invalid;
        }
      });
  }

  onSubmit(): void {
    this.submitted = true;
    this.loading = true;
    this.loginService.resetPassword(this.token, this.form.password)
      .subscribe({
        next: () => {
          setTimeout(() => {
            this.router.navigate(['login']).then(() => this.toastr.success('Password reset successful, you can now login', 'Password reset successful'));
          }, 2000);
        },
        error: error => {
          this.toastr.error(error);
          this.loading = false;
        }
      });
  }

  // Check if the passwords match
  // tslint:disable-next-line:typedef
  checkPasswords(group: FormGroup) {
    const password = group.get('password').value;
    const confirmPassword = group.get('confirmPassword').value;

    return password === confirmPassword ? null : {notSame: true};
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

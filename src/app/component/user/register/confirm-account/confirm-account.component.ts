import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {UserData} from '../../../../model/userData';
import {RegisterService} from '../../../../service/register.service';

enum EmailStatus {
  Verifying,
  Failed
}

@Component({
  selector: 'app-confirm-account',
  templateUrl: 'confirm-account.component.html',
  styleUrls: ['./confirm-account.component.scss']
})
export class ConfirmAccountComponent implements OnInit {
  EmailStatus = EmailStatus;
  emailStatus = EmailStatus.Verifying;
  userData = new UserData();

  constructor(private route: ActivatedRoute,
              private router: Router,
              private toastr: ToastrService,
              private registerService: RegisterService) {
  }

  ngOnInit(): void {
    const token = this.route.snapshot.queryParams.token;
    // remove token from url to prevent http referer leakage
    this.router.navigate([], {relativeTo: this.route, replaceUrl: true});
    this.registerService.confirmAccount(token)
      .subscribe(() => {
        setTimeout(() => {
          this.router.navigate(['login']).then(() => this.toastr.success('Your account is now activate', 'Verification successful'));
        }, 2000);
      }, () => {
        this.emailStatus = EmailStatus.Failed;
      });
  }
}

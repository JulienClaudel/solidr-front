import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {ProfileService} from '../../../../service/profile.service';
import {UserData} from '../../../../model/userData';

enum EmailStatus {
  Verifying,
  Failed
}

@Component({
  selector: 'app-verify-email',
  templateUrl: 'verify-email.component.html',
  styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent implements OnInit {
  EmailStatus = EmailStatus;
  emailStatus = EmailStatus.Verifying;
  userData = new UserData();

  constructor(private route: ActivatedRoute,
              private router: Router,
              private toastr: ToastrService,
              private profileService: ProfileService) {
  }

  ngOnInit(): void {
    const token = this.route.snapshot.queryParams.token;
    // remove token from url to prevent http referer leakage
    this.router.navigate([], {relativeTo: this.route, replaceUrl: true});
    this.profileService.getUserByToken(token)
      .subscribe(user => {
        this.userData = user;
        this.profileService.reactivateAccount(this.userData)
          .subscribe(() => {
            setTimeout(() => {
              this.router.navigate(['login']).then(() => this.toastr.success('Your account is reactivate, you can now login', 'Verification successful'));
            }, 2000);
          }, () => {
            this.emailStatus = EmailStatus.Failed;
          });
      });
  }
}

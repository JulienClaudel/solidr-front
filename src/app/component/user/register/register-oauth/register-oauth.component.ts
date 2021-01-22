import {Component, Inject, OnInit} from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {ActivatedRoute, Router} from '@angular/router';
import * as qrcode from 'qrcode-generator';
import {TokenStorageService} from '../../../../service/token-storage.service';
import {UserData} from '../../../../model/userData';
import {RegisterService} from '../../../../service/register.service';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {ProfileService} from '../../../../service/profile.service';

@Component({
  selector: 'app-register-oauth',
  templateUrl: './register-oauth.component.html',
  styleUrls: ['./register-oauth.component.scss']
})
export class RegisterOauthComponent implements OnInit {

  link: string;
  email: string;
  qrSafeLink: SafeResourceUrl | null = null;
  qrCode: string | null = null;
  userData: UserData;
  errorMessage = '';
  auth = false;
  qr = false;

  constructor(private readonly router: Router,
              private readonly registerService: RegisterService,
              private tokenService: TokenStorageService,
              private readonly sanitizer: DomSanitizer,
              private route: ActivatedRoute,
              private dialog: MatDialog,
              private profileService: ProfileService,
              @Inject(MAT_DIALOG_DATA) public form: any = {}) {
  }

  ngOnInit(): void {
    this.profileService.getSecret().subscribe(secret => {
      this.form.secret = secret;
      this.link = `otpauth://totp/${this.form.email}?secret=${secret}&issuer=Solidr`;
      this.qrSafeLink = this.sanitizer.bypassSecurityTrustResourceUrl(this.link);
      const qrAdmin = qrcode(0, 'L');
      qrAdmin.addData(this.link);
      qrAdmin.make();
      this.qrCode = qrAdmin.createDataURL(4);
    });
  }

  async verifyCode(code: string): Promise<void> {
    this.profileService.verifyCode(code, this.form.secret)
      .subscribe(() => {
        this.form.using2FA = true;
        this.registerService.register(this.form).subscribe(() => {
          this.auth = true;
          setTimeout(() => {
            this.router.navigate(['login']);
          }, 3000);
        }, error => {
          this.auth = false;
          this.errorMessage = error.error.message;
        });
      }, err => {
        this.qr = true;
        this.errorMessage = err.error.message;
      });
  }
}

import {Component, Inject, OnInit} from '@angular/core';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {UserData} from '../../../../model/userData';
import * as qrcode from 'qrcode-generator';
import {ActivatedRoute, Router} from '@angular/router';
import {TokenStorageService} from '../../../../service/token-storage.service';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {ProfileService} from '../../../../service/profile.service';

@Component({
  selector: 'app-activate2fa',
  templateUrl: './activate2FA.component.html',
  styleUrls: ['./activate2FA.component.scss']
})
export class Activate2FAComponent implements OnInit {

  link: string;
  qrSafeLink: SafeResourceUrl | null = null;
  qrCode: string | null = null;
  errorMessage = '';
  auth = false;
  qr = false;

  constructor(private readonly router: Router,
              private tokenService: TokenStorageService,
              private readonly sanitizer: DomSanitizer,
              private route: ActivatedRoute,
              private dialog: MatDialog,
              private profileService: ProfileService,
              @Inject(MAT_DIALOG_DATA) public userData: UserData) {
  }

  ngOnInit(): void {
    this.link = `otpauth://totp/${this.userData.userEmail}?secret=${this.userData.userSecret}&issuer=Solidr`;
    this.qrSafeLink = this.sanitizer.bypassSecurityTrustResourceUrl(this.link);
    const qrAdmin = qrcode(0, 'L');
    qrAdmin.addData(this.link);
    qrAdmin.make();
    this.qrCode = qrAdmin.createDataURL(4);
  }

  async verifyCode(code: string): Promise<void> {
    this.profileService.verifyCode(code, this.userData.userSecret)
      .subscribe(() => {
        this.profileService.activate2FA(this.userData).subscribe();
        this.auth = true;
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }, err => {
        this.auth = false;
        this.qr = true;
        this.errorMessage = err.error.message;
      });
  }
}

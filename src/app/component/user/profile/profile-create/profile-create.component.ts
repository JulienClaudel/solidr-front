import {Component, OnInit} from '@angular/core';
import {UserData} from '../../../../model/userData';
import {Router} from '@angular/router';
import {UserService} from '../../../../service/user.service';
import {TokenStorageService} from '../../../../service/token-storage.service';
import {FormBuilder, Validators} from '@angular/forms';
import {DateAdapter, NativeDateAdapter} from '@angular/material/core';
import {formatDate} from '@angular/common';
import {ToastrService} from 'ngx-toastr';
import {ProfileService} from '../../../../service/profile.service';

class PickDateAdapter extends NativeDateAdapter {
  format(date: Date): string {
    return formatDate(date, 'yyyy-MM-dd', this.locale);
  }
}

@Component({
  selector: 'app-profile-create',
  templateUrl: './profile-create.component.html',
  styleUrls: ['./profile-create.component.scss'],
  providers: [{provide: DateAdapter, useClass: PickDateAdapter}]
})
export class ProfileCreateComponent implements OnInit {

  currentUser: any;
  userData: UserData;

  isLoggedIn = false;
  isUpdateFailed = false;
  errorMessage = '';
  start = new Date(2000);
  minDate = new Date(1900, 1, 1);
  maxDate = new Date(2002, 1, 1);

  createForm = this.rf.group({
    userFirstname: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
    userLastname: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
    userDescription: [null, [Validators.required, Validators.maxLength(500)]],
    userLinkContact: [null, [Validators.required, Validators.email, Validators.maxLength(60)]]
  });

  constructor(private router: Router,
              private profileService: ProfileService,
              private userService: UserService,
              private token: TokenStorageService,
              private rf: FormBuilder,
              private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.userData = new UserData();
    this.currentUser = this.token.getUser();
    this.userService.getUser(this.currentUser.email)
      .subscribe(data => {
          this.userData = data;
        },
        error =>
          console.log(error));
    // If the token exist, the user is logged
    if (this.token.getToken()) {
      this.isLoggedIn = true;
    }
  }

  addInformations(): void {
    // Add user information from his profile
    this.profileService.addInformations(this.currentUser.email, this.userData)
      .subscribe(() => {
        this.isUpdateFailed = false;
        this.router.navigate(['detailsProfile']).then(() => this.toastr.success('Your modifications were made successfully', 'Modifications done !'));
      }, error => {
        console.log(error);
        this.isUpdateFailed = true;
      });
  }

  onSubmit(): void {
    this.addInformations();
  }

  goToProfile(): void {
    this.router.navigate(['/detailsProfile']);
  }
}


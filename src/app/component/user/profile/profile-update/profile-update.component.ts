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
    selector: 'app-profile-update',
    templateUrl: './profile-update.component.html',
    styleUrls: ['./profile-update.component.scss'],
    providers: [{ provide: DateAdapter, useClass: PickDateAdapter }]
})
export class ProfileUpdateComponent implements OnInit {

    currentUser: any;
    userData: UserData;

    isLoggedIn = false;
    isUpdateFailed = false;
    errorMessage = '';
    start = new Date(2000);
    minDate = new Date(1900, 1, 1);
    maxDate = new Date(2002, 1, 1);

    // Form control for update information
    updateForm = this.rf.group({
        userFirstname: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
        userLastname: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
        userLinkContact: [null, [Validators.required, Validators.email, Validators.maxLength(60)]],
        userDescription: [null, [Validators.required, Validators.maxLength(500)]]
    });

    constructor(private router: Router,
                private userService: UserService,
                private profileService: ProfileService,
                private token: TokenStorageService,
                private rf: FormBuilder,
                private toastr: ToastrService) {
    }

    ngOnInit(): void {
        // Retrieve user information from the session storage
        this.userData = new UserData();
        this.currentUser = this.token.getUser();
        this.userService.getUser(this.currentUser.email)
            .subscribe(data => {
                    this.userData = data;
                },
                error =>
                    console.log(error));
        if (this.token.getToken()) {
            this.isLoggedIn = true;
        }
    }

    // Update information of the user profile
    updateUser(): void {
        this.profileService.updateProfile(this.currentUser.email, this.userData)
            .subscribe(data => {
                    console.log(data);
                    this.router.navigate(['detailsProfile']).then(() => this.toastr.success('Your modifications were made successfully', 'Modifications done !'));
              }, error => {
                    console.log(error);
                    this.isUpdateFailed = true;
                }
            );
    }

    onSubmit(): void {
        this.updateUser();
    }

    goToProfile(): void {
        this.router.navigate(['/detailsProfile']);
    }
}

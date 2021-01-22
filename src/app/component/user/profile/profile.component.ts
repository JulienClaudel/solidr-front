import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from '../../../service/token-storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  isUser = false;
  isMember = false;
  isExpert = false;
  isStaff = false;
  isAdmin = false;

  currentUser: any;

  constructor(private tokenService: TokenStorageService) {
  }

  ngOnInit(): void {
    // Retrieve all the different profile
    if (this.tokenService.getUser()) {
      this.currentUser = this.tokenService.getUser();
      if (this.tokenService.getUser().roles.includes('ROLE_Admin')) {
        this.isAdmin = this.tokenService.getUser().roles.includes('ROLE_Admin');
      } else if (this.tokenService.getUser().roles.includes('ROLE_Staff')) {
        this.isStaff = this.tokenService.getUser().roles.includes('ROLE_Staff');
      } else if (this.tokenService.getUser().roles.includes('ROLE_Expert')) {
        this.isExpert = this.tokenService.getUser().roles.includes('ROLE_Expert');
      } else if (this.tokenService.getUser().roles.includes('ROLE_Member')) {
        this.isMember = this.tokenService.getUser().roles.includes('ROLE_Member');
      } else {
        this.isUser = this.tokenService.getUser().roles.includes('ROLE_User');
      }
    }
  }
}

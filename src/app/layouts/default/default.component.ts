import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from '../../service/token-storage.service';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {

  private roles: string[];
  sideBarOpen = true;
  currentUser: any;
  isLoggedIn = false;
  isUser: boolean;

  constructor(private tokenService: TokenStorageService) {
  }

  ngOnInit(): void {
    this.resDetect();

    this.isLoggedIn = !!this.tokenService.getToken();
    if (this.isLoggedIn) {
      this.currentUser = this.tokenService.getUser();
      this.roles = this.currentUser.roles;
      this.isUser = this.roles.includes('ROLE_User');
    }
  }

  resDetect(): void {
    if (window.innerWidth >= 992) {
      this.sideBarOpen = true;
    } else {
      this.sideBarOpen = false;
    }
  }

  sideBarToggler($event: any): void {
    this.sideBarOpen = !this.sideBarOpen;
  }
}

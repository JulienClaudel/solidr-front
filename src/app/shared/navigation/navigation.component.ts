import {Component, OnInit} from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import {TokenStorageService} from '../../service/token-storage.service';
import {LoginService} from '../../service/login.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  constructor(private breakpointObserver: BreakpointObserver,
              private tokenStorageService: TokenStorageService,
              private loginService: LoginService,
              private router: Router) { }

  private roles: string[];
  showAdminBoard: boolean;
  currentUser: any;
  isLoggedIn = false;
  status: boolean;
  profil: string;
  form: any = {};

  ngOnInit(): void {
    // Update the session with current information
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      this.currentUser = this.tokenStorageService.getUser();
      this.status = this.currentUser.statusId === 10;
      this.form.email = this.currentUser.email;
      this.form.password = window.sessionStorage.getItem('auth');
      this.loginService.login(this.form).subscribe(
        data => {
          this.tokenStorageService.saveToken(data.accessToken);
          this.tokenStorageService.saveUser(data);
        });
      // Change the name of the roles to remove 'ROLE_' in front of
      this.roles = this.currentUser.roles;
      this.showAdminBoard = this.roles.includes('ROLE_Admin');
      if (this.roles.includes('ROLE_Admin')) {
        this.profil = 'Admin';
      } else if (this.roles.includes('ROLE_Staff')) {
        this.profil = 'Staff';
      } else if (this.roles.includes('ROLE_Expert')) {
        this.profil = 'Expert';
      } else if (this.roles.includes('ROLE_Member')) {
        this.profil = 'Member';
      } else {
        this.profil = 'User';
      }
    }
  }

  goToDashboard(): void {
    this.router.navigate(['']).then(() => window.location.reload());
  }
  goToTrade(): void {
    this.router.navigate(['/trade']).then(() => window.location.reload());
  }
}

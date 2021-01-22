import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BreakpointObserver} from '@angular/cdk/layout';
import {TokenStorageService} from '../../service/token-storage.service';
import {Router} from '@angular/router';
import {ThemePalette} from '@angular/material/core';
import {ProgressBarMode} from '@angular/material/progress-bar';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  /* PROGRESS BAR */
  color: ThemePalette = 'primary';
  mode: ProgressBarMode = 'determinate';
  value = 50;
  bufferValue = 75;

  @Output() toggleSideBarForMe: EventEmitter<any> = new EventEmitter();
  isLoggedIn = false;
  isMenuOpen = true;
  isUser: boolean;
  private roles: string[];
  currentUser: any;
  contentMargin = 240;
  username: string;
  profil: string;

  @Input() counter = 3;

  constructor(private breakpointObserver: BreakpointObserver,
              private tokenService: TokenStorageService,
              private router: Router) {
  }

  onToolBarMenuToggle(): void {
    // Fix the problem of the avatar when toggle the menu
    if (!this.isMenuOpen) {
      this.contentMargin = 70;
    } else {
      this.contentMargin = 240;
    }
  }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenService.getToken();
    if (this.isLoggedIn) {
      this.currentUser = this.tokenService.getUser();
      this.roles = this.currentUser.roles;
      this.isUser = this.roles.includes('ROLE_Staff');
      this.username = this.currentUser.username;
    }
  }

  logout(): void {
    this.tokenService.signOut();
    this.router.navigate(['login']).then(() => window.location.reload());
  }


  toggleSideBar(): void {
    this.toggleSideBarForMe.emit();
    setTimeout(() => {
      window.dispatchEvent(
        new Event('resize')
      );
    }, 300);
  }
}

import {Component, OnInit} from '@angular/core';
import {interval, Subscription} from 'rxjs';
import {SubscribedstratService} from './service/subscribedstrat.service';
import {TokenStorageService} from './service/token-storage.service';
import {UserService} from './service/user.service';
import {UserData} from './model/userData';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'SolidR';
  subscription: Subscription;
  intervalId: number;
  currentUser: any;
  user: UserData = new UserData();

  constructor(private subService: SubscribedstratService,
              private userService: UserService,
              private tokenService: TokenStorageService) {
  }

  ngOnInit(): void {
    if (this.tokenService.getUser()) {
      this.currentUser = this.tokenService.getUser().email;
    }
    const source = interval(60000 * 60 * 24);
    const text = 'decrement 1 sldr';
    this.subscription = source.subscribe(val => this.opensnack(text));
  }

  opensnack(text): void {
    this.userService.getAllUsers().subscribe(data => {
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < data.length; i++) {
        this.user = data;
        this.user.userGaz = this.user.userGaz - 1;
        this.userService.updateGas(this.user.userEmail, this.user).subscribe();
      }
    });
    console.log(text);
  }

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnDestroy(): void {
    // tslint:disable-next-line:no-unused-expression
    this.subscription && this.subscription.unsubscribe();
  }


}

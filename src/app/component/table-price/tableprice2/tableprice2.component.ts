import {Component, ElementRef, OnInit, Output, ViewChild} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {UserData} from '../../../model/userData';
import {UserService} from '../../../service/user.service';
import {TokenStorageService} from '../../../service/token-storage.service';

declare var paypal;

@Component({
  selector: 'app-tableprice2',
  templateUrl: './tableprice2.component.html',
  styleUrls: ['./tableprice2.component.scss']
})
export class Tableprice2Component implements OnInit {
  @ViewChild('paypal', {static: true}) paypalElement: ElementRef;

  product = {
    price: 20,
    description: '20 SLDR',
    img: 'assets/couch.jpg'
  };

  user: UserData = new UserData();
  currentUser: any;

  constructor(private toastr: ToastrService,
              private userService: UserService,
              private tokenService: TokenStorageService) { }

  ngOnInit(): void {
    this.btn();
    if (this.tokenService.getUser()) {
      this.currentUser = this.tokenService.getUser();
    }
  }

  btn(): void {
    paypal
      .Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                description: this.product.description,
                amount: {
                  currency_code: 'USD',
                  value: this.product.price
                }
              }
            ]
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          this.showSuccessToaster('You have bought 20 SLDR');
          this.updateGas();
        },
        onError: err => {
          this.showErrorToaster(JSON.stringify(err.error.message));
        }
      })
      .render(this.paypalElement.nativeElement);
  }
  /* Success message */
  showSuccessToaster(success: string): void {
    this.toastr.success(success, 'Congrats!');
  }

  /* Error message */
  showErrorToaster(error: string): void {
    this.toastr.error(error, 'Oups!');
  }

  /*
  * Dedicated method to update the User Gas after payment
   */
  updateGas(): void {
    this.userService.getUser(this.currentUser.email).subscribe(data => {
      this.user = data;
      this.user.userGaz = this.user.userGaz + 20;
      this.userService.updateGas(this.user.userEmail, this.user).subscribe();
    });
  }
}

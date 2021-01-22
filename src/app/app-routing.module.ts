import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './component/dashboard/dashboard.component';
import {TablesComponent} from './component/utilities/tables/tables.component';
import {FormsComponent} from './component/utilities/forms/forms.component';
import {StaticchartComponent} from './component/candlestick/staticchart/staticchart.component';
import {StrategyComponent} from './component/strategy/strategy.component';
import {LoginComponent} from './component/user/login/login.component';
import {RegisterComponent} from './component/user/register/register.component';
import {FrontPageComponent} from './component/front-page/front-page.component';
import {TradeComponent} from './component/trade/trade.component';
import {DefaultComponent} from './layouts/default/default.component';
import {TablePriceComponent} from './component/table-price/table-price.component';
import {PaypalComponent} from './modules/payment/paypal/paypal.component';
import {ProfileUpdateComponent} from './component/user/profile/profile-update/profile-update.component';
import {ProfileCreateComponent} from './component/user/profile/profile-create/profile-create.component';
import {ForgotPasswordComponent} from './component/user/login/forgot-password/forgot-password.component';
import {ResetPasswordComponent} from './component/user/login/reset-password/reset-password.component';
import {StrategyDetailsComponent} from './component/strategy/strategy-details/strategy-details.component';
import {Activate2FAComponent} from './component/user/profile/activate2FA/activate2FA.component';
import {ProfileComponent} from './component/user/profile/profile.component';
import {Deactivate2FAComponent} from './component/user/profile/deactivate2FA/deactivate2FA.component';
import {SubscribedStratComponent} from './component/subscribed-strat/subscribed-strat.component';
import {UserdataListComponent} from './component/user/userdata/userdata-list/userdata-list.component';
import {UserdataDetailsComponent} from './component/user/userdata/userdata-details/userdata-details.component';
import {UserdataUpdateComponent} from './component/user/userdata/userdata-update/userdata-update.component';
import {UserdataComponent} from './component/user/userdata/userdata.component';
import {VerifyEmailComponent} from './component/user/login/verify-email/verify-email.component';
import {ConfirmAccountComponent} from './component/user/register/confirm-account/confirm-account.component';
import {RegisterOauthComponent} from './component/user/register/register-oauth/register-oauth.component';
import {LoginOauthComponent} from './component/user/login/login-oauth/login-oauth.component';
import {ActivateAccountComponent} from './component/user/profile/activate-account/activate-account.component';

const routes: Routes = [
  {
    path: '', component: DefaultComponent,
    children: [
      {path: '', component: DashboardComponent},
      {path: 'front', component: FrontPageComponent},
      {path: 'tables', component: TablesComponent},
      {path: 'forms', component: FormsComponent},
      {path: 'staticchart', component: StaticchartComponent},
      {path: 'marketPlace', component: StrategyComponent},
      {path: 'detailsstrategy/:id', component: StrategyDetailsComponent},
      {path: 'login', component: LoginComponent},
      {path: 'resetPassword', component: ResetPasswordComponent},
      {path: 'forgotPassword', component: ForgotPasswordComponent},
      {path: 'register', component: RegisterComponent},
      {path: 'signup-secret/:email', component: RegisterOauthComponent},
      {path: 'verify-totp/:email', component: LoginOauthComponent},
      {path: 'activate2FA/:email', component: Activate2FAComponent},
      {path: 'deactivate2FA', component: Deactivate2FAComponent},
      {path: 'detailsProfile', component: ProfileComponent},
      {path: 'updateProfile/:email', component: ProfileUpdateComponent},
      {path: 'addInformations/:email', component: ProfileCreateComponent},
      {path: 'trade', component: TradeComponent},
      {path: 'gas', component: TablePriceComponent},
      {path: 'paypal', component: PaypalComponent},
      {path: 'sub', component: SubscribedStratComponent},
      {path: 'listUsers', component: UserdataListComponent},
      {path: 'detailsUser/:email', component: UserdataDetailsComponent},
      {path: 'updateUser/:email', component: UserdataUpdateComponent},
      {path: 'users', component: UserdataComponent},
      {path: 'verify-email', component: VerifyEmailComponent},
      {path: 'confirm-account', component: ConfirmAccountComponent},
      {path: 'reset-password', component: ResetPasswordComponent},
      {path: 'activate-account', component: ActivateAccountComponent}
    ]
  },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}

import {BrowserModule} from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import {NavigationComponent} from './shared/navigation/navigation.component';
import {LayoutModule} from '@angular/cdk/layout';
import {DashboardComponent} from './component/dashboard/dashboard.component';
import {AppRoutingModule} from './app-routing.module';
import {TablesComponent} from './component/utilities/tables/tables.component';
import {FormsComponent} from './component/utilities/forms/forms.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {StrategyComponent} from './component/strategy/strategy.component';
import {StrategyCreateComponent} from './component/strategy/strategy-create/strategy-create.component';
import {StrategyListComponent} from './component/strategy/strategy-list/strategy-list.component';
import {StrategyUpdateComponent} from './component/strategy/strategy-update/strategy-update.component';
import {StrategyDetailsComponent} from './component/strategy/strategy-details/strategy-details.component';
import {StaticchartComponent} from './component/candlestick/staticchart/staticchart.component';
import {ChartComponent} from './component/chart/chart.component';
import {MaterialModule} from './material.module';
import {RouterModule} from '@angular/router';
import {FlexLayoutModule} from '@angular/flex-layout';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {TradeComponent} from './component/trade/trade.component';
import {TradeCreateComponent} from './component/trade/trade-create/trade-create.component';
import {TradeListComponent} from './component/trade/trade-list/trade-list.component';
import {TradeDetailsComponent} from './component/trade/trade-details/trade-details.component';
import {WalletComponent} from './component/wallet/wallet.component';
import {LoginComponent} from './component/user/login/login.component';
import {RegisterComponent} from './component/user/register/register.component';
import {authInterceptorProviders} from './helper/auth.interceptor';
import {ChartsModule} from 'ng2-charts';
import {FrontPageComponent} from './component/front-page/front-page.component';
import {ToastrModule} from 'ngx-toastr';
import {TradecandleComponent} from './component/candlestick/tradecandle/tradecandle.component';
import {DefaultComponent} from './layouts/default/default.component';
import {HeaderComponent} from './shared/header/header.component';
import {FooterComponent} from './shared/footer/footer.component';
import {MatPasswordStrengthModule} from '@angular-material-extensions/password-strength';
import {SpinnerComponent} from './component/utilities/spinner/spinner.component';
import {InterceptorService} from './service/interceptor.service';
import {ConfirmRegisterComponent} from './component/user/register/confirm-register/confirm-register.component';
import {RegisterRecaptchaDirective} from './component/user/register/register-recaptcha.directive';
import {LoginRecaptchaDirective} from './component/user/login/login-recaptcha.directive';
import {TablePriceComponent} from './component/table-price/table-price.component';
import {ProfileUpdateComponent} from './component/user/profile/profile-update/profile-update.component';
import {ProfileDetailsComponent} from './component/user/profile/profile-details/profile-details.component';
import {PaypalComponent} from './modules/payment/paypal/paypal.component';
import {ProfileCreateComponent} from './component/user/profile/profile-create/profile-create.component';
import {TrademacdComponent} from './component/candlestick/trademacd/trademacd.component';
import {ForgotPasswordComponent} from './component/user/login/forgot-password/forgot-password.component';
import {ResetPasswordComponent} from './component/user/login/reset-password/reset-password.component';
import {DialogElementsComponent} from './shared/dialog-elements/dialog-elements.component';
import {CommentComponent} from './component/comment/comment.component';
import {Activate2FAComponent} from './component/user/profile/activate2FA/activate2FA.component';
import {CommentCreateComponent} from './component/comment/comment-create/comment-create.component';
import {StarRatingComponent} from './component/comment/star-rating/star-rating.component';
import {SubscribedStratComponent} from './component/subscribed-strat/subscribed-strat.component';
import {SubscribedUserComponent} from './component/subscribed-strat/subscribed-user/subscribed-user.component';
import {SubscribedStrategyComponent} from './component/subscribed-strat/subscribed-strategy/subscribed-strategy.component';
import {ProfileComponent} from './component/user/profile/profile.component';
import {Deactivate2FAComponent} from './component/user/profile/deactivate2FA/deactivate2FA.component';
import {UserdataDetailsComponent} from './component/user/userdata/userdata-details/userdata-details.component';
import {UserdataComponent} from './component/user/userdata/userdata.component';
import {UserdataListComponent} from './component/user/userdata/userdata-list/userdata-list.component';
import {UserdataUpdateComponent} from './component/user/userdata/userdata-update/userdata-update.component';
import {SubscribedStratContainerComponent} from './component/subscribed-strat/subscribed-strat-container/subscribed-strat-container.component';
import {SubscribedStratCreateComponent} from './component/subscribed-strat/subscribed-strat-create/subscribed-strat-create.component';
import {ConfirmCloseComponent} from './component/user/userdata/confirm-close/confirm-close.component';
import {VerifyEmailComponent} from './component/user/login/verify-email/verify-email.component';
import {ConfirmAccountComponent} from './component/user/register/confirm-account/confirm-account.component';
import {LoginOauthComponent} from './component/user/login/login-oauth/login-oauth.component';
import {RegisterOauthComponent} from './component/user/register/register-oauth/register-oauth.component';
import {CloseAccountComponent} from './component/user/profile/close-account/close-account.component';
import {ConfirmActivateComponent} from './component/user/userdata/confirm-activate/confirm-activate.component';
import { TablepriceComponent } from './component/table-price/tableprice/tableprice.component';
import { Tableprice2Component } from './component/table-price/tableprice2/tableprice2.component';
import { Tableprice3Component } from './component/table-price/tableprice3/tableprice3.component';
import {ActivateAccountComponent} from './component/user/profile/activate-account/activate-account.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    DashboardComponent,
    TablesComponent,
    FormsComponent,
    FrontPageComponent,
    StaticchartComponent,
    StrategyComponent,
    StrategyCreateComponent,
    StrategyListComponent,
    StrategyUpdateComponent,
    StrategyDetailsComponent,
    ChartComponent,
    TradeComponent,
    TradeCreateComponent,
    TradeListComponent,
    TradeDetailsComponent,
    WalletComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    ProfileDetailsComponent,
    ProfileUpdateComponent,
    ProfileCreateComponent,
    TradecandleComponent,
    DefaultComponent,
    HeaderComponent,
    FooterComponent,
    SpinnerComponent,
    ConfirmRegisterComponent,
    SpinnerComponent,
    FooterComponent,
    RegisterRecaptchaDirective,
    LoginRecaptchaDirective,
    TablePriceComponent,
    PaypalComponent,
    TablePriceComponent,
    TrademacdComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    DialogElementsComponent,
    LoginOauthComponent,
    RegisterOauthComponent,
    Activate2FAComponent,
    Deactivate2FAComponent,
    CommentComponent,
    CommentCreateComponent,
    StarRatingComponent,
    SubscribedStratComponent,
    SubscribedUserComponent,
    SubscribedStrategyComponent,
    UserdataDetailsComponent,
    UserdataComponent,
    UserdataUpdateComponent,
    UserdataListComponent,
    SubscribedStratContainerComponent,
    SubscribedStratCreateComponent,
    CloseAccountComponent,
    ConfirmCloseComponent,
    ConfirmActivateComponent,
    VerifyEmailComponent,
    ConfirmAccountComponent,
    TablepriceComponent,
    Tableprice2Component,
    Tableprice3Component,
    ActivateAccountComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    LayoutModule,
    AppRoutingModule,
    ReactiveFormsModule,
    RouterModule,
    MaterialModule,
    FlexLayoutModule,
    HttpClientModule,
    FormsModule,
    ChartsModule,
    ToastrModule.forRoot(),
    MatPasswordStrengthModule.forRoot(),
  ],
  providers: [
    authInterceptorProviders,
    {provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true}
  ],
  bootstrap: [AppComponent],
  entryComponents: [StrategyCreateComponent, StrategyUpdateComponent, SubscribedStratCreateComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class AppModule { }

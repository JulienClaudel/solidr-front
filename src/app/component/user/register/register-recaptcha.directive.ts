import {Directive, Output, EventEmitter, ElementRef, NgZone, Inject, OnInit, OnDestroy} from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Directive({
  selector: '[appRecaptchaRegister]'
})
export class RegisterRecaptchaDirective implements OnInit, OnDestroy{

  @Output() recaptchaSuccess = new EventEmitter<string>();
  @Output() recaptchaExpired = new EventEmitter<unknown>();
  @Output() recaptchaError = new EventEmitter<unknown>();

  private readonly scriptId = 'recaptchaReg';
  widgetId: number;

  constructor(
    private elementRef: ElementRef,
    private ngZone: NgZone,
    @Inject(DOCUMENT) private readonly dom: Document,
  ) {}

  ngOnInit(): void {
    this.registerCaptchaCallback();
    this.addScript();
  }

  ngOnDestroy(): void {
    this.widgetId = null;
  }

  private registerCaptchaCallback(): void {
    (window as any).recaptchaCallback = () => {
      const config = {
        sitekey: '6LctN_IZAAAAAMQS7oSe7tfmmALujtMCeu7eXvrZ',
        callback: this.onSuccessCallback.bind(this),
        'error-callback': this.onErrorCallback.bind(this),
        'expired-callback': this.onExpiredCallback.bind(this),
      };
      this.widgetId = this.renderCaptcha(config);
    };
  }

  addScript(): void {
    this.dom.getElementById(this.scriptId);

    const script = this.dom.createElement('script');
    script.src = 'https://www.google.com/recaptcha/api.js?onload=recaptchaCallback&render=explicit';
    script.id = this.scriptId;
    script.async = true;
    script.defer = true;
    this.dom.body.appendChild(script);
  }

  private onSuccessCallback(token: string): void {
    this.ngZone.run(() => {
      this.recaptchaSuccess.emit(token);
    });
  }

  private onErrorCallback(): void {
    this.ngZone.run(() => {
      this.recaptchaError.emit();
    });
  }

  private onExpiredCallback(): void {
    this.ngZone.run(() => {
      this.recaptchaExpired.emit();
    });
  }

  private renderCaptcha(config: any): number {
    return (window as any).grecaptcha.render(this.elementRef.nativeElement, config);
  }
}

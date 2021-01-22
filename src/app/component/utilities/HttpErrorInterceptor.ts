import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, Observable, of } from 'rxjs';
import {SpinnerService} from '../../service/spinner.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {


  constructor(private spinnerService: SpinnerService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // console.log(request);
    // console.log(request.url.indexOf('/getDrugs'));
    // if (request.url.indexOf('/getDrugs') > -1) {

    //     const drugs: IDrug[] = [];
    //     for (let i = 0; i < 5; i++) {
    //         const drug: IDrug = {
    //             id: this.generateFakeUid(),
    //             name: 'Drug ' + Math.random().toString(),
    //             strength: '250mg',
    //             refills: 10,
    //         };

    //         drugs.push(drug);
    //     }
    //     return of(new HttpResponse({ status: 200, body: drugs }));
    // }
    this.spinnerService.requestStarted();
    return this.handler(next, request);
  }

  handler(next, request) {
    return next.handle(request)
      .pipe(
        tap(
          (event) => {
            if (event instanceof HttpResponse) {
              this.spinnerService.requestEnded();
            }
          },
          (error: HttpErrorResponse) => {
            this.spinnerService.resetSpinner();
            throw error;
          }
        ),
      );
  }

  generateFakeUid() {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
  }

}

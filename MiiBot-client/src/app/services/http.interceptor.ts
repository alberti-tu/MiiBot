import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from "rxjs";
import { tap, catchError } from "rxjs/operators";
import { AuthenticationService } from './authentication.service';
import { Response } from '../models/responses'; 
import { AdviceService } from './advice.service';

@Injectable()
export class HttpServiceInterceptor implements HttpInterceptor {

  constructor(private adviceService: AdviceService, private authService: AuthenticationService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<Response<any>>> {
    const token = this.authService.getToken();

    if (token !== null) {
      request = request.clone({ setHeaders: { authorization: token } });
    }

    return next.handle(request).pipe(
      tap((response: HttpResponse<Response<any>>) => {
        if (response instanceof HttpResponse) {
          console.log(response.body);
        }
      }),
      catchError((response: HttpResponse<Response<any>>) => {
        if (response instanceof HttpErrorResponse) {
          switch (response.status) {
            case 400:
              console.log('Error');  
              break;
            case 401: 
              this.authService.removeToken();
              this.adviceService.showToast('La sesión ha expirado, por favor, vuelva a iniciar sesión');
              break;
          }
        }
        return of(response);
      })
    );
  }
}

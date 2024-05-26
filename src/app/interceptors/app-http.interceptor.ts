import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {AuthService} from "../services/auth.service";

//hey allow you to modify the request before it is sent to the server
// and the response before it is passed to your application code.
//il ajoute header authorization lorsque l user est connecte
// si user essaye de se connecter , il ne l ajoute pas (la condition)
@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {

  constructor(private authService : AuthService){}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if ((!request.url.includes("/auth/Login"))|| (!request.url.includes("/valider"))  && this.authService.accessToken) {
      let newRequest = request.clone({
        headers: request.headers.set('Authorization', 'Bearer ' + this.authService.accessToken)
      });

      // Handle 401 errors by logging out
      return next.handle(newRequest).pipe(
        catchError(err => {
          if (err.status === 401) {
            this.authService.Logout();
          }
          return throwError(err.message);
        })
      );
    } else {
      return next.handle(request);
    }
  }

}


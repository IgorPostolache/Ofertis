import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, of, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { AuthService } from "src/app/components/auth/service/auth.service";
import {Location} from '@angular/common';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router, private _location: Location){}
  private handleAuthError(err: HttpErrorResponse): Observable<any> {
        if (err.status === 401) {
            this.router.navigateByUrl(`/login`);
            //return of(err.message); WILL IMPLEMENT THIS AT LATER POINT...
        }
        if (err.status === 403) {
            this._location.back();
            return of(err.message);
        }
        return throwError(err);
    }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = this.authService.getJWT();
    if (token != null) {
      request = request.clone({
        setHeaders: {
          'Authorization': token,
          'Content-Type': 'application/json'
        }
      })
    }
    return next.handle(request).pipe(catchError(x=> this.handleAuthError(x)));
  }
}



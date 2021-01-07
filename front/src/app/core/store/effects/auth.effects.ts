import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, Effect, ofType } from "@ngrx/effects";
import { Observable, of } from "rxjs";
import { map, exhaustMap, catchError, tap} from "rxjs/operators";
import { AuthService } from "../../services/auth/auth.service";
import { login, loginFailure, loginSuccess, logout, register, registerFailure, registerSuccess } from "./../actions/auth.actions";

@Injectable()
export class AuthEffects {
  constructor(
    private action$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}

  login$ = createEffect(()=>
    this.action$.pipe(
      ofType(login),
      exhaustMap(payload =>
        this.authService.login(payload).pipe(
          map(res => {
            return loginSuccess(res)
          }),
          catchError(err =>
            of(loginFailure({ errorMessage: err.error.message }))
          )
        )
      )
    )
  );

  @Effect({ dispatch: false })
  loginSucces$: Observable<any> = this.action$.pipe(
    ofType(loginSuccess),
    tap((data) => {
      localStorage.setItem('token', data.tokenType + " " + data.accessToken);
      localStorage.setItem('role', data.role);
      localStorage.setItem('email', data.email);
      this.router.navigateByUrl('/profile');
    })
  );

  @Effect({ dispatch: false })
  loginFailure$: Observable<any> = this.action$.pipe(
    ofType(loginFailure),
    tap(err => console.log(err))
  );

  register$ = createEffect(() =>
    this.action$.pipe(
      ofType(register),
      exhaustMap(payload => {
        return this.authService.register(payload).pipe(
          map((api: any) => {
            return registerSuccess(
              {
                username: api.username,
                email: payload.email,
                role: api.role,
                token: api.tokenType + " " + api.accessToken
              }
            )
          }),
          catchError(err => of(registerFailure({ errorMessage: err.error.message }))
          )
        );
      })
    )
  );

  @Effect({ dispatch: false })
  registerSucces$: Observable<any> = this.action$.pipe(
    ofType(registerSuccess),
    tap((res) => {
      console.log(res);
      localStorage.setItem('token', res.token);
      localStorage.setItem('role', res.role);
      localStorage.setItem('email', res.email);
      this.router.navigateByUrl('/profile');
    })
  );

  @Effect({ dispatch: false })
  registerFailure: Observable<any> = this.action$.pipe(
    ofType(registerFailure),
    tap((err) => {
      console.log(err);
    })
  );

  @Effect({ dispatch: false })
  logout$: Observable<any> = this.action$.pipe(
    ofType(logout),
    tap(()=> {
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      localStorage.removeItem('email');
      this.router.navigateByUrl('/');
    })
  );

}

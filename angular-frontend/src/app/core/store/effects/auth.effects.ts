import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, Effect, ofType } from "@ngrx/effects";
import { Observable, of } from "rxjs";
import { map, exhaustMap, catchError, tap} from "rxjs/operators";
import { AuthService } from "../../services/auth.service";

import { Login, AuthActionTypes, LoginFailure, LoginSuccess, Register, RegisterSuccess, RegisterFailure } from './../actions/auth.actions';

@Injectable()
export class AuthEffects {
  constructor(
    private action$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}

  login$ = createEffect(() =>
    this.action$.pipe(
      ofType(AuthActionTypes.LOGIN),
      exhaustMap((action: Login) =>
        this.authService.login(action.payload).pipe(
          map(api => {
            return new LoginSuccess({ username: api.username, email: action.payload.email, role: api.role, token: api.tokenType + " " + api.accessToken })
          }),
          catchError(error =>
            of(new LoginFailure({errorMessage: error.error.message}))
          )
        )
      )
    )
  );

  @Effect({ dispatch: false })
  loginSucces$: Observable<any> = this.action$.pipe(
    ofType(AuthActionTypes.LOGIN_SUCCESS),
    tap((user) => {
      localStorage.setItem('token', user.payload.token);
      localStorage.setItem('role', user.payload.role);
      this.router.navigateByUrl('/profile');
    })
  );

  @Effect({ dispatch: false })
  loginFailure$: Observable<any> = this.action$.pipe(
    ofType(AuthActionTypes.LOGIN_FAILURE)
  );

  register$ = createEffect(() =>
    this.action$.pipe(
      ofType(AuthActionTypes.REGISTER),
      exhaustMap((action: Register) => {
        return this.authService.register(action.payload).pipe(
          map((api: any) =>
            new RegisterSuccess({ email: action.payload.email, role:action.payload.role, token: api.tokenType + " " + api.accessToken })
          ),
          catchError(error => of(new RegisterFailure({ errorMessage: error }))
          )
        );
      })
    )
  );

  @Effect({ dispatch: false })
  registerSucces$: Observable<any> = this.action$.pipe(
    ofType(AuthActionTypes.REGISTER_SUCCESS),
    tap((user) => {
      localStorage.setItem('token', user.payload.token);
      localStorage.setItem('role', user.payload.role);
      this.router.navigateByUrl('/profile');
    })
  );

  @Effect({ dispatch: false })
  registerFailure$: Observable<any> = this.action$.pipe(
    ofType(AuthActionTypes.REGISTER_FAILURE)
  );

  @Effect({ dispatch: false })
  logout$: Observable<any> = this.action$.pipe(
    ofType(AuthActionTypes.LOGOUT),
    tap(()=> {
      localStorage.removeItem('token');
      this.router.navigateByUrl('/');
    })
  );

}

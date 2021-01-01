import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, Effect, ofType } from "@ngrx/effects";
import { Observable, of } from "rxjs";
import { map, exhaustMap, catchError, tap} from "rxjs/operators";
import { AuthService } from "../../services/auth/auth.service";
import * as authActions from './../actions/auth.actions';

@Injectable()
export class AuthEffects {
  constructor(
    private action$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}

  login$ = createEffect(()=>
    this.action$.pipe(
      ofType(authActions.login),
      exhaustMap(action =>
        this.authService.login(action).pipe(
          map(api => {
            return authActions.loginSuccess(api)
          }),
          catchError(error =>
            of( authActions.loginFailure({errorMessage: error.error.message}))
          )
        )
      )
    )
  );

  @Effect({ dispatch: false })
  loginSucces$: Observable<any> = this.action$.pipe(
    ofType(authActions.loginSuccess),
    tap((data) => {
      localStorage.setItem('token', data.tokenType + " " + data.accessToken);
      localStorage.setItem('role', data.role);
      localStorage.setItem('email', data.email);
      this.router.navigateByUrl('/profile');
    })
  );

  @Effect({ dispatch: false })
  loginFailure$: Observable<any> = this.action$.pipe(
    ofType(authActions.loginFailure),
    tap(err => console.log(err))
  );

  register$ = createEffect(() =>
    this.action$.pipe(
      ofType(authActions.register),
      exhaustMap(action => {
        return this.authService.register(action).pipe(
          map((api: any) => {
            return authActions.registerSuccess({ username: api.username, email: action.email, role: api.role, token: api.tokenType + " " + api.accessToken })
          }),
          catchError(err => of(authActions.registerFailure({ errorMessage: err.error.message }))
          )
        );
      })
    )
  );

  @Effect({ dispatch: false })
  registerSucces$: Observable<any> = this.action$.pipe(
    ofType(authActions.registerSuccess),
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
    ofType(authActions.registerFailure),
    tap((err) => {
      console.log(err);
    })
  );

  @Effect({ dispatch: false })
  logout$: Observable<any> = this.action$.pipe(
    ofType(authActions.logout),
    tap(()=> {
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      localStorage.removeItem('email');
      this.router.navigateByUrl('/');
    })
  );

}

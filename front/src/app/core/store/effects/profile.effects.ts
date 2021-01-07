import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, Effect, ofType } from "@ngrx/effects";
import { Observable, of } from "rxjs";
import { catchError, exhaustMap, map, tap } from "rxjs/operators";
import { AuthService } from "../../services/auth/auth.service";
import { adminProfile, adminProfileFailure, adminProfileSuccess, moderatorProfile, moderatorProfileFailure, moderatorProfileSuccess, redirectProfile, userProfile, userProfileFailure, userProfileSuccess, userVipProfile, userVipProfileFailure, userVipProfileSuccess } from "../actions/profile.actions";

@Injectable()
export class ProfileEffects {
  constructor(
    private action$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}

  profileUser$ = createEffect(() =>
    this.action$.pipe(
      ofType(userProfile),
      exhaustMap(() =>
        this.authService.getUserProfile().pipe(
          map(res => userProfileSuccess({content: res.message})),
          catchError(err => of(userProfileFailure({errorMessage: err.error.message})))
        )
      )
    )
  );

  profileUserVip$ = createEffect(() =>
    this.action$.pipe(
      ofType(userVipProfile),
      exhaustMap(() =>
        this.authService.getUserVipProfile().pipe(
          map(res => userVipProfileSuccess({ content: res.message })),
          catchError(err => of(userVipProfileFailure({ errorMessage: err.error.message })))
        )
      )
    )
  );

  profileUserModerator$ = createEffect(() =>
    this.action$.pipe(
      ofType(moderatorProfile),
      exhaustMap(() =>
        this.authService.getUserModeratorProfile().pipe(
          map(res => moderatorProfileSuccess({content: res.message})),
          catchError(err => of(moderatorProfileFailure({errorMessage: err.error.message})))
        )
      )
    )
  );

  profileUserAdmin$ = createEffect(() =>
    this.action$.pipe(
      ofType(adminProfile),
      exhaustMap(() =>
        this.authService.getUserAdminProfile().pipe(
          map(res => adminProfileSuccess({content: res.message})),
          catchError(err => of(adminProfileFailure({errorMessage: err.error.message})))
        )
      )
    )
  );
  // THIS METHOD NEEDS TO BE CHANGED IF IN FUTURE I WILL WANT A USER WITH VARIOUS ROLES TO ENTER ALL PROFILES
  @Effect({ dispatch: false })
  redirectProfile$: Observable<any> = this.action$.pipe(
    ofType(redirectProfile),
    tap(()=> {
      let user_role = this.authService.getUserRole();

      switch(user_role) {
        case "ROLE_USER":
          this.router.navigate(['/profile/user']);
        break;
      case "ROLE_USER_VIP":
          this.router.navigate(['/profile/user_vip']);
        break;
      case "ROLE_ADMIN":
          this.router.navigate(['profile/user_admin']);
        break;
      case "ROLE_MODERATOR":
          this.router.navigate(['/profile/user_moderator']);
        break;
      default:
          this.router.navigate(['/']);
          null;
        break;
      }
    })
  );
}

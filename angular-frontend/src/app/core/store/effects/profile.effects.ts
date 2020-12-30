import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, Effect, ofType } from "@ngrx/effects";
import { Observable } from "rxjs";
import { exhaustMap, map, tap } from "rxjs/operators";
import { AuthService } from "../../services/auth/auth.service";
import { ProfileActionTypes, UserAdminProfile, UserModeratorProfile, UserProfile, UserVipProfile } from "../actions/profile.actions";

@Injectable()
export class ProfileEffects {
  constructor(
    private action$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}

  profileUser$ = createEffect(() =>
    this.action$.pipe(
      ofType(ProfileActionTypes.USER),
      exhaustMap(action =>
        this.authService.getUserProfile().pipe(
          map(content => {
            return new UserProfile({content})
            }
          )
        )
      )
    )
  );

  profileUserVip$ = createEffect(() =>
    this.action$.pipe(
      ofType(ProfileActionTypes.USER_VIP),
      exhaustMap(action =>
        this.authService.getUserVipProfile().pipe(
          map(content => {
            return new UserVipProfile({content})
            }
          )
        )
      )
    )
  );

  profileUserModerator$ = createEffect(() =>
    this.action$.pipe(
      ofType(ProfileActionTypes.MODERATOR),
      exhaustMap(action =>
        this.authService.getUserModeratorProfile().pipe(
          map(content => {
            return new UserModeratorProfile({content})
            }
          )
        )
      )
    )
  );

  profileUserAdmin$ = createEffect(() =>
    this.action$.pipe(
      ofType(ProfileActionTypes.ADMIN),
      exhaustMap(action =>
        this.authService.getUserAdminProfile().pipe(
          map(content => {
            return new UserAdminProfile({content})
            }
          )
        )
      )
    )
  );
  // THIS METHOD NEEDS TO BE CHANGED IF IN FUTURE I WILL WANT A USER WITH VARIOUS ROLES TO ENTER ALL PROFILES
  @Effect({ dispatch: false })
  redirectProfile$: Observable<any> = this.action$.pipe(
    ofType(ProfileActionTypes.REDIRECT_PROFILE),
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

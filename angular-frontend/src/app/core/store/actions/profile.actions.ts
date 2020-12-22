import { Action } from "@ngrx/store";

export enum ProfileActionTypes {
  ADMIN = '[Profile] Get admin content.',
  GENERAL = '[Profile] Get general content.',
  MODERATOR = '[Profile] Get moderator content.',
  USER = '[Profile] Get user content.',
  USER_VIP = '[Profile] Get user_vip content.',
  REDIRECT_PROFILE = '[Profile] Redirect user to his profile'
}
export class UserProfile implements Action {
  readonly type = ProfileActionTypes.USER;
  constructor(public payload: any){}
}
export class UserVipProfile implements Action {
  readonly type = ProfileActionTypes.USER_VIP;
  constructor(public payload: any){}
}
export class UserAdminProfile implements Action {
  readonly type = ProfileActionTypes.ADMIN;
  constructor(public payload: any){}
}
export class UserModeratorProfile implements Action {
  readonly type = ProfileActionTypes.MODERATOR;
  constructor(public payload: any){}
}

export class RedirectProfile implements Action {
  readonly type = ProfileActionTypes.REDIRECT_PROFILE;
}

export type ProfileType =
  | UserProfile
  | UserVipProfile
  | UserAdminProfile
  | UserModeratorProfile
  | RedirectProfile

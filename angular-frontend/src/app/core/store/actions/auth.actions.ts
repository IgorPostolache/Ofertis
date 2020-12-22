import { Action } from "@ngrx/store";

export enum AuthActionTypes {
  LOGIN = '[Auth] Login',
  LOGIN_SUCCESS = '[Auth] Login Success',
  LOGIN_FAILURE = '[Auth] Login Failure',
  LOGOUT = '[Auth] Logout',
  REGISTER = '[Auth] Register',
  REGISTER_SUCCESS = '[Auth] Register Success',
  REGISTER_FAILURE = '[Auth] Register Failure',
  PROFILE_ALL = '[Auth] Profile All',
}

export class Login implements Action {
  readonly type = AuthActionTypes.LOGIN;
  constructor(public payload: any){}
}

export class LoginSuccess implements Action {
  readonly type = AuthActionTypes.LOGIN_SUCCESS;
  constructor(public payload: any){}
}

export class LoginFailure implements Action {
  readonly type = AuthActionTypes.LOGIN_FAILURE;
  constructor(public payload: any){}
}

export class Logout implements Action {
  readonly type = AuthActionTypes.LOGOUT;
}

export class Register implements Action {
  readonly type = AuthActionTypes.REGISTER;
  constructor(public payload: any){}
}

export class RegisterSuccess implements Action {
  readonly type = AuthActionTypes.REGISTER_SUCCESS;
  constructor(public payload: any){}
}

export class RegisterFailure implements Action {
  readonly type = AuthActionTypes.REGISTER_FAILURE;
  constructor(public payload: any){}
}

export class ProfileAll implements Action {
  readonly type = AuthActionTypes.PROFILE_ALL;
  constructor(public payload: any){}
}

export type AuthType =
  | Login
  | LoginSuccess
  | LoginFailure
  | Logout
  | Register
  | RegisterSuccess
  | RegisterFailure
  | ProfileAll

import { createAction, props } from "@ngrx/store";
import { User } from "src/app/shared/models/user/user";

export const login = createAction(
  '[Auth] Login',
  props<User>()
);
export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<User>()
);
export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ errorMessage: string }>()
);
export const logout = createAction('[Auth] Logout');
export const register = createAction(
  '[Auth] Register',
  props<User>()
);
export const registerSuccess = createAction(
  '[Auth] Register Success',
  props<User>()
);
export const registerFailure = createAction(
  '[Auth] Register Failure',
  props<{ errorMessage: string }>()
);

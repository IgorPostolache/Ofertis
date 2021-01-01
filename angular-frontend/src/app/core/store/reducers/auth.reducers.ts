import { createReducer, on, Action } from "@ngrx/store";
import { User } from "src/app/shared/models/user/user";
import * as authActions from "../actions/auth.actions";

export const authFeatureName = 'auth';

export interface AuthState {
  isAuthenticated: boolean;
  user: User;
  errorMessage: string;
}

export const initialAuthState: AuthState = {
  isAuthenticated: false,
  user: null,
  errorMessage: null
}

const authReducerInternal = createReducer(
  initialAuthState,
  on(authActions.loginSuccess, (state, user) => {
    return {
      ...state,
      user,
      isAuthenticated: true
    }
  }),
  on(authActions.loginFailure, (state, {errorMessage})=> {
    return {
      ...state,
      errorMessage
    }
  }),
  on(authActions.logout, state => { return {...state, user: null, isAuthenticated: false}}),
  on(authActions.registerSuccess, (state, user) => {
    return {
      ...state,
      user,
      isAuthenticated: true
    }
  }),
  on(authActions.registerFailure, (state, {errorMessage}) => { return {...state, errorMessage }})
);

export function authReducer(state: AuthState | undefined, action: Action) {
  return authReducerInternal(state, action);
}

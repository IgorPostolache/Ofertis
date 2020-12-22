import { createFeatureSelector } from '@ngrx/store';
import * as auth from './reducers/auth.reducers';
import * as profile from './reducers/profile.reducers';

export interface AppState {
  authState: auth.State;
}

export const reducers = {
  auth: auth.reducer,
  profile: profile.reducer
}

export const selectAuthState = createFeatureSelector<AppState>('auth');
export const selectProfileState = createFeatureSelector<AppState>('profile');

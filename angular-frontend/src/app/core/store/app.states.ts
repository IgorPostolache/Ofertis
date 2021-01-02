import { createFeatureSelector } from '@ngrx/store';
import * as auth from './reducers/auth.reducers';
import * as job from './reducers/job.reducers';
import * as payment from './reducers/payment.reducers';
import * as profile from './reducers/profile.reducers';


export interface AppState {
  authState: auth.AuthState;
}

export const reducers = {
  auth: auth.authReducer,
  job: job.reducer,
  payment: payment.paymentReducer,
  profile: profile.profileReducer
}

export const selectAuthState = createFeatureSelector<AppState>('auth');
export const selectJobState = createFeatureSelector<AppState>('job');
export const selectPaymentState = createFeatureSelector<AppState>('payment');
export const selectProfileState = createFeatureSelector<AppState>('profile');

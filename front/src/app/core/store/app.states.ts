import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as auth from '../../components/auth/store/reducer/auth.reducers';
import * as job from '../../components/jobs/store/reducer/job.reducers';
import * as payment from '../../components/payment/components/subscription/store/reducer/payment.subscription.reducers';
import * as profile from './reducers/profile.reducers';


export interface AppState {
  authState: auth.AuthState;
}

export const reducers = {
  auth: auth.authReducer,
  job: job.jobReducer,
  payment: payment.paymentReducer,
  profile: profile.profileReducer
}

export const selectAllJobsState = createFeatureSelector<job.JobState>('job');
export const selectAuthState = createFeatureSelector<AppState>('auth');
export const selectJobState = createFeatureSelector<AppState>('job');
export const selectPaymentState = createFeatureSelector<AppState>('payment');
export const selectProfileState = createFeatureSelector<AppState>('profile');

export const selectAllJobs = createSelector(selectAllJobsState, job.selectAllJobs);


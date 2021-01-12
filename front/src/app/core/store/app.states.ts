import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as auth from '../../components/auth/store/reducer/auth.reducers';
import * as job from '../../components/jobs/store/reducer/job.reducers';
import * as sub from '../../components/payment/components/subscription/store/reducer/payment.subscription.reducers';
import * as profile from '../../components/profiles/store/reducer/profile.reducers';


export interface AppState {
  authState: auth.AuthState;
}

export const reducers = {
  auth: auth.authReducer,
  job: job.jobReducer,
  sub: sub.paymentReducer,
  profile: profile.profileReducer
}

export const selectAllJobsState = createFeatureSelector<job.JobState>('job');
export const selectAllSubsState = createFeatureSelector<sub.PaymentState>('sub');
export const selectAuthState = createFeatureSelector<AppState>('auth');
export const selectJobState = createFeatureSelector<AppState>('job');
export const selectPaymentState = createFeatureSelector<AppState>('sub');
export const selectProfileState = createFeatureSelector<AppState>('profile');

export const selectAllJobs = createSelector(selectAllJobsState, job.selectAllJobs);
export const selectAllSubs = createSelector(selectAllSubsState, sub.selectAllSubs);

import { createReducer, on, Action } from "@ngrx/store";
import * as profileActions from "../actions/profile.actions";

export const profileFeatureName = 'profile';

export interface ProfileState {
  content: string;
  errorMessage: string;
}

export const initialProfileState: ProfileState ={
  content: null,
  errorMessage: null
}

const ProfileReducerInternal = createReducer(
  initialProfileState,
  on(profileActions.adminProfileSuccess, (state, {content}) => ({...state, content})),
  on(profileActions.adminProfileFailure, (state, {errorMessage}) => ({...state, errorMessage})),
  on(profileActions.moderatorProfileSuccess, (state, {content}) => ({...state, content})),
  on(profileActions.moderatorProfileFailure, (state, {errorMessage}) => ({...state, errorMessage})),
  on(profileActions.userProfileSuccess, (state, {content}) => ({...state, content})),
  on(profileActions.userProfileFailure, (state, {errorMessage}) => ({...state, errorMessage})),
  on(profileActions.userVipProfileSuccess, (state, {content}) => ({...state, content})),
  on(profileActions.userVipProfileFailure, (state, {errorMessage}) => ({...state, errorMessage})),
  on(profileActions.redirectProfile, state => state)
);

export function profileReducer(state: ProfileState | undefined, action: Action) {
  return ProfileReducerInternal(state, action);
}

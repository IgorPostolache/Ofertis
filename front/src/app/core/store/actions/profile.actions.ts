import { createAction, props } from "@ngrx/store";

export const adminProfile = createAction(
  '[Profile] Get admin content.'
);
export const adminProfileSuccess = createAction(
  '[Profile] Get admin content success.',
  props<{content: string}>()
);
export const adminProfileFailure = createAction(
  '[Profile] Get admin content failure.',
  props<{errorMessage: string}>()
);
export const moderatorProfile = createAction(
  '[Profile] Get moderator content.'
);
export const moderatorProfileSuccess = createAction(
  '[Profile] Get moderator content success.',
  props<{content: string}>()
);
export const moderatorProfileFailure = createAction(
  '[Profile] Get moderator content failure.',
  props<{errorMessage: string}>()
);
export const userProfile = createAction(
  '[Profile] Get user content.'
);
export const userProfileSuccess = createAction(
  '[Profile] Get user content success.',
  props<{content: string}>()
);
export const userProfileFailure = createAction(
  '[Profile] Get user content failure.',
  props<{errorMessage: string}>()
);
export const userVipProfile = createAction(
  '[Profile] Get user vip content.'
);
export const userVipProfileSuccess = createAction(
  '[Profile] Get user vip content success.',
  props<{content: string}>()
);
export const userVipProfileFailure = createAction(
  '[Profile] Get user vip content failure.',
  props<{errorMessage: string}>()
);
export const redirectProfile = createAction('[Profile] Redirect user to his profile');


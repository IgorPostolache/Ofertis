import { createAction, props } from "@ngrx/store";

export const subscribeStripe = createAction(
  '[User_VIP] Subscribe.',
  props<{name: string, email: string, token: string, plan: string}>()
);
export const subscribeStripeSuccess = createAction(
  '[User_VIP] Subscribe Success.',
  props<{customer_id: string, subscription_id: string, subscription_name: string}>()
);
export const subscribeStripeFailure = createAction(
  '[User_VIP] Subscribe Failure.',
  props<{errorMessage: string}>()
);
export const cancelSubStripe = createAction(
  '[User_VIP] Cancel subscribe.'
);
export const getStripeSubs = createAction(
  '[User_VIP] Get subscriptions.',
  props<{customer_id: string}>()
);
export const getStripeSubsSuccess = createAction(
  '[User_VIP] List subscriptions success.',
  props<{subscriptions: {}}>()
);
export const getStripeSubsFailure = createAction(
  '[User_VIP] List subscriptions failure.',
  props<{errorMessage: string}>()
);

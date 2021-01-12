import { Update } from "@ngrx/entity";
import { createAction, props } from "@ngrx/store";
import { PaymentSub } from "../../model/payment.subscription";

export const subscribeStripe = createAction(
  '[User_VIP] Subscribe.',
  props<{name: string, email: string, token: string, plan: string}>()
);
export const subscribeStripeSuccess = createAction(
  '[User_VIP] Subscribe Success.',
  props<{sub: PaymentSub}>()
);
export const subscribeStripeFailure = createAction(
  '[User_VIP] Subscribe Failure.',
  props<{errorMessage: string}>()
);
export const cancelSubStripe = createAction(
  '[User_VIP] Cancel subscribe.',
  props<{id: string}>()
);
export const cancelSubStripeSuccess = createAction(
  '[User_VIP] Cancel subscribe success.',
  props<{update: Update<PaymentSub>}>()
);
export const cancelSubStripeFailure = createAction(
  '[User_VIP] Cancel subscribe failure.',
  props<{errorMessage: string}>()
);
export const getStripeSubs = createAction(
  '[User_VIP] Get subscriptions.'
);
export const getStripeSubsSuccess = createAction(
  '[User_VIP] List subscriptions success.',
  props<{subs: PaymentSub[]}>()
);
export const getStripeSubsFailure = createAction(
  '[User_VIP] List subscriptions failure.',
  props<{errorMessage: string}>()
);

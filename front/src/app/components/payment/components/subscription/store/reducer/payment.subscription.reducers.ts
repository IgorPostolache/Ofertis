import { createReducer, on, Action } from "@ngrx/store";
import * as paymentActions from '../actions/payment.subscription.actions';

export const paymentFeatureName = 'payment';

export interface PaymentState {
  customer_id: string | null;
  subscription_id: string | null;
  subscription_name: string | null;
  subscription_message: string | null;
  subscriptions: object;
}

export const initialPaymentState: PaymentState = {
  customer_id: null,
  subscription_id: null,
  subscription_name: null,
  subscription_message: null,
  subscriptions: {}
}

const paymentInternalreducer = createReducer(
  initialPaymentState,
  on(paymentActions.subscribeStripeSuccess, (state, {customer_id, subscription_id, subscription_name}) => {
    return {
      ...state,
      customer_id,
      subscription_id,
      subscription_name,
      subscription_message: "You have successefully subscribed."
    }
  }),
  on(paymentActions.subscribeStripeFailure, (state, erroMessage) => ({...state, erroMessage})),
  on(paymentActions.cancelSubStripe, state => ({...state, subscription_id: null})),
  on(paymentActions.getStripeSubsSuccess, (state, {subscriptions}) => ({...state, subscriptions})),
  on(paymentActions.getStripeSubsFailure, (state, erroMessage) => ({...state, subscriptions:{}, erroMessage})),
);

export function paymentReducer(state: PaymentState | undefined, action: Action){
  return paymentInternalreducer(state, action);
}

import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { createReducer, on, Action } from "@ngrx/store";
import { PaymentSub } from "../../model/payment.subscription";
import * as paymentActions from '../actions/payment.subscription.actions';


export interface PaymentState extends EntityState<PaymentSub> {}

export const adapter: EntityAdapter<PaymentSub> = createEntityAdapter<PaymentSub>({
  sortComparer: (a: any, b: any) => new Date(b.starts).getTime() - new Date(a.starts).getTime(),
});

export const initialPaymentState = adapter.getInitialState({});

const paymentInternalreducer = createReducer(
  initialPaymentState,
  on(paymentActions.subscribeStripeSuccess, (state, {sub}) => adapter.addOne(sub, {...state, message: "You have successefully subscribed."})),
  on(paymentActions.subscribeStripeFailure, (state, erroMessage) => ({...state, erroMessage})),
  on(paymentActions.cancelSubStripeSuccess, (state, {update}) => adapter.updateOne(update, state)),
  on(paymentActions.cancelSubStripeFailure, (state, erroMessage) => ({...state, erroMessage})),
  on(paymentActions.getStripeSubsSuccess, (state, {subs}) => adapter.setAll(subs, state)),
  on(paymentActions.getStripeSubsFailure, (state, erroMessage) => ({...state, subscriptions:{}, erroMessage})),
);

export function paymentReducer(state: PaymentState | undefined, action: Action){
  return paymentInternalreducer(state, action);
}

const { selectAll } = adapter.getSelectors();

export const selectAllSubs = selectAll;

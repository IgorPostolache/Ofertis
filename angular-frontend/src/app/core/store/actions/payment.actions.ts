import { Action } from "@ngrx/store";

export enum PaymentActionTypes {
  SUBSCRIBE = '[User_VIP] Subscribe.',
  SUBSCRIBE_SUCCESS = '[User_VIP] Subscribe Success.',
  SUBSCRIBE_FAILURE = '[User_VIP] Subscribe Failure.',
  CANCEL_SUBSCRIPTION = '[User_VIP] Cancel Subscription.',
  LIST_SUBSCRIPTIONS = '[User_VIP] List Subscriptions.',
  LIST_SUBSCRIPTIONS_SUCCESS = '[User_VIP] List Subscriptions Success.',
  LIST_SUBSCRIPTIONS_FAILURE = '[User_VIP] List Subscriptions Failure.',
}

export class Subscribe implements Action {
  readonly type = PaymentActionTypes.SUBSCRIBE;
  constructor(public payload: any){}
}

export class SubscribeSuccess implements Action {
  readonly type = PaymentActionTypes.SUBSCRIBE_SUCCESS;
  constructor(public payload: any){}
}

export class SubscribeFailure implements Action {
  readonly type = PaymentActionTypes.SUBSCRIBE_FAILURE;
  constructor(public payload: any){}
}

export class CancelSubscription implements Action {
  readonly type = PaymentActionTypes.CANCEL_SUBSCRIPTION;
  constructor(public payload: any){}
}

export class ListSubscriptions implements Action {
  readonly type = PaymentActionTypes.LIST_SUBSCRIPTIONS;
  constructor(public payload: any){}
}

export class ListSubscriptionsSuccess implements Action {
  readonly type = PaymentActionTypes.LIST_SUBSCRIPTIONS_SUCCESS;
  constructor(public payload: any){}
}

export class ListSubscriptionsFailure implements Action {
  readonly type = PaymentActionTypes.LIST_SUBSCRIPTIONS_FAILURE;
  constructor(public payload: any){}
}

export type PaymentType =
  | Subscribe
  | SubscribeSuccess
  | SubscribeFailure
  | CancelSubscription
  | ListSubscriptions
  | ListSubscriptionsSuccess
  | ListSubscriptionsFailure

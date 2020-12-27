import { PaymentActionTypes, PaymentType } from "../actions/payment.actions";

export interface State {
  customer_id: string | null;
  subscription_id: string | null;
  subscription_name: string | null;
  subscription_message: string | null;
  subscriptions: object;
}

export const initialState: State = {
  customer_id: null,
  subscription_id: null,
  subscription_name: null,
  subscription_message: null,
  subscriptions: {}
}

export function reducer(state = initialState, action: PaymentType): State {
  switch(action.type) {
    case PaymentActionTypes.SUBSCRIBE_SUCCESS:
      return {
        ...state,
        customer_id: action.payload.customer_id,
        subscription_id: action.payload.subscription_id,
        subscription_name: action.payload.subscription_name,
        subscription_message: "You have successefully subscribed."
      }
    case PaymentActionTypes.SUBSCRIBE_FAILURE:
      return {
        ...state,
        subscription_message: action.payload
      }
    case PaymentActionTypes.CANCEL_SUBSCRIPTION:
      return {
        ...state,
        subscription_id: null
      }

    case PaymentActionTypes.LIST_SUBSCRIPTIONS_SUCCESS:
      return {
        ...state,
        subscriptions: action.payload
      }
    case PaymentActionTypes.LIST_SUBSCRIPTIONS_FAILURE:
      return {
        ...state,
        subscriptions: {},
        subscription_message: action.payload
      }
    default:
      return state;
  }
}

import { Injectable } from "@angular/core";
import { Actions, createEffect, Effect, ofType } from "@ngrx/effects";
import { Observable, of } from "rxjs";
import { catchError, exhaustMap, map, tap } from "rxjs/operators";
import { PaymentService } from "../../services/payment/payment.service";
import { ListSubscriptions, ListSubscriptionsFailure, ListSubscriptionsSuccess, PaymentActionTypes, Subscribe, SubscribeFailure, SubscribeSuccess } from "../actions/payment.actions";

@Injectable()
export class PaymentEffects {
  constructor(
    private action$: Actions,
    private paymetSrv: PaymentService
  ) {}

  subscribe$ = createEffect(() =>
    this.action$.pipe(
      ofType(PaymentActionTypes.SUBSCRIBE),
      exhaustMap((action: Subscribe) =>
        this.paymetSrv.createSub(action.payload).pipe(
          map((api: any) => {
            return new SubscribeSuccess(api)
          }),
          catchError(error =>
            of(new SubscribeFailure({error}))
          )
        )
      )
   ));

  @Effect({ dispatch: false })
  subscribeSucces$: Observable<any> = this.action$.pipe(
    ofType(PaymentActionTypes.SUBSCRIBE_SUCCESS)
  );

  @Effect({ dispatch: false })
  subscribeFailure$: Observable<any> = this.action$.pipe(
    ofType(PaymentActionTypes.SUBSCRIBE_FAILURE)
  )

  listSubscription$ = createEffect(() =>
    this.action$.pipe(
      ofType(PaymentActionTypes.LIST_SUBSCRIPTIONS),
      exhaustMap((action: ListSubscriptions) =>
        this.paymetSrv.getSubs(action.payload).pipe(
          map((api: any) => {
            return new ListSubscriptionsSuccess(api)
          }),
          catchError(error =>
            of(new ListSubscriptionsFailure({error}))
          )
        )
      )
   ));

  @Effect({ dispatch: false })
  listSubscriptionsSuccess$: Observable<any> = this.action$.pipe(
    ofType(PaymentActionTypes.LIST_SUBSCRIPTIONS_SUCCESS)
  )

  @Effect({ dispatch: false })
  listSubscriptionsFailure$: Observable<any> = this.action$.pipe(
    ofType(PaymentActionTypes.LIST_SUBSCRIPTIONS_FAILURE)
  )
}

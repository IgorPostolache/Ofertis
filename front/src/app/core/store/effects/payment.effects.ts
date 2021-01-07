import { Injectable } from "@angular/core";
import { Actions, createEffect, Effect, ofType } from "@ngrx/effects";
import { Observable, of } from "rxjs";
import { catchError, exhaustMap, map, tap } from "rxjs/operators";
import { PaymentService } from "../../services/payment/payment.service";
import { getStripeSubs, getStripeSubsFailure, getStripeSubsSuccess, subscribeStripe, subscribeStripeFailure, subscribeStripeSuccess } from "../actions/payment.actions";

@Injectable()
export class PaymentEffects {
  constructor(
    private action$: Actions,
    private paymetSrv: PaymentService
  ) {}

  subscribe$ = createEffect(() =>
    this.action$.pipe(
      ofType(subscribeStripe),
      exhaustMap(payload =>
        this.paymetSrv.createSub(payload).pipe(
          map((res: any) => {
            return subscribeStripeSuccess({
              customer_id: res.customer_id,
              subscription_id: res.subscription_id,
              subscription_name: res.subscription_name
            })
          }),
          catchError(err =>
            of(subscribeStripeFailure({errorMessage: err.error.message}))
          )
        )
      )
   ));

  @Effect({ dispatch: false })
  subscribeSucces$: Observable<any> = this.action$.pipe(
    ofType(subscribeStripeSuccess),
    tap(res => console.log(res))
  );

  @Effect({ dispatch: false })
  subscribeFailure$: Observable<any> = this.action$.pipe(
    ofType(subscribeStripeFailure),
    tap(err => console.log(err))
  )

  getSubscriptions$ = createEffect(() =>
    this.action$.pipe(
      ofType(getStripeSubs),
      exhaustMap(payload =>
        this.paymetSrv.getSubs(payload).pipe(
          map(subscriptions => {
            return getStripeSubsSuccess({subscriptions})
          }),
          catchError(err =>
            of(getStripeSubsFailure({errorMessage: err.error.message}))
          )
        )
      )
   ));

  @Effect({ dispatch: false })
  getSubscriptionsSucces$: Observable<any> = this.action$.pipe(
    ofType(getStripeSubsSuccess),
    tap(res => console.log(res))
  )

  @Effect({ dispatch: false })
  getSubscriptionsFailure$: Observable<any> = this.action$.pipe(
    ofType(getStripeSubsFailure),
    tap(err => console.log(err))
  )
}

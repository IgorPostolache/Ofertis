import { Injectable } from "@angular/core";
import { Actions, createEffect, Effect, ofType } from "@ngrx/effects";
import { Observable, of } from "rxjs";
import { catchError, exhaustMap, map, tap } from "rxjs/operators";
import { PaymentSub } from "../../model/payment.subscription";
import { PaymentSubscriptionService } from "../../service/payment.service";
import { cancelSubStripe, cancelSubStripeFailure, cancelSubStripeSuccess, getStripeSubs, getStripeSubsFailure, getStripeSubsSuccess, subscribeStripe, subscribeStripeFailure, subscribeStripeSuccess } from "../actions/payment.subscription.actions";

@Injectable()
export class PaymentEffects {
  constructor(
    private action$: Actions,
    private paymetSubSrv: PaymentSubscriptionService
  ) {}

  cancelSubscribe$ = createEffect(() =>
    this.action$.pipe(
      ofType(cancelSubStripe),
      exhaustMap(id =>
        this.paymetSubSrv.cancelSub(id).pipe(
          map( (res: any) => {
          return cancelSubStripeSuccess({update: {id: res.id, changes: res}});
          }),
          catchError(err => {
            return of(cancelSubStripeFailure({errorMessage: err.error.message}))
          })
        )
      )
    )
  );
  @Effect({ dispatch: false })
  cancelSubscribeSucces$: Observable<any> = this.action$.pipe(
    ofType(cancelSubStripeSuccess),
    tap(res => console.log(res))
  );
  @Effect({ dispatch: false })
  cancelSubscribeFailure$: Observable<any> = this.action$.pipe(
    ofType(cancelSubStripeFailure),
    tap(err => console.log(err))
  );

  subscribe$ = createEffect(() =>
    this.action$.pipe(
      ofType(subscribeStripe),
      exhaustMap(payload =>
        this.paymetSubSrv.createSub(payload).pipe(
          map((sub: PaymentSub) => {
            return subscribeStripeSuccess({sub: sub})
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
      exhaustMap(() =>
        this.paymetSubSrv.getUserSubs().pipe(
          map((subs: PaymentSub[]) => {
            return getStripeSubsSuccess({subs})
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
    //tap(res => console.log(res))
  )

  @Effect({ dispatch: false })
  getSubscriptionsFailure$: Observable<any> = this.action$.pipe(
    ofType(getStripeSubsFailure),
    tap(err => console.log(err))
  )
}

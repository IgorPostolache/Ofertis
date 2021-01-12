import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { getStripeSubs } from 'src/app/components/payment/components/subscription/store/actions/payment.subscription.actions';
import { AppState, selectPaymentState } from 'src/app/core/store/app.states';
import { PaymentSubscriptionService } from '../service/payment.service';

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.css']
})
export class SubscriptionsComponent implements OnInit, OnDestroy {
  private destroy: Subject<boolean> = new Subject<boolean>();
  errorMessage: string;
  message: string;
  subList: any = [];
  timeLeft: string;

  constructor(private _store: Store<AppState>, private paymentSrv: PaymentSubscriptionService) { }

  ngOnInit(): void {
    this._store.select(selectPaymentState).pipe(takeUntil(this.destroy))
      .subscribe(
        (data: any) => {
          this.subList = data.subscriptions;
          this.message = data.message;
        },
        err => this.errorMessage = err.errorMessage
      );
    this.paymentSrv.getTimeLeft().pipe(takeUntil(this.destroy))
      .subscribe((res: any) => this.timeLeft ? "Your subscription ends in " + res.message + "." : '');
  }
  ngOnDestroy(): void {
    this.destroy.next(true);
    this.destroy.unsubscribe();
  }

  showSubs(): void {
    this._store.dispatch(getStripeSubs());
  }
}

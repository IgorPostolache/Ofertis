import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { getStripeSubs } from 'src/app/components/payment/components/subscription/store/actions/payment.subscription.actions';
import { AppState, selectPaymentState } from 'src/app/core/store/app.states';
import { CustomerSub } from 'src/app/shared/models/customer/customer';

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.css']
})
export class SubscriptionsComponent implements OnInit, OnDestroy {
  customerSub: CustomerSub = new CustomerSub();
  private destroy: Subject<boolean> = new Subject<boolean>();
  errorMessage: string;
  subList: any = [];

  constructor(private _store: Store<AppState>) { }

  ngOnInit(): void {
    this._store.select(selectPaymentState).pipe(takeUntil(this.destroy))
      .subscribe(
        (data: any) => {
          this.customerSub.customer_id = data.customer_id;
          this.customerSub.subscription_id = data.subscription_id;
          this.customerSub.subscription_message = data.subscription_message;
          this.customerSub.subscription_name = data.subscription_name;
          this.subList = data.subscriptions;
        },
        err => this.errorMessage = err.errorMessage
      );

  }
  ngOnDestroy(): void {
    this.destroy.next(true);
    this.destroy.unsubscribe();
  }

  showSubs(): void {
    this._store.dispatch(getStripeSubs({ 'customer_id': this.customerSub.customer_id }));
  }
}

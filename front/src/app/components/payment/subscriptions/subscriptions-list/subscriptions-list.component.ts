import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PaymentService } from 'src/app/core/services/payment/payment.service';
import { cancelSubStripe } from 'src/app/core/store/actions/payment.actions';
import { AppState, selectPaymentState } from 'src/app/core/store/app.states';
import { CustomerSub } from 'src/app/shared/models/customer/customer';

@Component({
  selector: 'app-subscriptions-list',
  templateUrl: './subscriptions-list.component.html',
  styleUrls: ['./subscriptions-list.component.css']
})
export class SubscriptionsListComponent implements OnInit, OnDestroy {
  customerSub: CustomerSub = new CustomerSub();
  private destroy: Subject<boolean> = new Subject<boolean>();
  errorMessage: string;
  subList: any = [];

  constructor(
    private _store: Store<AppState>,
    private paymetSvc: PaymentService
  ) { }

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

  cancelSub(id): void {
    if(confirm("Are you sure that you want to cancel this subscription?")) {
      this.paymetSvc.cancelSub({id: id}).pipe(takeUntil(this.destroy)).subscribe();
      this._store.dispatch(cancelSubStripe());
    }
  }
}

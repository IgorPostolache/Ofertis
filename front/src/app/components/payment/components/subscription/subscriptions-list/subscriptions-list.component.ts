import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { cancelSubStripe } from 'src/app/components/payment/components/subscription/store/actions/payment.subscription.actions';
import { AppState, selectAllSubs } from 'src/app/core/store/app.states';
import { PaymentSub } from '../model/payment.subscription';


@Component({
  selector: 'app-subscriptions-list',
  templateUrl: './subscriptions-list.component.html',
  styleUrls: ['./subscriptions-list.component.css']
})
export class SubscriptionsListComponent implements OnInit, OnDestroy {
  private destroy: Subject<boolean> = new Subject<boolean>();
  errorMessage: string;
  subs: PaymentSub[];

  constructor(private _store: Store<AppState>) {}

  ngOnInit(): void {
    this._store.select(selectAllSubs).pipe(takeUntil(this.destroy))
      .subscribe(subs => this.subs = subs), err => this.errorMessage = err.errorMessage;
  }

  ngOnDestroy(): void {
    this.destroy.next(true);
    this.destroy.unsubscribe();
  }

  cancelSub(id): void {
    if(confirm("Are you sure that you want to cancel this subscription?"))
      this._store.dispatch(cancelSubStripe({id: id}));
  }
}

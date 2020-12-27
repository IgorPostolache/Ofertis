import { Component, OnDestroy, OnInit, ViewChild  } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { UserVipProfile } from 'src/app/core/store/actions/profile.actions';
import { AppState, selectPaymentState, selectProfileState } from 'src/app/core/store/app.states';

import { StripeService, StripeCardComponent } from 'ngx-stripe';
import { StripeCardElementOptions, StripeElementsOptions } from '@stripe/stripe-js';
import { Subscript } from 'src/app/shared/models/subscription/subscription';
import { CancelSubscription, ListSubscriptions, Subscribe, SubscribeFailure } from 'src/app/core/store/actions/payment.actions';
import { PaymentService } from 'src/app/core/services/payment.service';

@Component({
  selector: 'app-user-vip',
  templateUrl: './user-vip.component.html',
  styleUrls: ['./user-vip.component.css']
})
export class UserVipComponent implements OnInit, OnDestroy {
  constructor(
    private _store: Store<AppState>,
    private stripeService: StripeService,
    private paymetSvc: PaymentService
    ) {
      this.getProfile$ = this._store.select(selectProfileState);
      this.getSubscription$ = this._store.select(selectPaymentState);
    }

  user_vip: string | null;
  getProfile$: Observable<any>;
  getSubscription$: Observable<any>;
  getAuth$: Observable<any>;
  errorMessage: string | null;
  subscription: Subscript = new Subscript();
  subscriptions = new Subscription();
  subList: any = [];
  token: string;

  @ViewChild(StripeCardComponent) card: StripeCardComponent;
  cardOptions: StripeCardElementOptions = {
    style: {
      base: {
        iconColor: '#666EE8',
        color: '#31325F',
        fontWeight: '300',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '18px',
        '::placeholder': {
          color: '#CFD7E0'
        }
      }
    }
  };
  elementsOptions: StripeElementsOptions = {
    locale: 'en',
  };
  stripeTest: FormGroup;
  get name() { return this.stripeTest.get('name'); }

  ngOnInit(): void {
    this._store.dispatch(new UserVipProfile(''));

    this.subscriptions.add(this.getProfile$.subscribe(data => this.user_vip = data.content));

    this.subscriptions.add(this.getSubscription$.subscribe(data => {
      this.subscription.customer_id = data.customer_id;
      this.subscription.subscription_id = data.subscription_id;
      this.subscription.subscription_message = data.subscription_message;
      this.subscription.subscription_name = data.subscription_name;
      this.subList = data.subscriptions;
    }));

    this.stripeTest = new FormGroup({
      'plan': new FormControl(null, Validators.required),
      'name': new FormControl(null, [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(40)
      ])
    })
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  onSubmit({ name, plan}): void {
    this.createToken(name, plan);
  }

  createToken(name, plan): void {
    this.subscriptions.add(this.stripeService
      .createToken(this.card.element, { name })
      .subscribe((result) => {
        if (result.token) {
          this._store.dispatch(new Subscribe({
            "name": name,
            "email": localStorage.getItem("email"),
            "token": result.token.id,
            "plan": plan
          }))
        } else if (result.error) {
          this._store.dispatch(new SubscribeFailure(result.error.message));
        }
      }));
  }

  showSubs(): void {
    this._store.dispatch(new ListSubscriptions({ 'customer_id': this.subscription.customer_id }));
  }

  cancelSub(id): void {
    if(confirm("Are you sure that you want to cancel this subscription?")) {
      this.subscriptions.add(this.paymetSvc.cancelSub({id: id}).subscribe());
      this._store.dispatch(new CancelSubscription({}));
    }
  }
}

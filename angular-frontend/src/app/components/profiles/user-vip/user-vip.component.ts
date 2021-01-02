import { Component, OnDestroy, OnInit, ViewChild  } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { userVipProfile } from 'src/app/core/store/actions/profile.actions';
import { AppState, selectPaymentState, selectProfileState } from 'src/app/core/store/app.states';
import { StripeService, StripeCardComponent } from 'ngx-stripe';
import { StripeCardElementOptions, StripeElementsOptions } from '@stripe/stripe-js';
import { Subscript } from 'src/app/shared/models/subscription/subscription';
import { CancelSubscription, ListSubscriptions, Subscribe, SubscribeFailure } from 'src/app/core/store/actions/payment.actions';
import { PaymentService } from 'src/app/core/services/payment/payment.service';
import { takeUntil } from 'rxjs/operators';

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
    ) {}

  private destroy: Subject<boolean> = new Subject<boolean>();
  errorMessage: string;
  stripeTest: FormGroup;
  subList: any = [];
  subscription: Subscript = new Subscript();
  token: string;
  user_vip: string;

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

  get name() { return this.stripeTest.get('name'); }

  ngOnInit(): void {
    this._store.dispatch(userVipProfile());

    this._store.select(selectProfileState).pipe(takeUntil(this.destroy))
      .subscribe(
        (data: any) => this.user_vip = data.content),
        err => this.errorMessage = err.errorMessage;

    this._store.select(selectPaymentState).pipe(takeUntil(this.destroy))
      .subscribe(
        (data: any) => {
          this.subscription.customer_id = data.customer_id;
          this.subscription.subscription_id = data.subscription_id;
          this.subscription.subscription_message = data.subscription_message;
          this.subscription.subscription_name = data.subscription_name;
          this.subList = data.subscriptions;
        },
        err => this.errorMessage = err.errorMessage
      );

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
    this.destroy.next(true);
    this.destroy.unsubscribe();
  }

  onSubmit({ name, plan}): void {
    this.createToken(name, plan);
  }

  createToken(name, plan): void {

    this.stripeService
      .createToken(this.card.element, { name })
      .pipe(takeUntil(this.destroy))
      .subscribe((data) => {
        if (data.token) {
          this._store.dispatch(new Subscribe({
            "name": name,
            "email": localStorage.getItem("email"),
            "token": data.token.id,
            "plan": plan
          }))
        } else if (data.error) {
          this._store.dispatch(new SubscribeFailure(data.error.message));
        }
      },
      err => this.errorMessage = err.errorMessage
      );
  }

  showSubs(): void {
    this._store.dispatch(new ListSubscriptions({ 'customer_id': this.subscription.customer_id }));
  }

  cancelSub(id): void {
    if(confirm("Are you sure that you want to cancel this subscription?")) {
      this.paymetSvc.cancelSub({id: id}).pipe(takeUntil(this.destroy)).subscribe();
      this._store.dispatch(new CancelSubscription({}));
    }
  }
}

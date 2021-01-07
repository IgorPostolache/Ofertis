import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { StripeCardElementOptions, StripeElementsOptions } from '@stripe/stripe-js';
import { StripeCardComponent, StripeService } from 'ngx-stripe';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SpinnerService } from 'src/app/core/services/spinner/spinner.service';
import { subscribeStripe, subscribeStripeFailure } from 'src/app/core/store/actions/payment.actions';
import { AppState, selectProfileState } from 'src/app/core/store/app.states';

@Component({
  selector: 'app-subscription-update',
  templateUrl: './subscription-update.component.html',
  styleUrls: ['./subscription-update.component.css']
})
export class SubscriptionUpdateComponent implements OnInit, OnDestroy {
  private destroy: Subject<boolean> = new Subject<boolean>();
  errorMessage: string;
  stripeTest: FormGroup;

  constructor(
    private _store: Store<AppState>,
    private stripeService: StripeService,
    public spinnerService: SpinnerService) { }

  get name() { return this.stripeTest.get('name'); }

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

  ngOnInit(): void {
    this._store.select(selectProfileState).pipe(takeUntil(this.destroy))
      .subscribe(
        (err:any) => this.errorMessage = err.errorMessage);

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
          this._store.dispatch(subscribeStripe({
            "name": name,
            "email": localStorage.getItem("email"),
            "token": data.token.id,
            "plan": plan
          }))
        } else if (data.error) {
          this._store.dispatch(subscribeStripeFailure({errorMessage: data.error.message}));
        }
      },
      err => this.errorMessage = err.errorMessage
      );
  }
}

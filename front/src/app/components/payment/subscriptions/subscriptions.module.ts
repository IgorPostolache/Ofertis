import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubscriptionsComponent } from './subscriptions.component';
import { SubscriptionsListComponent } from './subscriptions-list/subscriptions-list.component';
import { SubscriptionUpdateComponent } from './subscription-update/subscription-update.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { NgxStripeModule } from 'ngx-stripe';



@NgModule({
  declarations: [
    SubscriptionsComponent,
    SubscriptionsListComponent,
    SubscriptionUpdateComponent,
  ],
  exports: [
    SubscriptionsComponent,
    SubscriptionsListComponent,
    SubscriptionUpdateComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    NgxStripeModule.forRoot('pk_test_51I1XH9KxGSTi9Lm0aA9ik8wjFfKL0oI4xR3iKg0z3BNmf0MGHp1WYnTYS7b0GMYRKFPf28TyFnYc0YtDleDyeDm100nIweVqz0'),
    RouterModule
  ]
})
export class SubscriptionsModule { }

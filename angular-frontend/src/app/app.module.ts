import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { NgxStripeModule } from 'ngx-stripe';
import { reducers } from './core/store/app.states';

import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './core/store/effects/auth.effects';
import { PaymentEffects } from './core/store/effects/payment.effects';
import { ProfileEffects } from './core/store/effects/profile.effects';

import { UserComponent } from './components/profiles/user/user.component';
import { ModeratorComponent } from './components/profiles/moderator/moderator.component';
import { AdminComponent } from './components/profiles/admin/admin.component';
import { UserVipComponent } from './components/profiles/user-vip/user-vip.component';
import { ProfileComponent } from './components/profiles/profile/profile.component';

import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { AuthGuard } from './core/guards/auth.guard';
import { MillisToDatePipe } from './shared/misc/pipes/millis-to-date.pipe';
import { NavBarComponent } from './components/navbar/navbar.component';
import { JobsComponent } from './components/jobs/jobs/jobs.component';
import { JobComponent } from './components/jobs/job/job.component';
import { JobUpdateComponent } from './components/jobs/job-update/job-update.component';
import { JobEffects } from './core/store/effects/job.effects';
import { SubscriptionUpdateComponent } from './components/payment/subscriptions/subscription-update/subscription-update.component';
import { SubscriptionsListComponent } from './components/payment/subscriptions/subscriptions-list/subscriptions-list.component';
import { SubscriptionsComponent } from './components/payment/subscriptions/subscriptions.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    UserComponent,
    ModeratorComponent,
    AdminComponent,
    UserVipComponent,
    ProfileComponent,
    MillisToDatePipe,
    NavBarComponent,
    JobsComponent,
    JobComponent,
    JobUpdateComponent,
    SubscriptionUpdateComponent,
    SubscriptionsListComponent,
    SubscriptionsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forRoot(reducers, {}),
    EffectsModule.forRoot([AuthEffects, JobEffects, PaymentEffects, ProfileEffects]),
    NgxStripeModule.forRoot('pk_test_51I1XH9KxGSTi9Lm0aA9ik8wjFfKL0oI4xR3iKg0z3BNmf0MGHp1WYnTYS7b0GMYRKFPf28TyFnYc0YtDleDyeDm100nIweVqz0')
  ],
  providers: [
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

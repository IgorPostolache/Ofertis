import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';

import { StoreModule } from '@ngrx/store';
import { reducers } from './core/store/app.states';

import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './core/store/effects/auth.effects';
import { PaymentEffects } from './core/store/effects/payment.effects';
import { ProfileEffects } from './core/store/effects/profile.effects';

import { AuthInterceptor } from './components/auth/interceptor/auth.interceptor';
import { AuthGuard } from './components/auth/guard/auth.guard';

import { JobEffects } from './core/store/effects/job.effects';
import { SpinnerInterceptor } from './core/interceptors/spinner.interceptor';

import { AuthModule } from './components/auth/auth.module';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JobsModule } from './components/jobs/jobs.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProfilesModule } from './components/profiles/profiles.module';
import { SubscriptionsModule } from './components/payment/subscriptions/subscriptions.module';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot(reducers, {}),
    EffectsModule.forRoot([AuthEffects, JobEffects, PaymentEffects, ProfileEffects]),
    BrowserAnimationsModule,
    SharedModule,
    AuthModule,
    JobsModule,
    ProfilesModule,
    SubscriptionsModule
  ],
  providers: [
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

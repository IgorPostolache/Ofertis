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
import { reducers } from './core/store/app.states';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './core/store/effects/auth.effects';
import { UserComponent } from './components/profiles/user/user.component';
import { ModeratorComponent } from './components/profiles/moderator/moderator.component';
import { AdminComponent } from './components/profiles/admin/admin.component';
import { UserVipComponent } from './components/profiles/user-vip/user-vip.component';
import { ProfileComponent } from './components/profiles/profile/profile.component';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { AuthGuard } from './core/guards/auth.guard';
import { ProfileEffects } from './core/store/effects/profile.effects';


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
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forRoot(reducers, {}),
    EffectsModule.forRoot([AuthEffects, ProfileEffects])
  ],
  providers: [
    AuthGuard,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

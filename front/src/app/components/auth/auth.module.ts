import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { InputEmailComponent } from './components/reset-password/input-email/input-email.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password/reset-password.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { AuthService } from './service/auth.service';
import { AuthGuard } from './guard/auth.guard';
import { AuthInterceptor } from './interceptor/auth.interceptor';



@NgModule({
  declarations: [
    InputEmailComponent,
    LoginComponent,
    RegisterComponent,
    ResetPasswordComponent,
  ],
  exports: [
    InputEmailComponent,
    LoginComponent,
    RegisterComponent,
    ResetPasswordComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule
  ],
  providers: [
    AuthGuard,
    AuthInterceptor,
    AuthService
  ]

})
export class AuthModule { }

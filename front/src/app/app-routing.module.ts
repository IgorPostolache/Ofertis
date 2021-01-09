import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/auth/components/login/login.component';
import { RegisterComponent } from './components/auth/components/register/register.component';
import { InputEmailComponent } from './components/auth/components/reset-password/input-email/input-email.component';
import { ResetPasswordComponent } from './components/auth/components/reset-password/reset-password/reset-password.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './components/auth/guard/auth.guard';

const routes: Routes = [

  { path: 'jobs', loadChildren: () => import('./components/jobs/jobs.module').then(m => m.JobsModule)},

  { path: 'login', component: LoginComponent },

  { path: 'profile', loadChildren: () => import('./components/profiles/profiles.module').then(m => m.ProfilesModule), canActivate: [AuthGuard]},

  { path: 'register', component: RegisterComponent },

  { path: 'reset', component: InputEmailComponent },
  { path: 'reset_password/:token', component: ResetPasswordComponent },

  { path: '', component: HomeComponent },
  { path: '**', redirectTo: '/'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

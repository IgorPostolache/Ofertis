import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { AdminComponent } from './components/profiles/admin/admin.component';
import { ModeratorComponent } from './components/profiles/moderator/moderator.component';
import { ProfileComponent } from './components/profiles/profile/profile.component';
import { UserVipComponent } from './components/profiles/user-vip/user-vip.component';
import { UserComponent } from './components/profiles/user/user.component';
import { AuthGuard } from './core/guards/auth.guard';



const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard],
    children: [
      { path: 'user', component: UserComponent },
      { path: 'user_vip', component: UserVipComponent },
      { path: 'user_moderator', component: ModeratorComponent },
      { path: 'user_admin', component: AdminComponent },
    ]
  },
  { path: 'register', component: RegisterComponent },
  { path: '', component: HomeComponent },
  { path: '**', redirectTo: '/'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

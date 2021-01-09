import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './components/user/user.component';
import { UserVipComponent } from './components/user-vip/user-vip.component';
import { ModeratorComponent } from './components/moderator/moderator.component';
import { AdminComponent } from './components/admin/admin.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { JobsModule } from '../jobs/jobs.module';
import { SubscriptionsModule } from '../payment/components/subscription/subscriptions.module';

const routes: Routes = [
  { path: 'user', component: UserComponent },
  { path: 'user_admin', component: AdminComponent },
  { path: 'user_moderator', component: ModeratorComponent },
  { path: 'user_vip', component: UserVipComponent },

  { path: '', component: ProfileComponent }

];

@NgModule({
  declarations: [
    AdminComponent,
    ModeratorComponent,
    ProfileComponent,
    UserComponent,
    UserVipComponent,
  ],
  exports: [
    AdminComponent,
    ModeratorComponent,
    ProfileComponent,
    UserComponent,
    UserVipComponent,
    RouterModule
  ],
  imports: [
    CommonModule,
    JobsModule,
    SharedModule,
    SubscriptionsModule,
    RouterModule.forChild(routes)
  ]
})
export class ProfilesModule { }

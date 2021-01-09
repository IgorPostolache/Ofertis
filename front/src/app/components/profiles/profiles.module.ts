import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { UserVipComponent } from './user-vip/user-vip.component';
import { ModeratorComponent } from './moderator/moderator.component';
import { AdminComponent } from './admin/admin.component';
import { ProfileComponent } from './profile/profile.component';
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

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { JobComponent } from './components/job/job.component';
import { JobsComponent } from './components/jobs/jobs.component';
import { JobUpdateComponent } from './components/job-update/job-update.component';
import { RouterModule, Routes } from '@angular/router';
import { JobService } from './service/job.service';

const routes: Routes = [
  { path: 'job/:id', component: JobComponent},
  { path: 'add', component: JobUpdateComponent},
  { path: 'update/:id', component: JobUpdateComponent},
];

@NgModule({
  declarations: [
    JobComponent,
    JobsComponent,
    JobUpdateComponent
  ],
  exports: [
    JobComponent,
    JobsComponent,
    JobUpdateComponent,
    RouterModule
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    JobService
  ]
})
export class JobsModule { }

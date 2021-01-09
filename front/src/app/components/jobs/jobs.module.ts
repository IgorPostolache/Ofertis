import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { JobComponent } from './job/job.component';
import { JobsComponent } from './jobs/jobs.component';
import { JobUpdateComponent } from './job-update/job-update.component';
import { RouterModule, Routes } from '@angular/router';

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
  ]
})
export class JobsModule { }

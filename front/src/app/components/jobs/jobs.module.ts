import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { JobComponent } from './job/job.component';
import { JobsComponent } from './jobs/jobs.component';
import { JobUpdateComponent } from './job-update/job-update.component';



@NgModule({
  declarations: [
    JobComponent,
    JobsComponent,
    JobUpdateComponent
  ],
  exports: [
    JobComponent,
    JobsComponent,
    JobUpdateComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class JobsModule { }

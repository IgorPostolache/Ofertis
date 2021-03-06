import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { deleteJob, getJobs, getUserJobs } from 'src/app/components/jobs/store/actions/job.actions';
import { AppState, selectAllJobs, selectJobState } from 'src/app/core/store/app.states';
import { Job } from 'src/app/shared/models/job/job';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit, OnDestroy {
  private destroy: Subject<boolean> = new Subject<boolean>();
  getJobs: boolean;
  @Input() private getJobsEEC: EventEmitter<boolean>;
  jobs$: Observable<Job[]>
  jobState$: Observable<any>;
  @Input() showMyJobs: boolean;
  showUserJobs: boolean;
  @Input() userEmail: string;

  constructor(private _store: Store<AppState>) {
    this.jobState$ = this._store.select(selectJobState);
    this.jobs$ = this._store.select(selectAllJobs);
  }

  ngOnInit(): void {
    this.jobState$
      .pipe(takeUntil(this.destroy))
      .subscribe((res) => this.showUserJobs = res.showUserJobs);
    if (this.getJobsEEC) {
      this.getJobsEEC.pipe(takeUntil(this.destroy)).subscribe(() => {
        if (this.showMyJobs && this.userEmail) {
          this.jobs$.pipe(takeUntil(this.destroy))
            .subscribe(job => {
              if (job.length == 0 || this.showUserJobs) this._store.dispatch(getUserJobs());})
        }
      })
    } else {
        this.jobs$.pipe(takeUntil(this.destroy))
          .subscribe(job => { if (job.length == 0 || !this.showUserJobs) this._store.dispatch(getJobs());})
        };
  }

  ngOnDestroy(): void {
    this.destroy.next(true);
    this.destroy.unsubscribe();
  }

  onDelete(id: number): void {
    if (confirm("Delete this job?")) this._store.dispatch(deleteJob({id: id}));
  }

}

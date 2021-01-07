import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { deleteJob, getJobs } from 'src/app/core/store/actions/job.actions';
import { AppState, selectAllJobs, selectJobState } from 'src/app/core/store/app.states';
import { Job } from 'src/app/shared/models/job/job';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit, OnDestroy {
  private destroy: Subject<boolean> = new Subject<boolean>();
  jobs$: Observable<Job[]>

  constructor(private _store: Store<AppState>) {}

  ngOnInit(): void {
    this.jobs$ = this._store.select(selectAllJobs);
    this.jobs$.pipe(takeUntil(this.destroy))
      .subscribe(job => {if (job.length == 0) this._store.dispatch(getJobs())})
  }

  ngOnDestroy(): void {
    this.destroy.next(true);
    this.destroy.unsubscribe();
  }

  onDelete(id: number): void {
    if (confirm("Delete this job?")) this._store.dispatch(deleteJob({id: id}));
  }

}

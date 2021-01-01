import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DeleteJob, GetJobs } from 'src/app/core/store/actions/job.actions';
import { AppState, selectJobState } from 'src/app/core/store/app.states';
import { Job } from 'src/app/shared/models/job/job';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit, OnDestroy {
  private destroy: Subject<boolean> = new Subject<boolean>();
  jobs: Job[] = [];

  constructor(private _store: Store<AppState>) {}

  ngOnInit(): void {
    this._store.select(selectJobState).pipe(takeUntil(this.destroy))
      .subscribe((data: any) => this.jobs = data.jobs ? data.jobs : []);
    if (this.jobs.length == 0) this._store.dispatch(new GetJobs());
  }

  ngOnDestroy(): void {
    this.destroy.next(true);
    this.destroy.unsubscribe();
  }

  onDelete(id: string): void {
    if (confirm("Delete this job?")) this._store.dispatch(new DeleteJob(id));
  }

}

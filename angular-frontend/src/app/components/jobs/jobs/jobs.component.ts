import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { JobService } from 'src/app/core/services/job/job.service';
import { DeleteJob, GetJobs } from 'src/app/core/store/actions/job.actions';
import { AppState, selectJobState } from 'src/app/core/store/app.states';
import { Job } from 'src/app/shared/models/job/job';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit, OnDestroy {
  jobs: Job[] = [];
  getJobState$: Observable<any>;
  subscriptions = new Subscription();

  constructor(private _store: Store<AppState>) {
    this.getJobState$ = this._store.select(selectJobState);
  }

  ngOnInit(): void {
    this.subscriptions.add(
      this.getJobState$.subscribe(data => this.jobs = data.jobs ? data.jobs : [])
    );
    if (this.jobs.length == 0) this._store.dispatch(new GetJobs());
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  onDelete(id: string): void {
    if (confirm("Delete this job?")) this._store.dispatch(new DeleteJob(id));
  }

}

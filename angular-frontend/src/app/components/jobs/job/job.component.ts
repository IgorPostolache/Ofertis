import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { GetJob } from 'src/app/core/store/actions/job.actions';
import { AppState, selectJobState } from 'src/app/core/store/app.states';
import { Job } from 'src/app/shared/models/job/job';
import { Location } from '@angular/common';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.css']
})
export class JobComponent implements OnInit, OnDestroy {
  getJobState$: Observable<any>;
  job: Job;
  subscriptions = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private _store: Store<AppState>,
    private location: Location) {
    this.getJobState$ = this._store.select(selectJobState);
   }

  ngOnInit(): void {
    this.subscriptions.add(
      this.getJobState$.subscribe(data => this.job = data.jobs ? data.jobs[0] : null)
    )
    let id = this.route.snapshot.params['id'];
    if (id) this._store.dispatch(new GetJob(id));
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  goBack(): void {
    this.location.back();
  }

}

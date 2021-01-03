import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { getJob } from 'src/app/core/store/actions/job.actions';
import { AppState, selectJobState } from 'src/app/core/store/app.states';
import { Job } from 'src/app/shared/models/job/job';
import { Location } from '@angular/common';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.css']
})
export class JobComponent implements OnInit, OnDestroy {
  private destroy: Subject<boolean> = new Subject<boolean>();
  job: Job;

  constructor(
    private route: ActivatedRoute,
    private _store: Store<AppState>,
    private location: Location) {}

  ngOnInit(): void {
    this._store.select(selectJobState).pipe(takeUntil(this.destroy))
      .subscribe((data: any) => this.job = data.job);

    let id = this.route.snapshot.params['id'];
    if (id) this._store.dispatch(getJob({id: id}));
  }

  ngOnDestroy(): void {
    this.destroy.next(true);
    this.destroy.unsubscribe();
  }

  goBack(): void {
    this.location.back();
  }

}

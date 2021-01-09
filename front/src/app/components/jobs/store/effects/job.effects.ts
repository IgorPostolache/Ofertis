import { Injectable } from "@angular/core";
import { Actions, createEffect, Effect, ofType } from "@ngrx/effects";
import { Observable, of } from "rxjs";
import { catchError, exhaustMap, map, tap } from "rxjs/operators";
import { JobService } from "../../service/job.service";
import { addJob, addJobFailure, addJobSuccess, deleteJob, deleteJobFailure, deleteJobSuccess, getJob, getJobFailure, getJobs, getJobsFailure, getJobsSuccess, getJobSuccess, getUserJobs, getUserJobsFailure, getUserJobsSuccess, updateJob, updateJobFailure, updateJobSuccess } from "../actions/job.actions";
import { Location } from '@angular/common';
import { Job } from "src/app/shared/models/job/job.model";


@Injectable()
export class JobEffects {
  constructor(
    private action$: Actions,
    private jobSrv: JobService,
    private location: Location
  ) {}

  addJob$ = createEffect(() =>
    this.action$.pipe(
      ofType(addJob),
      exhaustMap(action =>
        this.jobSrv.addJob(action.job).pipe(
          map((job: Job) => {
            return addJobSuccess({job: job});
          }),
          catchError(err => {
            console.log(err.error.message);
            return of(addJobFailure({errorMessage: err.error.message}));
          })
        )
      )
    )
  );

  @Effect({ dispatch: false })
  addJobSucces$: Observable<any> = this.action$.pipe(
    ofType(addJobSuccess),
    tap(() => this.location.back())
  );

  deleteJob$ = createEffect(() =>
    this.action$.pipe(
      ofType(deleteJob),
      exhaustMap((data: any) =>
        this.jobSrv.deleteJob(data.id).pipe(
          map(() => {
            return deleteJobSuccess({id: data.id});
          }),
          catchError(err => {
            console.log(err);
            return of(deleteJobFailure({errorMessage: err.error.message}));
          })
        )
      )
    )
  );

  getJob$ = createEffect(() =>
    this.action$.pipe(
      ofType(getJob),
      exhaustMap((data: any) =>
        this.jobSrv.getJob(data.id).pipe(
          map((job: any) => {
            return getJobSuccess({job: job})
          }),
          catchError(err => {
            console.log(err);
            return of(getJobFailure({errorMessage: err.error.message}))
          })
        )
      )
    )
  );

  @Effect({ dispatch: false})
  getJobSucces$: Observable<any> = this.action$.pipe(
    ofType(getJobSuccess),
    tap(job => console.log(job))
  )

  @Effect({ dispatch: false})
  getJobFailure$: Observable<any> = this.action$.pipe(
    ofType(getJobFailure),
    tap(err => console.log(err))
  )

  getJobs$ = createEffect(() =>
    this.action$.pipe(
      ofType(getJobs),
      exhaustMap(() =>
        this.jobSrv.getJobs().pipe(
          map((jobs: Job[]) => {
            return getJobsSuccess({jobs})
          }),
          catchError((err) => {
            console.log(err);
            return of(getJobsFailure({errorMessage: err.error.message}))
          })
        )
      )
    )
  );

  @Effect({ dispatch: false })
  getJobsSucces$: Observable<any> = this.action$.pipe(
    ofType(getJobsSuccess),
    tap(res => console.log(res))
  );

  @Effect({ dispatch: false })
  getJobsFailure$: Observable<any> = this.action$.pipe(
    ofType(getJobsFailure),
    tap(err => console.log(err))
  );

  getUserJobs$ = createEffect(() =>
    this.action$.pipe(
      ofType(getUserJobs),
      exhaustMap(() =>
        this.jobSrv.getUserJobs().pipe(
          map((jobs: Job[]) => {
            return getUserJobsSuccess({jobs})
          }),
          catchError((err) => {
            console.log(err);
            return of(getUserJobsFailure({errorMessage: err.error.message}))
          })
        )
      )
    )
  );

  @Effect({ dispatch: false })
  getUserJobsSucces$: Observable<any> = this.action$.pipe(
    ofType(getUserJobsSuccess),
    tap(res => console.log(res))
  );

  @Effect({ dispatch: false })
  getUserJobsFailure$: Observable<any> = this.action$.pipe(
    ofType(getUserJobsFailure),
    tap(err => console.log(err))
  );

  updateJob$ = createEffect(() =>
    this.action$.pipe(
      ofType(updateJob),
      exhaustMap(job =>
        this.jobSrv.updateJob(job).pipe(
          map( (res: any) => {
          return updateJobSuccess({update: {id: res.id, changes: res}});
          }),
          catchError(err => {
            return of(updateJobFailure({errorMessage: err.error.message}))
          })
        )
      )
    )
  );
  @Effect({ dispatch: false })
  updateJobSucces$: Observable<any> = this.action$.pipe(
    ofType(updateJobSuccess),
    tap(() => this.location.back())
  );
  @Effect({ dispatch: false })
  updateJobFailure$: Observable<any> = this.action$.pipe(
    ofType(updateJobFailure),
    tap(err => console.log(err))
  );

}

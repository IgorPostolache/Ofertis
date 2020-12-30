import { Injectable } from "@angular/core";
import { Actions, createEffect, Effect, ofType } from "@ngrx/effects";
import { Observable, of } from "rxjs";
import { catchError, exhaustMap, map, tap } from "rxjs/operators";
import { JobService } from "../../services/job/job.service";
import { AddJobFailure, AddJobSuccess, DeleteJobFailure, DeleteJobSuccess, GetJobFailure, GetJobsFailure, GetJobsSuccess, GetJobSuccess, JobActionTypes, UpdateJobFailure, UpdateJobSuccess } from "../actions/job.actions";
import { Location } from '@angular/common';

@Injectable()
export class JobEffects {
  constructor(
    private action$: Actions,
    private jobSrv: JobService,
    private location: Location
  ) {}

  addJob$ = createEffect(() =>
    this.action$.pipe(
      ofType(JobActionTypes.ADD_JOB),
      exhaustMap((data: any) =>
        this.jobSrv.addJob(data.payload).pipe(
          map(res => {
            return new AddJobSuccess(res);
          }),
          catchError(error => {
            console.log(error);
            return of(new AddJobFailure(error));
          })
        )
      )
    )
  );

  @Effect({ dispatch: false })
  addJobSucces$: Observable<any> = this.action$.pipe(
    ofType(JobActionTypes.ADD_JOB_SUCCESS),
    tap(res => this.location.back())
  );

  deleteJob$ = createEffect(() =>
    this.action$.pipe(
      ofType(JobActionTypes.DELETE_JOB),
      exhaustMap((data: any) =>
        this.jobSrv.deleteJob(data.payload).pipe(
          map(res => {
            return new DeleteJobSuccess(data.payload);
          }),
          catchError(err => {
            console.log(err);
            return of(new DeleteJobFailure(err));
          })
        )
      )
    )
  );

  getJob$ = createEffect(() =>
    this.action$.pipe(
      ofType(JobActionTypes.GET_JOB),
      exhaustMap((data: any) =>
        this.jobSrv.getJob(data.payload).pipe(
          map(job => {
            return new GetJobSuccess(job)
          }),
          catchError(error => {
            console.log(error);
            return of(new GetJobFailure({message: error.message}))
          })
        )
      )
    )
  );

  @Effect({ dispatch: false})
  getJobSucces$: Observable<any> = this.action$.pipe(
    ofType(JobActionTypes.GET_JOB_SUCCESS),
    tap(job => console.log(job))
  )

  @Effect({ dispatch: false})
  getJobFailure$: Observable<any> = this.action$.pipe(
    ofType(JobActionTypes.GET_JOBS_FAILURE),
    tap(err => console.log(err))
  )

  getJobs$ = createEffect(() =>
    this.action$.pipe(
      ofType(JobActionTypes.GET_JOBS),
      exhaustMap(action =>
        this.jobSrv.getJobs().pipe(
          map(jobs => {
            return new GetJobsSuccess(jobs)
          }),
          catchError((error) => {
            console.log(error);
            return of(new GetJobsFailure({message: error.error.message}))
          })
        )
      )
    )
  );

  @Effect({ dispatch: false })
  getJobsSucces$: Observable<any> = this.action$.pipe(
    ofType(JobActionTypes.GET_JOBS_SUCCESS),
    tap(data => console.log(data))
  );

  @Effect({ dispatch: false })
  getJobsFailure$: Observable<any> = this.action$.pipe(
    ofType(JobActionTypes.GET_JOBS_FAILURE),
    tap(err => console.log(err))
  );

  updateJob$ = createEffect(() =>
    this.action$.pipe(
      ofType(JobActionTypes.UPDATE_JOB),
      exhaustMap((data:any) =>
        this.jobSrv.updateJob(data.payload).pipe(
          map( res => {
          return new UpdateJobSuccess(res);
          }),
          catchError(error => {
            console.log(error);
            return of(new UpdateJobFailure({message: error.message}))
          })
        )
      )
    )
  );
  @Effect({ dispatch: false })
  updateJobSucces$: Observable<any> = this.action$.pipe(
    ofType(JobActionTypes.UPDATE_JOB_SUCCESS),
    tap(res => this.location.back())
  );


}

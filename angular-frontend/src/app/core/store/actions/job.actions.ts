import { Action } from "@ngrx/store";
import { Job } from "src/app/shared/models/job/job";

export enum JobActionTypes {

  ADD_JOB = '[User_VIP] Add Job',
  ADD_JOB_SUCCESS = '[User_VIP] Add Job Success',
  ADD_JOB_FAILURE = '[User_VIP] Add Job Failure',

  DELETE_JOB = '[User_VIP] Delete Job',
  DELETE_JOB_SUCCESS = '[User_VIP] Delete Job Success',
  DELETE_JOB_FAILURE = '[User_VIP] Delete Job Failure',

  GET_JOBS = '[General] List Jobs',
  GET_JOBS_SUCCESS = '[General] Get Jobs Success',
  GET_JOBS_FAILURE = '[General] Get Jobs Failure',

  GET_JOB = '[General] Get Job',
  GET_JOB_SUCCESS = '[General] Get Job Success',
  GET_JOB_FAILURE = '[General] Get Job Failure',

  UPDATE_JOB = '[User_VIP] Update Job',
  UPDATE_JOB_SUCCESS = '[User_VIP] Update Job Success',
  UPDATE_JOB_FAILURE = '[User_VIP] Update Job Failure',

}

export class AddJob implements Action {
  readonly type = JobActionTypes.ADD_JOB;
  constructor(public payload: Job){}
}

export class AddJobSuccess implements Action {
  readonly type = JobActionTypes.ADD_JOB_SUCCESS;
  constructor(public payload: any){}
}

export class AddJobFailure implements Action {
  readonly type = JobActionTypes.ADD_JOB_FAILURE;
  constructor(public payload: any){}
}

export class DeleteJob implements Action {
  readonly type = JobActionTypes.DELETE_JOB;
  constructor(public payload: any){}
}

export class DeleteJobSuccess implements Action {
  readonly type = JobActionTypes.DELETE_JOB_SUCCESS;
  constructor(public payload: any){}
}

export class DeleteJobFailure implements Action {
  readonly type = JobActionTypes.DELETE_JOB_FAILURE;
  constructor(public payload: any){}
}

export class GetJob implements Action {
  readonly type = JobActionTypes.GET_JOB;
  constructor(public payload: any){}
}

export class GetJobSuccess implements Action {
  readonly type = JobActionTypes.GET_JOB_SUCCESS;
  constructor(public payload: Job){}
}

export class GetJobFailure implements Action {
  readonly type = JobActionTypes.GET_JOB_FAILURE;
  constructor(public payload: any){}
}

export class GetJobs implements Action {
  readonly type = JobActionTypes.GET_JOBS;
}

export class GetJobsSuccess implements Action {
  readonly type = JobActionTypes.GET_JOBS_SUCCESS;
  constructor(public payload: Job[]){}
}

export class GetJobsFailure implements Action {
  readonly type = JobActionTypes.GET_JOBS_FAILURE;
  constructor(public payload: any){}
}

export class UpdateJob implements Action {
  readonly type = JobActionTypes.UPDATE_JOB;
  constructor(public payload: Job){}
}

export class UpdateJobSuccess implements Action {
  readonly type = JobActionTypes.UPDATE_JOB_SUCCESS;
  constructor(public payload: any){}
}

export class UpdateJobFailure implements Action {
  readonly type = JobActionTypes.UPDATE_JOB_FAILURE;
  constructor(public payload: any){}
}

export type JobType =

  | AddJob
  | AddJobSuccess
  | AddJobFailure

  | DeleteJob
  | DeleteJobSuccess
  | DeleteJobFailure

  | GetJob
  | GetJobSuccess
  | GetJobFailure

  | GetJobs
  | GetJobsSuccess
  | GetJobsFailure

  | UpdateJob
  | UpdateJobSuccess
  | UpdateJobFailure

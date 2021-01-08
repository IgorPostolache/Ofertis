import { Update } from "@ngrx/entity";
import { createAction, props } from "@ngrx/store";
import { Job } from "src/app/shared/models/job/job.model";

export const addJob = createAction(
  '[User_VIP] Add Job',
  props<{job: Job}>()
);
export const addJobSuccess = createAction(
  '[User_VIP] Add Job Success',
  props<{job: Job}>()
);
export const addJobFailure = createAction(
  '[User_VIP] Add Job Failure',
  props<{errorMessage: string}>()
);
export const deleteJob = createAction(
  '[User_VIP] Delete Job',
  props<{id: number}>()
);
export const deleteJobSuccess = createAction(
  '[User_VIP] Delete Job Success',
  props<{id: number}>()
);
export const deleteJobFailure = createAction(
  '[User_VIP] Delete Job Failure',
  props<{errorMessage: string}>()
);
export const getJob = createAction(
  '[General] Get Job',
  props<{id: number}>()
);
export const getJobSuccess = createAction(
  '[General] Get Job Success',
  props<{job: Job}>()
);
export const getJobFailure = createAction(
  '[General] Get Job Failure',
  props<{errorMessage: string}>()
);
export const getJobs = createAction(
  '[General] Get Jobs'
);
export const getJobsSuccess = createAction(
  '[General] Get Jobs Success',
  props<{jobs: Job[]}>()
);
export const getJobsFailure = createAction(
  '[General] Get Jobs Failure',
  props<{errorMessage: string}>()
);
export const getUserJobs = createAction(
  '[General] Get User Jobs'
);
export const getUserJobsSuccess = createAction(
  '[General] Get User Jobs Success',
  props<{jobs: Job[]}>()
);
export const getUserJobsFailure = createAction(
  '[General] Get User Jobs Failure',
  props<{errorMessage: string}>()
);
export const updateJob = createAction(
  '[General] Update Job',
  props<Job>()
);
export const updateJobSuccess = createAction(
  '[General] Update Job Success',
  props<{update: Update<Job>}>()
);
export const updateJobFailure = createAction(
  '[General] Update Job Failure',
  props<{ errorMessage: string }>()
);

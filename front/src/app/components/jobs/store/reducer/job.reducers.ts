import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { createReducer, on, Action } from "@ngrx/store";
import { Job } from "src/app/shared/models/job/job.model";
import * as jobActions from "../actions/job.actions";

export const jobFeatureName = 'job';

export interface JobState extends EntityState<Job> {
  showUserJobs: boolean;
}

export const adapter: EntityAdapter<Job> = createEntityAdapter<Job>();

export const initialJobState = adapter.getInitialState({
  showUserJobs: false
});

const jobReducerInternal = createReducer(
  initialJobState,
  on(jobActions.addJobSuccess, (state, {job}) => adapter.addOne(job, state)),
  on(jobActions.addJobFailure, (state, {errorMessage}) => ({...state, errorMessage})),
  on(jobActions.deleteJobSuccess, (state, {id}) => adapter.removeOne(id, state)),
  on(jobActions.deleteJobFailure, (state, {errorMessage}) => ({...state, errorMessage})),
  on(jobActions.getJobSuccess, (state, {job}) => ({...state, job})),
  on(jobActions.getJobFailure, (state, {errorMessage}) => ({...state, errorMessage})),
  on(jobActions.getJobsSuccess, (state, {jobs}) => adapter.setAll(jobs, {...state, showUserJobs: true})),
  on(jobActions.getJobsFailure, (state, {errorMessage}) => ({...state, errorMessage})),
  on(jobActions.getUserJobsSuccess, (state, {jobs}) => adapter.setAll(jobs, {...state, showUserJobs: false})),
  on(jobActions.getUserJobsFailure, (state, {errorMessage}) => ({...state, errorMessage})),
  on(jobActions.updateJobSuccess, (state, {update}) => adapter.updateOne(update, state)),
  on(jobActions.updateJobFailure, (state, {errorMessage}) => ({...state, errorMessage})),
);

export function jobReducer(state: JobState | undefined, action: Action) {
  return jobReducerInternal(state, action);
}

const { selectAll } = adapter.getSelectors();

export const selectAllJobs = selectAll;

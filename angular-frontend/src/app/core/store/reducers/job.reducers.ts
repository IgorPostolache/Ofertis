import { Job } from "src/app/shared/models/job/job";
import { JobActionTypes, JobType } from "../actions/job.actions";

export interface State {
  message: string | null;
  jobs: Job[];
}

export const initialState: State = {
  message: null,
  jobs: []
}

export function reducer(state = initialState, action: JobType): State {
  switch(action.type){
    case JobActionTypes.ADD_JOB_SUCCESS:
      return {
        ...state,
        jobs: [...state.jobs, action.payload]
      }
    case JobActionTypes.ADD_JOB_FAILURE:
      return {
        ...state,
        message: action.payload
      }
    case JobActionTypes.DELETE_JOB_SUCCESS:
    return {
        ...state,
        jobs: state.jobs.filter(job => job.id != action.payload)
      }
    case JobActionTypes.DELETE_JOB_FAILURE:
    return {
        ...state,
        message: action.payload
      }
    case JobActionTypes.GET_JOB_SUCCESS:
      return {
        ...state,
        jobs: [action.payload]
      }
    case JobActionTypes.GET_JOB_FAILURE:
      return {
        ...state,
        message: action.payload
      }
    case JobActionTypes.GET_JOBS_SUCCESS:
      return {
        ...state,
        jobs: action.payload
      }
    case JobActionTypes.GET_JOBS_FAILURE:
      return {
        ...state,
        message: action.payload
      }
    case JobActionTypes.UPDATE_JOB_SUCCESS:
      let updated_job_array = state.jobs.filter(job => job.id != action.payload.id);
      updated_job_array.push(action.payload);
      return {
        ...state,
        jobs: updated_job_array
      }
    case JobActionTypes.UPDATE_JOB_FAILURE:
      return {
        ...state,
        message: action.payload
      }
    default: {
      return state;
    }
  }
}

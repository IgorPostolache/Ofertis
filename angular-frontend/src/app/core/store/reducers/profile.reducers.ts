import { ProfileActionTypes, ProfileType } from "../actions/profile.actions";

export interface State {
  content: string | null;
}

export const initialState: State ={
  content: null
}

export function reducer(state = initialState, action: ProfileType): State {
  switch(action.type) {
    case ProfileActionTypes.ADMIN:
    case ProfileActionTypes.MODERATOR:
    case ProfileActionTypes.USER:
    case ProfileActionTypes.USER_VIP:
      return {
        ...state,
        content: action.payload.content
      }
    case ProfileActionTypes.REDIRECT_PROFILE:
    default:
      return state;
  }
}

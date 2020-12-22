import { User } from "src/app/shared/models/user/user";
import { AuthType, AuthActionTypes } from "../actions/auth.actions";

export interface State {
  isAuthenticated: boolean;
  user: User | null;
  errorMessage: string | null;
}

export const initialState: State = {
  isAuthenticated: false,
  user: null,
  errorMessage: null
}

export function reducer(state = initialState, action: AuthType): State {
  switch(action.type) {
    case AuthActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: {
          username: action.payload.username,
          email: action.payload.email,
          role: action.payload.role,
          token: action.payload.token
        },
        errorMessage: null
      }
    case AuthActionTypes.LOGIN_FAILURE:
      return {
        ...state,
        errorMessage: action.payload.errorMessage
      }
    case AuthActionTypes.LOGOUT:
      return initialState;
    case AuthActionTypes.REGISTER_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: {
          username: action.payload.username,
          email: action.payload.email,
          role: action.payload.role,
          token: action.payload.token
        },
        errorMessage: null
      }
    case AuthActionTypes.REGISTER_FAILURE:
      return {
        ...state,
        errorMessage: action.payload.errorMessage.error.message
      }
    case AuthActionTypes.PROFILE_ALL:
      return {
        ...state,
        errorMessage: action.payload
      }
    default: {
      return state;
    }
  }
}

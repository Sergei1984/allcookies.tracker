import { ActionType } from '../../core/types';
import { userState } from './store';
import {
  GET_ALL_USER_TYPE,
  GET_USER_TYPE,
  UserState,
  UserType,
  USER_ERROR,
} from './types';

export const userReducer = (
  state: UserState = userState,
  action: ActionType
): UserState => {
  switch (action.type) {
    case GET_ALL_USER_TYPE: {
      return {
        ...state,
        data: action.payload.data,
        total: action.payload.total,
      };
    }
    case USER_ERROR: {
      return {
        ...state,
      };
    }
    case GET_USER_TYPE: {
      return { ...state, user: action.payload.user };
    }
    default:
      return state;
  }
};

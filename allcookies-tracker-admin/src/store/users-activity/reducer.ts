import {usersActivityState} from "./store";
import {
  GET_USERS_ACTIVITY_TYPE,
  IUsersActivityState,
  USERS_ACTIVITY_ERROR,
  UsersActivityType,
} from "./types";

export const usersActivityReducer = (
  state: IUsersActivityState = usersActivityState,
  action: UsersActivityType
): IUsersActivityState => {
  switch (action.type) {
    case GET_USERS_ACTIVITY_TYPE: {
      return {
        ...state,
        data: action.payload.data,
        total: action.payload.total,
      };
    }
    case USERS_ACTIVITY_ERROR: {
      return {
        ...state,
      };
    }
    default:
      return state;
  }
};

import {
  AppState,
  SET_APP_STATUS,
  SET_APP_ERROR,
  SHOW_NOTIFICATION,
  CLOSE_NOTIFICATION,
  REMOVE_NOTIFICATION,
} from "./types";
import { ActionType } from "../../core/types";
import { initialState } from "./store";

const appReducer = (state: AppState = initialState, action: ActionType) => {
  switch (action.type) {
    case SET_APP_STATUS:
      return { ...state, ...action.payload };
    case SET_APP_ERROR:
      return { ...state, ...action.payload };
    case SHOW_NOTIFICATION:
      return {
        ...state,
        notifications: [
          ...state.notifications,
          {
            key: action.payload.key,
            ...action.payload.notification,
          },
        ],
      };

    case CLOSE_NOTIFICATION:
      return {
        ...state,
        notifications: state.notifications.map((notification) =>
          action.payload.dismissAll || notification.key === action.payload.key
            ? { ...notification, dismissed: true }
            : { ...notification }
        ),
      };

    case REMOVE_NOTIFICATION:
      return {
        ...state,
        notifications: state.notifications.filter(
          (notification) => notification.key !== action.payload
        ),
      };
    default:
      return state;
  }
};

export default appReducer;

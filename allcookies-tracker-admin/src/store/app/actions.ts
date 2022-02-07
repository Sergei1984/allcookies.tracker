import { StatusEnum } from "../../core/enums";
import {
  SET_APP_STATUS,
  SET_APP_ERROR,
  SetAppStatusAction,
  SetAppErrorAction,
  SHOW_NOTIFICATION,
  CLOSE_NOTIFICATION,
  REMOVE_NOTIFICATION,
} from "./types";

interface SetAppStatusActionPayload {
  status: StatusEnum;
}

interface SetAppErrorActionPayload {
  error: any;
}

export const setAppStatusAction = (
  payload: SetAppStatusActionPayload
): SetAppStatusAction => ({
  type: SET_APP_STATUS,
  payload: payload,
});

export const setAppErrorAction = (
  payload: SetAppErrorActionPayload
): SetAppErrorAction => ({
  type: SET_APP_ERROR,
  payload: payload,
});

export const showNotificationAction = (payload: any) => {
  const key = payload.options && payload.options.key;

  return {
    type: SHOW_NOTIFICATION,
    payload: {
      notification: {
        ...payload,
      },
      key: key || new Date().getTime() + Math.random(),
    },
  };
};

export const closeNotificationAction = (key: any) => ({
  type: CLOSE_NOTIFICATION,
  payload: {
    dismissAll: !key, // dismiss all if no key has been defined
    key,
  },
});

export const removeNotificationAction = (key: any) => ({
  type: REMOVE_NOTIFICATION,
  payload: key,
});

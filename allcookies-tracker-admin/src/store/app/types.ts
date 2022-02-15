import { StatusEnum } from "../../core/enums";
import { NotificationModel } from "../../models/notification.model";

export const SET_APP_STATUS: string = "SET_APP_STATUS";
export const SET_APP_ERROR: string = "SET_APP_ERROR";
export const SHOW_NOTIFICATION: string = "SHOW_NOTIFICATION";
export const CLOSE_NOTIFICATION: string = "CLOSE_NOTIFICATION";
export const REMOVE_NOTIFICATION: string = "REMOVE_NOTIFICATION";

export interface AppState {
  status: StatusEnum;
  error?: any;
  notifications: NotificationModel[] | [];
}

export interface SetAppStatusAction {
  type: typeof SET_APP_STATUS;
  payload: any;
}

export interface SetAppErrorAction {
  type: typeof SET_APP_ERROR;
  payload: any;
}

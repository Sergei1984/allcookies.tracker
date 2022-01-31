import { StatusEnum } from "../../core/enums";
import { SellingPointModel } from "../../models/selling-point.model";

export const SET_APP_STATUS: string = "SET_APP_STATUS";
export const SET_APP_ERROR: string = "SET_APP_ERROR";

export interface AppState {
  status: StatusEnum;
  error?: any;
}

export interface SetAppStatusAction {
  type: typeof SET_APP_STATUS;
  payload: any;
}

export interface SetAppErrorAction {
  type: typeof SET_APP_ERROR;
  payload: any;
}

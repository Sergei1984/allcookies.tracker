import { StatusEnum } from "../../core/enums";
import {
  SET_APP_STATUS,
  SET_APP_ERROR,
  SetAppStatusAction,
  SetAppErrorAction,
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

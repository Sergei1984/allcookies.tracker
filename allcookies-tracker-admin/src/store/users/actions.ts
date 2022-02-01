import {
  ErrorData,
  GET_ALL_USER_TYPE,
  INewUser,
  UserType,
  USER_ERROR,
  GetAllUserActionPayload,
  UserError,
} from "./types";

export const getAllUserAction = (
  payload: GetAllUserActionPayload
): UserType => {
  return {
    type: GET_ALL_USER_TYPE,
    payload,
  };
};

export const errorUserAction = (payload: ErrorData): UserError => {
  return {
    type: USER_ERROR,
    payload,
  };
};

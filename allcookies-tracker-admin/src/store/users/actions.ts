import { GET_ALL_USER_TYPE, UserType, GetAllUserActionPayload } from "./types";

export const getAllUserAction = (
  payload: GetAllUserActionPayload
): UserType => {
  return {
    type: GET_ALL_USER_TYPE,
    payload,
  };
};

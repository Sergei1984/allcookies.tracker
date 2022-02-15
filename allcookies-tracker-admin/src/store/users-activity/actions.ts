import {
  GET_USERS_ACTIVITY_TYPE,
  GetUsersActivityActionPayload,
  UsersActivityType
} from "./types";

export const getUsersActivityAction = (
    payload: GetUsersActivityActionPayload
): UsersActivityType => {
  return {
    type: GET_USERS_ACTIVITY_TYPE,
    payload
  }
}

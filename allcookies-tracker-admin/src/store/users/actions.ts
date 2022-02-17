import { GET_ALL_USER_TYPE, REMOVE_USER_ACTION, UserType, GetAllUserActionPayload, RemoveUserAction } from "./types";

export const getAllUserAction = (
  payload: GetAllUserActionPayload
): UserType => {
  return {
    type: GET_ALL_USER_TYPE,
    payload,
  };
};

export const removeUserAction = (payload: number):RemoveUserAction => {
	return {
		type: REMOVE_USER_ACTION,
		payload
	}
}


import {
    GET_ALL_USER_TYPE,
    GET_USER_TYPE,
    UserType,
    GetUserActionPayload,
    GetAllUserActionPayload,
    GetUserAction,
    REMOVE_USER_ACTION,
    RemoveUserAction
} from "./types";

export const getAllUserAction = (payload: GetAllUserActionPayload): UserType => {
    return {
        type: GET_ALL_USER_TYPE,
        payload
    };
};

export const getUserAction = (payload: GetUserActionPayload): GetUserAction => ({
    type: GET_USER_TYPE,
    payload: payload
});
export const removeUserAction = (payload: number): RemoveUserAction => {
    return {
        type: REMOVE_USER_ACTION,
        payload
    };
};

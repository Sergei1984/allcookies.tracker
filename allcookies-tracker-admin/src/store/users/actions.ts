import {GET_ALL_USER_TYPE, INewUser, UserAction} from "./types";


export const getAllUserAction = (payload: INewUser[]): UserAction => {
	return {
		type: GET_ALL_USER_TYPE,
		payload
	}
}
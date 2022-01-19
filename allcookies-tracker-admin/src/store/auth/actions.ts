import {LoginAction, LOGIN_TYPE} from "./types";

export const setUserAction = (payload: boolean): LoginAction => {
	return {
		type: LOGIN_TYPE,
		payload
	}
}
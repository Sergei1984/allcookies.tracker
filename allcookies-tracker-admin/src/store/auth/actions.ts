import {LOGIN_TYPE, LoginAction} from "./types";

export const setUserAction = (payload: boolean): LoginAction => {
	return {
		type: LOGIN_TYPE,
		payload
	}
}
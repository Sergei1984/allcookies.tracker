import {AuthType, loginType} from "./types";

export const setUserAction = (payload: boolean): AuthType => {
	return {
		type: loginType,
		payload
	}
}
import {authState} from "./store";
import {AuthType, AuthState, LOGIN_TYPE} from "./types";

export const authReducer = (state: AuthState = authState, action: AuthType): AuthState => {
	switch (action.type) {
		case LOGIN_TYPE: {
			return {
				...state,
				isLogin: action.payload
			}
		}
		default:
			return state
	}
}
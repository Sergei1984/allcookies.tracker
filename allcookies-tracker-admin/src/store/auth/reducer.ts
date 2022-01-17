import {authState} from "./store";
import {AuthType, AuthState, loginType} from "./types";

export const countReducer = (state: AuthState = authState, action: AuthType): AuthState => {
	switch(action.type) {
		case loginType: {
			return {
				...state,
				isLogin: action.payload
			}
		}
		default: return state
	}
}
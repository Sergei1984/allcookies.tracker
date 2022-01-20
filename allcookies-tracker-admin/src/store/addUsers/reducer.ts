import {GET_ALL_USER_TYPE, UserType} from "./types";

export const userReducer = (state: any, action: UserType) => {
	switch (action.type) {
		case GET_ALL_USER_TYPE: {
			return {
				...state,
				isLogin: action.payload
			}
		}
		default:
			return state
	}
}
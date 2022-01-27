import {userState} from "./store";
import {GET_ALL_USER_TYPE, UserError, UserState, UserType, USER_ERROR} from "./types";

export const userReducer = (state:UserState = userState, action: UserType): UserState => {
	switch (action.type) {
		case GET_ALL_USER_TYPE: {
			return {
				...state,
				users: action.payload,
			}
		}
		case USER_ERROR: {
			return {
				...state,
				errorData: action.payload
			}
		}
		default:
			return state
	}
}

import {userState} from "./store";
import {GET_ALL_USER_TYPE, UserState, UserType} from "./types";

export const userReducer = (state:UserState = userState, action: UserType): UserState => {
	switch (action.type) {
		case GET_ALL_USER_TYPE: {
			return {
				...state,
				users: action.payload,
			}
		}
		default:
			return state
	}
}
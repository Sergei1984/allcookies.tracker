import {alertState} from "./store";
import {AlertError, ALERT_TYPE} from "./types";

export const alertReducer = (state = alertState, action: AlertError) => {
	switch (action.type) {
		case ALERT_TYPE: {
			return {
				...state,
				errorData: action.payload
			}
		}
		default:
			return state
	}
}
import {ALERT_TYPE, ErrorData} from "./types";

export const setAlertAction = (payload: ErrorData) => {
	return {
		type: ALERT_TYPE,
		payload
	}
}
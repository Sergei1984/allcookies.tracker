export const ALERT_TYPE = 'ALERT_TYPE'

export interface AlertAction {
	type: typeof ALERT_TYPE;
	payload: string;
}


export interface ErrorData {
	success: boolean;
	error: boolean;
	message: string;
}

export interface AlertError {
	type: typeof ALERT_TYPE;
	payload: ErrorData;
}
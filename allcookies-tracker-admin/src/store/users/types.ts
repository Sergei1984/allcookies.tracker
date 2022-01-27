export const GET_ALL_USER_TYPE = 'GET_ALL_USER_TYPE'
export const USER_ERROR = 'USER_ERROR'

export interface IUser {
	firstName: string;
	lastName: string;
	email:string;
	password:string;
}

export interface ErrorData {
	error: boolean;
	message: string;
}

export interface UserError {
	type: typeof USER_ERROR;
	payload: ErrorData;
}

export interface INewUser {
	login: string;
	password: string;
	name: string;
	is_blocked: boolean;
}

export interface UsersResponse {
		data: INewUser[];
		total: number;
}

export interface UserAction {
	type: typeof GET_ALL_USER_TYPE;
	payload: INewUser[];
}


export interface UserState {
	users: INewUser[];
	errorData: ErrorData;
}

export type UserType = UserAction | UserError
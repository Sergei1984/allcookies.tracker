export const LOGIN_TYPE = 'LOGIN_TYPE';

export interface ILogin {
	login: string;
	password: string;
}

export interface AuthState {
	isLogin: boolean;
}

export interface IData {
	jwt: string;
	ok: boolean
}

export interface IError {
	data: string
}

export interface IResponse {
	data: IData
	status: number;
}

export interface LoginAction {
	type: typeof LOGIN_TYPE;
	payload: boolean;
}

export type AuthType = LoginAction
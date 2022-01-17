
export interface ILogin {
	login:string;
	password:string;
}

export interface AuthState {
	isLogin: boolean;
}

export interface IData {
	jwt:string;
	ok: boolean
}

export interface IError {
data: string
}

export interface IResponse {
	data: IData
	status: number;
}

export const loginType = 'LOGIN_TYPE';

export interface LoginAction {
	type: typeof loginType;
	payload: boolean;
}

export type AuthType = LoginAction
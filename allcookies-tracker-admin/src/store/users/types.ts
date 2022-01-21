export const GET_ALL_USER_TYPE = ['GET_ALL_USER_TYPE']

export interface IUser {
	firstName: string;
	lastName: string;
	email:string;
	password:string;
}

export interface INewUser {
	login: string,
	password: string,
	name: string
	is_blocked: boolean
}

export interface UsersResponse {
		data: INewUser[],
		total: number
}

export interface UserAction {
	type: typeof GET_ALL_USER_TYPE;
	payload: INewUser[]
}

export interface UserState {
	users: INewUser[]
}

export type UserType = UserAction
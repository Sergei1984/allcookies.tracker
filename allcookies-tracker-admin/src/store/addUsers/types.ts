export const GET_ALL_USER_TYPE = 'USER'

export interface IUser {
	firstName: string;
	lastName: string;
	email:string;
	password:string;
}

export interface UserAction {
	type: typeof GET_ALL_USER_TYPE;
	payload:[] ;
}

export type UserType = UserAction
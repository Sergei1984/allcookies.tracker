export const USER = 'USER'

export interface IUser {
	firstName: string;
	lastName: string;
	email:string;
	password:string;
}

export interface UserAction {
	type: typeof USER;
	payload: boolean;
}
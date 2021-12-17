export interface SignInData {
    login: string;
    password: string;
}

export interface IUser {
    id: string;
    name: string;
    login: string;
}

export interface UserState {
    user: IUser | null;
    isLoading: boolean;
    error: string;
    isAuthorized: boolean;
}
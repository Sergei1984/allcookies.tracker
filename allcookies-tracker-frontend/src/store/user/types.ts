export interface SignInData {
    login: string;
    password: string;
}

export interface IUser {
    id: string;
    name: string;
    email: string;
    account_role: string;
    iss: string;
    sub: string;
    exp: number;
}

export interface UserState {
    user: IUser | null;
    isLoading: boolean;
    error: string;
    isAuthorized: boolean;
}
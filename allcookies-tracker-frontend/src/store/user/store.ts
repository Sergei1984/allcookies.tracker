import { UserState } from "./types";

export const initialState: UserState = {
    user: null,
    isLoading: false,
    isAuthorized: false,
    error: ''
}
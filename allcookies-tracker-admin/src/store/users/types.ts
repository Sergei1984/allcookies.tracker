export const GET_ALL_USER_TYPE = 'GET_ALL_USER_TYPE';
export const GET_USER_TYPE = 'GET_USER_TYPE';
export const USER_ERROR = 'USER_ERROR';

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface ErrorData {
  error: boolean;
  message: string;
}

export interface UserError {
  type: typeof USER_ERROR;
  payload: ErrorData;
}

export interface GetAllUserActionPayload {
  data: INewUser[];
  total: number;
}

export interface GetUserAction {
  type: typeof GET_USER_TYPE;
  payload: any;
}
export interface GetUserActionPayload {
  user: any;
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
  payload: GetAllUserActionPayload;
}

export interface UserState {
  data: INewUser[];
  total: number;
  user: any | null;
}

export const REMOVE_USER_ACTION = 'REMOVE_USER_ACTION';
export interface RemoveUserAction {
  type: typeof REMOVE_USER_ACTION,
  payload: number
}


export type UserType = UserAction | UserError | RemoveUserAction;

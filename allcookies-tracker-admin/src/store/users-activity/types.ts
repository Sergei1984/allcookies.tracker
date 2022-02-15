import { SellingPointLocation } from '../../models/selling-point.model';

export const GET_USERS_ACTIVITY_TYPE = 'GET_USERS_ACTIVITY_TYPE';
export const USERS_ACTIVITY_ERROR = 'USERS_ACTIVITY_ERROR';

export interface ErrorData {
  error: boolean;
  message: string;
}

export interface UserError {
  type: typeof USERS_ACTIVITY_ERROR;
  payload: ErrorData;
}

export type activityType = 'close_day' | 'point_check' | 'open_day';

export interface IUsersActivityDataCreated {
  at: string;
  id: number;
  login: string;
  name: string;
}
export interface IUsersActivityDataSellingPoints {
  title: string;
  address: string;
  id: number;
  location: SellingPointLocation;
}

export interface IUsersActivityDataProducts {
  product: IUsersActivityDataProduct;
  quantity: number;
  order_quantity: number;
  remaining_quantity: number;
}

export interface IUsersActivityDataProduct {
  id: number;
  image_url: string;
  title: string;
}

export interface GetUsersActivityActionPayload {
  data: IUsersActivityData[];
  total: number;
}

export interface IUsersActivityAction {
  type: typeof GET_USERS_ACTIVITY_TYPE;
  payload: GetUsersActivityActionPayload;
}

export interface IUsersActivityPhotos {
  id: number;
  time: string;
  url: string;
}

export type UsersActivityType = IUsersActivityAction | UserError;

export interface IUsersActivityData {
  activity_type: activityType;
  created: IUsersActivityDataCreated;
  id: number;
  location: SellingPointLocation;
  time: string;
  photos?: IUsersActivityPhotos[];
  products?: IUsersActivityDataProducts[];
  selling_point?: IUsersActivityDataSellingPoints;
}

export interface IUsersActivityState {
  data: IUsersActivityData[];
  total: number;
}

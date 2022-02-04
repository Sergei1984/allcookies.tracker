import { StatusEnum } from "../../core/enums";
import { SellingPointModel } from "../../models/selling-point.model";

export const GET_PROFILE: string = "GET_PROFILE";

//   "id": 1,
//   "email": "seregat1984@gmail.com",
//   "name": "Serhii",
//   "account_role": "admin",
//   "iss": "allcookies.tracker",
//   "sub": "seregat1984@gmail.com",
//   "exp": 1675324885

export interface ProfileModel {
  id: number | string;
  email: string;
  name: string;
  account_role: string;
}

export interface ProfileState {
  profile: ProfileModel | null;
}

export interface AddSellingPointPayload {
  title: string;
  address: string;
}

export interface GetSellingPointsPayload {
  skip: number;
  take: number;
  search?: string;
}

export interface DeleteSellingPointPayload {
  id: number;
}

export interface GetSellingPoints {
  total: number;
  data: SellingPointModel[];
}

export interface EditSellingPointParams {
  title?: string;
  description?: string;
}

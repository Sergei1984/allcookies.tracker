import { StatusEnum } from "../../core/enums";
import { SellingPointModel } from "../../models/selling-point.model";

export const GET_SELLING_POINTS: string = "GET_SELLING_POINTS";
export const CHANGE_SELLING_PAGE: string = "CHANGE_SELLING_PAGE";
export const ADD_SELLING_POINT: string = "ADD_SELLING_POINT";

export interface SellingPointsState {
  status: StatusEnum;
  data: SellingPointModel[];
  total: number;
  error?: any;
}

export interface AddSellingPointPayload {
  title: string;
  address: string;
}

export interface GetSellingPointsPayload {
  skip: number;
  take: number;
  search: string;
}

export interface GetSellingPoints {
  total: number;
  data: SellingPointModel[];
}

export interface GetSellingPointsAction {
  type: typeof GET_SELLING_POINTS;
  payload: GetSellingPoints;
}
export interface ChangeSellingPageAction {
  type: typeof CHANGE_SELLING_PAGE;
  payload: number;
}

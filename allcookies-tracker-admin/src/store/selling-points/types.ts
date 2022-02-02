import { StatusEnum } from "../../core/enums";
import { SellingPointModel } from "../../models/selling-point.model";

export const GET_SELLING_POINTS: string = "GET_SELLING_POINTS";
export const CHANGE_SELLING_PAGE: string = "CHANGE_SELLING_PAGE";
export const DELETE_SELLING_POING: string = "DELETE_SELLING_POINT";
export const ADD_SELLING_POINT: string = "ADD_SELLING_POINT";

export interface SellingPointsState {
  data: SellingPointModel[];
  total: number;
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

export interface GetSellingPointsAction {
  type: typeof GET_SELLING_POINTS;
  payload: GetSellingPoints;
}
export interface DeleteSellingPointAction {
  type: typeof DELETE_SELLING_POING;
  payload: GetSellingPoints;
}

export interface ChangeSellingPageAction {
  type: typeof CHANGE_SELLING_PAGE;
  payload: number;
}

export interface EditSellingPointParams {
  title?: string;
  description?: string;
}

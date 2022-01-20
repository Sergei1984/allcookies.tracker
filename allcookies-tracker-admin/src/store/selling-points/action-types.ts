import { GET_SELLING_POINTS } from "./types";

export interface GetSellingPointsAction {
  type: typeof GET_SELLING_POINTS;
  payload: any;
}

export const getSellingPointsAction = (data: any): GetSellingPointsAction => ({
  type: GET_SELLING_POINTS,
  payload: data,
});

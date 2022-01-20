import {
  CHANGE_SELLING_PAGE,
  GET_SELLING_POINTS,
  GetSellingPointsAction,
  ChangeSellingPageAction,
} from "./types";

export const getSellingPointsAction = (data: any): GetSellingPointsAction => ({
  type: GET_SELLING_POINTS,
  payload: data,
});

export const changePagePointsAction = (
  page: number
): ChangeSellingPageAction => ({
  type: CHANGE_SELLING_PAGE,
  payload: page,
});

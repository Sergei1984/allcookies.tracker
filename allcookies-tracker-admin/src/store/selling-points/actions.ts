import {
  CHANGE_SELLING_PAGE,
  GET_SELLING_POINTS,
  GetSellingPointsAction,
  ChangeSellingPageAction,
  ADD_SELLING_POINT,
  AddSellingPointPayload,
  DeleteSellingPointPayload,
  DeleteSellingPointAction,
} from "./types";

export const getSellingPointsAction = (data: any): GetSellingPointsAction => ({
  type: GET_SELLING_POINTS,
  payload: data,
});

export const deleteSellingPointAction = (
  data: any
): DeleteSellingPointAction => ({
  type: GET_SELLING_POINTS,
  payload: data,
});

export const editSellingPointAction = (
  data: any
): DeleteSellingPointAction => ({
  type: GET_SELLING_POINTS,
  payload: data,
});

export const changePagePointsAction = (
  page: number
): ChangeSellingPageAction => ({
  type: CHANGE_SELLING_PAGE,
  payload: page,
});

export const addSellingPointAction = (payload: any): any => ({
  type: ADD_SELLING_POINT,
  payload: payload,
});

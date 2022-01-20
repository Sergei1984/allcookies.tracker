import { GET_SELLING_POINTS } from "./types";
import { StatusEnum } from "../../core/enums";
import { ActionType } from "../../core/types";
import { SellingPointModel } from "../../models/selling-point.model";

export interface SellingPointsState {
  status: StatusEnum;
  data: SellingPointModel[];
  error?: any;
  page: number;
}

const initialState = {
  status: StatusEnum.initial,
  data: [] as SellingPointModel[],
  error: null,
  page: 1,
};

const sellingPointsReducer = (
  state: SellingPointsState = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case GET_SELLING_POINTS:
      return { ...state, ...action.payload };

    default:
      return state;
  }
};

export default sellingPointsReducer;

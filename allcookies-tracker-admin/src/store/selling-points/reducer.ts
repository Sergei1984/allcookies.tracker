import {
  GET_SELLING_POINTS,
  CHANGE_SELLING_PAGE,
  SellingPointsState,
} from "./types";
import { ActionType } from "../../core/types";
import { initialState } from "./store";

const sellingPointsReducer = (
  state: SellingPointsState = initialState,
  action: ActionType
) => {
  switch (action.type) {
    case GET_SELLING_POINTS:
      return { ...state, ...action.payload };
    case CHANGE_SELLING_PAGE:
      return { ...state, page: action.payload };
    default:
      return state;
  }
};

export default sellingPointsReducer;
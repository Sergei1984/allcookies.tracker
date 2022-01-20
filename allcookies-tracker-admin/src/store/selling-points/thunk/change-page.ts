import { AxiosResponse } from "axios";
// import axiosInstance from "../../api";
import { Dispatch } from "redux";
import { RootStore } from "../../rootStore";
import SellingPointsService from "../../../services/selling-points/selling-points.service";
import { StatusEnum } from "../../../core/enums";
import { getSellingPointsAction, changePagePointsAction } from "../actions";
import { GetSellingPointsPayload } from "../types";

export const changePageThunk = (page: number) => {
  return (dispatch: Dispatch, getState: () => RootStore) => {
    dispatch(changePagePointsAction(page));
  };
};

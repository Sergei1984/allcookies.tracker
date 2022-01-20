import { AxiosResponse } from "axios";
import axiosInstance from "../../api";
import { Dispatch } from "redux";
import { RootStore } from "../rootStore";

import { StatusEnum } from "../../core/enums";
import { getSellingPointsAction } from "./action-types";

export const getSellingPointsActionAsync = () => {
  return async (dispatch: Dispatch, getState: () => RootStore) => {
    try {
      dispatch(getSellingPointsAction({ status: StatusEnum.running }));
      const response: AxiosResponse = await axiosInstance({
        method: "GET",
        url: `/admin/selling-point/`,
      });
      if (response.status === 200 || response.status === 201) {
        dispatch(
          getSellingPointsAction({
            status: StatusEnum.success,
            data: response.data.data,
          })
        );
      }
    } catch (error: any) {
      dispatch(
        getSellingPointsAction({
          status: StatusEnum.error,
          error: error.response,
        })
      );
    }
  };
};

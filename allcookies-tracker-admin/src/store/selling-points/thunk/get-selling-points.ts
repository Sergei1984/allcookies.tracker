import { AxiosResponse } from "axios";
// import axiosInstance from "../../api";
import { Dispatch } from "redux";
import { RootStore } from "../../rootStore";
import SellingPointsService from "../../../services/selling-points/selling-points.service";
import { StatusEnum } from "../../../core/enums";
import { getSellingPointsAction } from "../actions";
import { GetSellingPointsPayload } from "../types";

export const getSellingPointsThunk = ({
  skip,
  take,
}: GetSellingPointsPayload) => {
  return async (dispatch: Dispatch, getState: () => RootStore) => {
    try {
      dispatch(getSellingPointsAction({ status: StatusEnum.running }));
      const response: AxiosResponse =
        await SellingPointsService.getSellingPoints(skip, take);
      if (response.status === 200 || response.status === 201) {
        dispatch(
          getSellingPointsAction({
            status: StatusEnum.success,
            total: response.data.total,
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

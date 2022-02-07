import { AxiosResponse } from "axios";
import { Dispatch } from "redux";
import { RootStore } from "../../rootStore";
import SellingPointsService from "../../../services/selling-points/selling-points.service";
import { StatusEnum } from "../../../core/enums";
import { getSellingPointsAction } from "../actions";
import { GetSellingPointsPayload } from "../types";

//
import {
  setAppStatusAction,
  setAppErrorAction,
  showNotificationAction,
} from "../../app/actions";

export const getSellingPointsThunk = ({
  skip,
  take,
  search,
}: GetSellingPointsPayload) => {
  return async (dispatch: Dispatch, getState: () => RootStore) => {
    try {
      dispatch(setAppStatusAction({ status: StatusEnum.running }));
      const response: AxiosResponse =
        await SellingPointsService.getSellingPoints(skip, take, search);
      if (response.status === 200 || response.status === 201) {
        // dispatch(
        //   showNotificationAction({
        //     message: "Success get selling points",
        //     options: {
        //       key: new Date().getTime() + Math.random(),
        //       variant: "success",
        //     },
        //   })
        // );
        dispatch(setAppStatusAction({ status: StatusEnum.success }));
        dispatch(
          getSellingPointsAction({
            total: response.data.total,
            data: response.data.data,
          })
        );
      }
    } catch (error: any) {
      dispatch(setAppStatusAction({ status: StatusEnum.error }));
      dispatch(setAppErrorAction({ error: error }));
    }
  };
};

import { AxiosResponse } from "axios";
import { Dispatch } from "redux";
import { RootStore } from "../../rootStore";
import SellingPointsService from "../../../services/selling-points/selling-points.service";
import { StatusEnum } from "../../../core/enums";
import { addSellingPointAction } from "../actions";
import { AddSellingPointPayload } from "../types";

export const addSellingPointThunk = (payload: AddSellingPointPayload) => {
  return async (dispatch: Dispatch, getState: () => RootStore) => {
    try {
      dispatch(addSellingPointAction({ status: StatusEnum.running }));
      const response: AxiosResponse =
        await SellingPointsService.addNewSellingPoint(payload);
      if (response.status === 200 || response.status === 201) {
        dispatch(
          addSellingPointAction({
            status: StatusEnum.success,
          })
        );
      }
    } catch (error: any) {
      dispatch(
        addSellingPointAction({
          status: StatusEnum.error,
          error: error.response,
        })
      );
    }
  };
};

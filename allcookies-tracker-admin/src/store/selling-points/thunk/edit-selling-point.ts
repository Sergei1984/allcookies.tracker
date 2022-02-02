import { Dispatch } from "redux";
import { RootStore } from "../../rootStore";
import { StatusEnum } from "../../../core/enums";

import { setAppStatusAction, setAppErrorAction } from "../../app/actions";
import SellingPointsService from "../../../services/selling-points/selling-points.service";
import { getSellingPointsAction } from "../actions";
import { EditSellingPointParams } from "../types";
import { SellingPointModel } from "../../../models/selling-point.model";

export const editSellingPointThunk = (
  id: number,
  values: EditSellingPointParams
) => {
  return async (dispatch: Dispatch, getState: () => RootStore) => {
    try {
      dispatch(setAppStatusAction({ status: StatusEnum.running }));
      await SellingPointsService.editSellingPoint(id, values);
      dispatch(setAppStatusAction({ status: StatusEnum.success }));
      dispatch(
        getSellingPointsAction({
          data: getState().sellingPointsStore.data?.map(
            (item: SellingPointModel) => {
              if (item.id === id) {
                return { ...item, ...values };
              }
              return item;
            }
          ),
        })
      );
    } catch (error: any) {
      dispatch(setAppStatusAction({ status: StatusEnum.error }));
      dispatch(setAppErrorAction({ error: error }));
    }
  };
};

import { AxiosResponse } from "axios";
import { Dispatch } from "redux";
import { RootStore } from "../../rootStore";
import SellingPointsService from "../../../services/selling-points/selling-points.service";
import { StatusEnum, VariantEnums } from "../../../core/enums";
import { deleteSellingPointAction, getSellingPointsAction } from "../actions";
import { DeleteSellingPointPayload } from "../types";

import {
  setAppStatusAction,
  setAppErrorAction,
  showNotificationAction,
} from "../../app/actions";
import { SellingPointModel } from "../../../models/selling-point.model";

export const deleteSellingPointThunk = ({ id }: DeleteSellingPointPayload) => {
  return async (dispatch: Dispatch, getState: () => RootStore) => {
    try {
      dispatch(setAppStatusAction({ status: StatusEnum.running }));
      getSellingPointsAction({
        data: [
          ...getState().sellingPointsStore.data?.filter(
            (point: SellingPointModel) => point.id !== id
          ),
        ],
        total: getState().sellingPointsStore.total - 1,
      });
      const response: AxiosResponse =
        await SellingPointsService.deleteSellingPoint(id);
      if (response) {
        dispatch(setAppStatusAction({ status: StatusEnum.success }));
        dispatch(
          deleteSellingPointAction({
            id: id,
          })
        );
        dispatch(
          showNotificationAction({
            key: new Date().getTime() + Math.random(),
            message: {
              type: VariantEnums.success,
              title: "Удаление",
              message: "Магазин успешно удален",
            },
            options: {
              key: new Date().getTime() + Math.random(),
              variant: "success",
            },
          })
        );
        dispatch(
          getSellingPointsAction({
            data: [
              ...getState().sellingPointsStore.data?.filter(
                (point: SellingPointModel) => point.id !== id
              ),
            ],
            total: getState().sellingPointsStore.total - 1,
          })
        );
      }
    } catch (error) {
      dispatch(
        showNotificationAction({
          key: new Date().getTime() + Math.random(),
          message: {
            type: VariantEnums.error,
            title: "Ошибка",
            message: "Магазин не был удален." + JSON.stringify(error),
          },
          options: {
            key: new Date().getTime() + Math.random(),
            variant: "success",
          },
        })
      );
      dispatch(setAppStatusAction({ status: StatusEnum.error }));
      dispatch(setAppErrorAction({ error: error }));
    }
  };
};

import { Dispatch } from "redux";
import { RootStore } from "../../rootStore";
import { StatusEnum, VariantEnums } from "../../../core/enums";

import {
  setAppStatusAction,
  setAppErrorAction,
  showNotificationAction,
} from "../../app/actions";
import SellingPointsService from "../../../services/selling-points/selling-points.service";
import { getSellingPointsAction } from "../actions";
import { SellingPointModel } from "../../../models/selling-point.model";

export const displaySellingPointThunk = (id: number, is_disabled: boolean) => {
  return async (dispatch: Dispatch, getState: () => RootStore) => {
    try {
      dispatch(setAppStatusAction({ status: StatusEnum.running }));
      await SellingPointsService.updateDisplaySellingPoint(id, is_disabled);
      dispatch(setAppStatusAction({ status: StatusEnum.success }));
      dispatch(
        showNotificationAction({
          key: new Date().getTime() + Math.random(),
          message: {
            type: VariantEnums.success,
            title: "Изменение",
            message: `Магазин ${is_disabled ? "отображается" : "скрыт"}`,
          },
          options: {
            key: new Date().getTime() + Math.random(),
            variant: "success",
          },
        })
      );
      dispatch(
        getSellingPointsAction({
          data: getState().sellingPointsStore.data?.map(
            (item: SellingPointModel) => {
              if (item.id === id) {
                return { ...item, is_disabled };
              }
              return item;
            }
          ),
        })
      );
    } catch (error: any) {
      dispatch(setAppStatusAction({ status: StatusEnum.error }));
      dispatch(setAppErrorAction({ error: error }));
      dispatch(
        showNotificationAction({
          key: new Date().getTime() + Math.random(),
          message: {
            type: VariantEnums.error,
            title: "Ошибка скрытия/отображения магазина",
            message: error?.message,
          },
          options: {
            key: new Date().getTime() + Math.random(),
            variant: "error",
          },
        })
      );
    }
  };
};

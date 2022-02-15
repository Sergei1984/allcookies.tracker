import { Dispatch } from "redux";
import { RootStore } from "../../rootStore";
import { StatusEnum, VariantEnums } from "../../../core/enums";

import {
  setAppStatusAction,
  setAppErrorAction,
  showNotificationAction,
} from "../../app/actions";
import { ProductsAPI } from "../../../services/products/products.service";
import { removeProductAction } from "../actions";

export const deleteProductThunk = (id: number) => {
  return async (dispatch: Dispatch, getState: () => RootStore) => {
    try {
      dispatch(setAppStatusAction({ status: StatusEnum.running }));
      await ProductsAPI.deleteProduct(id);
      await dispatch(removeProductAction(id));
      dispatch(setAppStatusAction({ status: StatusEnum.success }));
      dispatch(
        showNotificationAction({
          key: new Date().getTime() + Math.random(),
          message: {
            type: VariantEnums.success,
            title: "Удаление продукта",
            message: "Подрукт удален",
          },
          options: {
            key: new Date().getTime() + Math.random(),
            variant: "success",
          },
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
            title: "Ошибка",
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

import { Dispatch } from "redux";
import { RootStore } from "../../rootStore";
import { StatusEnum, VariantEnums } from "../../../core/enums";

import {
  setAppStatusAction,
  setAppErrorAction,
  showNotificationAction,
} from "../../app/actions";
import { ProductsAPI } from "../../../services/products/products.service";
import {editProductAction, removeProductAction} from "../actions";

export const editProductThunk = (id: number, title: string) => {
  return async (dispatch: Dispatch, getState: () => RootStore) => {
    try {
      dispatch(setAppStatusAction({ status: StatusEnum.running }));
      dispatch(editProductAction({ id, title }));
      await ProductsAPI.editProduct(id, title);
      dispatch(setAppStatusAction({ status: StatusEnum.success }));
      dispatch(
        showNotificationAction({
          key: new Date().getTime() + Math.random(),
          message: {
            type: VariantEnums.success,
            title: "Изменение продукта",
            message: "Подрукт изменен",
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

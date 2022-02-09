import { AxiosResponse } from "axios";
import { Dispatch } from "redux";
import { RootStore } from "../../rootStore";
import { StatusEnum, VariantEnums } from "../../../core/enums";

//
import {
  setAppStatusAction,
  setAppErrorAction,
  showNotificationAction,
} from "../../app/actions";
import { ProductsAPI } from "../../../services/products/products.service";
import { setAllProductsAction } from "../actions";

export const getAllProductsThunk = ({ skip, take, search }: any) => {
  return async (dispatch: Dispatch, getState: () => RootStore) => {
    try {
      dispatch(setAppStatusAction({ status: StatusEnum.running }));
      const response: AxiosResponse = await ProductsAPI.getAllProducts(
        skip,
        take,
        search
      );
      if (response.status === 200 || response.status === 201) {
        dispatch(setAppStatusAction({ status: StatusEnum.success }));
        dispatch(
          setAllProductsAction({
            total: response.data.total,
            data: response.data.data,
          })
        );
      }
    } catch (error: any) {
      dispatch(setAppStatusAction({ status: StatusEnum.error }));
      dispatch(setAppErrorAction({ error: error }));
      dispatch(
        showNotificationAction({
          key: new Date().getTime() + Math.random(),
          message: {
            type: VariantEnums.error,
            title: "Ошибка получения продуктов",
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

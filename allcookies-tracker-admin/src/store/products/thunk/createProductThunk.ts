import { AxiosResponse } from "axios";
import { Dispatch } from "redux";
import { RootStore } from "../../rootStore";
import { StatusEnum } from "../../../core/enums";

//
import { setAppStatusAction, setAppErrorAction } from "../../app/actions";
import { ProductsAPI } from "../../../services/products/products.service";
import { setAllProductsAction } from "../actions";
import { CreateProduct } from "../types";

export const createProductThunk = (data: CreateProduct) => {
  return async (dispatch: Dispatch, getState: () => RootStore) => {
    try {
      dispatch(setAppStatusAction({ status: StatusEnum.running }));
        await ProductsAPI.createProduct(data);
      
    } catch (error: any) {
      dispatch(setAppStatusAction({ status: StatusEnum.error }));
      dispatch(setAppErrorAction({ error: error }));
    }
  };
};

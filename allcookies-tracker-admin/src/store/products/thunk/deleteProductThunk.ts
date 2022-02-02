import { Dispatch } from "redux";
import { RootStore } from "../../rootStore";
import { StatusEnum } from "../../../core/enums";

import { setAppStatusAction, setAppErrorAction } from "../../app/actions";
import { ProductsAPI } from "../../../services/products/products.service";
import { removeProductAction } from "../actions";

export const deleteProductThunk = (id: number) => {
  return async (dispatch: Dispatch, getState: () => RootStore) => {
    try {
      dispatch(setAppStatusAction({ status: StatusEnum.running }));
      await ProductsAPI.deleteProduct(id);
      await dispatch(removeProductAction(id));
      
    } catch (error: any) {
      dispatch(setAppStatusAction({ status: StatusEnum.error }));
      dispatch(setAppErrorAction({ error: error }));
    }
  };
};

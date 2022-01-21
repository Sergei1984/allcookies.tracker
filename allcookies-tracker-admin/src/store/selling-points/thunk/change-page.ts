import { Dispatch } from "redux";
import { RootStore } from "../../rootStore";
import { changePagePointsAction } from "../actions";

export const changePageThunk = (page: number) => {
  return (dispatch: Dispatch, getState: () => RootStore) => {
    dispatch(changePagePointsAction(page));
  };
};

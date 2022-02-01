import { Action, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { StatusEnum } from "../../../core/enums";
import { UserAPI } from "../../../services/user/user.service";
import { setAppErrorAction, setAppStatusAction } from "../../app/actions";
import { RootStore } from "../../rootStore";
import { getAllUserAction } from "../actions";
import { UsersResponse, UserType } from "../types";

export const getAllUserThunk =
  (
    skip: number,
    take: number
  ): ThunkAction<void, RootStore, unknown, Action<UserType>> =>
  async (dispatch: Dispatch) => {
    dispatch(setAppStatusAction({ status: StatusEnum.running }));
    const response: UsersResponse = await UserAPI.getAllUsers(skip, take);

    if (response) {
      dispatch(setAppStatusAction({ status: StatusEnum.success }));
      console.log(response.data);
      dispatch(getAllUserAction(response.data));
    } else {
      dispatch(setAppStatusAction({ status: StatusEnum.error }));
      dispatch(setAppErrorAction({ error: {} }));
    }
  };

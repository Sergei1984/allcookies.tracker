import { Action, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { StatusEnum, VariantEnums } from "../../../core/enums";
import { UserAPI } from "../../../services/user/user.service";
import {
  setAppErrorAction,
  setAppStatusAction,
  showNotificationAction,
} from "../../app/actions";
import { RootStore } from "../../rootStore";
import { getAllUserAction } from "../actions";
import { UsersResponse, UserType } from "../types";

export const getAllUserThunk =
  (
    skip: number,
    take: number,
    search?: string
  ): ThunkAction<void, RootStore, unknown, Action<UserType>> =>
  async (dispatch: Dispatch) => {
    try {
      dispatch(setAppStatusAction({ status: StatusEnum.running }));
      const response: UsersResponse = await UserAPI.getAllUsers(
        skip,
        take,
        search
      );

      if (response) {
        dispatch(setAppStatusAction({ status: StatusEnum.success }));
        dispatch(
          getAllUserAction({ data: response.data, total: response.total })
        );
      } else {
        throw new Error("Что-то пошло не так");
      }
    } catch (error: any) {
      dispatch(setAppStatusAction({ status: StatusEnum.error }));
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

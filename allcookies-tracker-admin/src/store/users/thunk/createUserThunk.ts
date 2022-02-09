import { Action, Dispatch } from "redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { UserAPI } from "../../../services/user/user.service";
import { showNotificationAction } from "../../app/actions";
import { VariantEnums } from "../../../core/enums";

export const createUserThunk = (payload: any) => async (dispatch: Dispatch) => {
  try {
    const response = await UserAPI.createUser(payload);
    if (response) {
      dispatch(
        showNotificationAction({
          key: new Date().getTime() + Math.random(),
          message: {
            type: VariantEnums.success,
            title: "Добавление пользователя",
            message: "Пользователь успешно добавлен",
          },
          options: {
            key: new Date().getTime() + Math.random(),
            variant: "success",
          },
        })
      );
    }
  } catch (error: any) {
    dispatch(
      showNotificationAction({
        key: new Date().getTime() + Math.random(),
        message: {
          type: VariantEnums.error,
          title: "Ошибка добавления пользователя",
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

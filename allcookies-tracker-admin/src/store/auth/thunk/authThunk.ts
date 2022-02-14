import { Action, Dispatch } from "redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { StatusEnum, VariantEnums } from "../../../core/enums";
import { AuthAPI } from "../../../services/auth/auth.service";
import ProfileService from "../../../services/profile/profile.service";
import LocalStorageService, {
  setToken,
} from "../../../services/localStorage/localStorage.service";
import { setAppStatusAction, showNotificationAction } from "../../app/actions";
import { RootStore } from "../../rootStore";
import { setUserAction } from "../actions";
import { AuthType, ILogin, IResponse } from "../types";

export const authThunk =
  (payload: ILogin): ThunkAction<void, RootStore, unknown, Action<AuthType>> =>
  async (dispatch: Dispatch) => {
    try {
      dispatch(setAppStatusAction({ status: StatusEnum.running }));
      const response: IResponse = await AuthAPI.signIn(payload);

      if (response.status === 200) {
        setToken(response.data.jwt);
        const resp = await ProfileService.getProfile();
        LocalStorageService.setUser(resp.data);
        dispatch(setAppStatusAction({ status: StatusEnum.success }));
        dispatch(
          showNotificationAction({
            key: new Date().getTime() + Math.random(),
            message: {
              type: VariantEnums.success,
              title: "Успешный вход",
              message: "Вы успешно вошли в систему",
            },
            options: {
              key: new Date().getTime() + Math.random(),
              variant: "error",
            },
          })
        );
        dispatch(setUserAction(true));
      }
    } catch (error: any) {
      dispatch(setUserAction(false));
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

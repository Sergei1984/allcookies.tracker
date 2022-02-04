import { AxiosResponse } from "axios";
import { Dispatch } from "redux";
import { RootStore } from "../../rootStore";
import ProfileService from "../../../services/profile/profile.service";
import LocalStorageService from "../../../services/localStorage/localStorage.service";
import { StatusEnum } from "../../../core/enums";
import { getProfileAction } from "../actions";

//
import { setAppStatusAction, setAppErrorAction } from "../../app/actions";

export const getProfileThunk = () => {
  return async (dispatch: Dispatch, getState: () => RootStore) => {
    try {
      dispatch(setAppStatusAction({ status: StatusEnum.running }));
      const response: AxiosResponse = await ProfileService.getProfile();
      if (response.status === 200 || response.status === 201) {
        LocalStorageService.setUser(response.data);
        dispatch(setAppStatusAction({ status: StatusEnum.success }));
        dispatch(
          getProfileAction({
            ...response.data,
          })
        );
      }
    } catch (error: any) {
      dispatch(setAppStatusAction({ status: StatusEnum.error }));
      dispatch(setAppErrorAction({ error: error }));
    }
  };
};

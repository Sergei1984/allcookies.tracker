import {ThunkAction} from "redux-thunk";
import {RootStore} from "../../rootStore";
import {Action, Dispatch} from "redux";
import {UsersActivityType} from "../types";
import {getUsersActivityAction} from "../actions";
import {UsersActivityAPI} from "../../../services/users-activity/user.service";
import {getCurrentDate} from "../../../utils";

export const getUsersActivityThunk = (date: string = getCurrentDate('YYYY-MM-DD')): ThunkAction<void, RootStore, unknown, Action<UsersActivityType>> =>
  async (dispatch: Dispatch) => {
  try {
    const response: any = await UsersActivityAPI.getUsersActivity(date);
    dispatch(getUsersActivityAction({data: response.data, total: response.total}))
  } catch (error: any) {}
}

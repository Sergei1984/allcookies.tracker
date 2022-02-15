import {ThunkAction} from "redux-thunk";
import {RootStore} from "../../rootStore";
import {Action, Dispatch} from "redux";
import {IUsersActivityState, UsersActivityType} from "../types";
import {getUsersActivityAction} from "../actions";
import {UsersActivityAPI} from "../../../services/users-activity/user.service";
import {getCurrentDate, getDate} from "../../../utils";

export const getUsersActivityThunk = (date: string = getCurrentDate('YYYY-MM-DD')): ThunkAction<void, RootStore, unknown, Action<UsersActivityType>> =>
    async (dispatch: Dispatch) => {
      try {
        const response: IUsersActivityState = await UsersActivityAPI.getUsersActivity(date);
        const sortedResponse = response.data.sort((a, b) => +getDate(a.time, 'X') - +getDate(b.time, 'X'))
        dispatch(getUsersActivityAction({data: sortedResponse, total: response.total}))
      } catch (error: any) {
      }
    }

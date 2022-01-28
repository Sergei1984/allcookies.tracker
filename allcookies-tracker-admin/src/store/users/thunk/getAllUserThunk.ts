import {Action} from "redux";
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {UserAPI} from "../../../services/user/user.service";
import {RootStore} from "../../rootStore";
import {getAllUserAction} from "../actions";
import {UsersResponse, UserType} from "../types";

export const getAllUserThunk = (skip:number, take: number):  ThunkAction<void, RootStore, unknown, Action<UserType>> =>
	async (dispatch: ThunkDispatch<{}, {}, UserType>) => {
		const response: UsersResponse = await UserAPI.getAllUsers(skip, take);

		if (response) {
			await dispatch(getAllUserAction(response.data))
		}
	}



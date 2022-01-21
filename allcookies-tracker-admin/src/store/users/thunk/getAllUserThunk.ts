import {Action} from "redux";
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {UserAPI} from "../../../services/user/user.service";
import {RootStore} from "../../rootStore";
import {getAllUserAction} from "../actions";
import {UsersResponse, UserType} from "../types";

export const getAllUserThunk = ():  ThunkAction<void, RootStore, unknown, Action<UserType>> =>
	async (dispatch: ThunkDispatch<{}, {}, UserType>) => {
		const response: UsersResponse = await UserAPI.getAllUsers();

		if (response) {
			await dispatch(getAllUserAction(response.data))
		}
	}



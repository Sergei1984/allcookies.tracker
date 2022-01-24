import {Action} from "redux";
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {UserAPI} from "../../../services/user/user.service";
import {RootStore} from "../../rootStore";
import {IUser, UserAction, UserType} from "../types";

export const createUserThunk = (payload: { password: string; is_blocked: boolean; name: string; login: string }): ThunkAction<void, RootStore, unknown, Action<UserType>> =>
	async (dispatch: ThunkDispatch<{}, {}, UserAction>) => {
		await UserAPI.createUser(payload);
	}
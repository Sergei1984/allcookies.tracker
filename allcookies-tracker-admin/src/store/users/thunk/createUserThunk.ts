import {Action} from "redux";
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {UserAPI} from "../../../services/user/user.service";
import {RootStore} from "../../rootStore";
import {errorUserAction} from "../actions";
import {IUser, UserType} from "../types";

export const createUserThunk = (payload: IUser): ThunkAction<void, RootStore, unknown, Action<UserType>> =>
	async (dispatch: ThunkDispatch<{}, {}, UserType>) => {

	try {
		const response = await UserAPI.createUser(payload);
		if(response) {
			await dispatch(errorUserAction({error: false, message: 'Пользователь добавлен'}))
		}
	} catch (e) {
		await dispatch(errorUserAction({error: true, message: 'Такой пользователь существует'}))
	}
}
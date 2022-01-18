import {Action} from "redux";
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {AuthAPI} from "../../../services/auth/auth.service"
import {setToken} from "../../../services/localStorage/localStorage.service"
import {RootStore} from "../../rootStore";
import {setUserAction} from "../actions";
import {AuthType, ILogin, IResponse} from "../types";

export const authThunk = (payload: ILogin): ThunkAction<void, RootStore, unknown, Action<AuthType>> =>
	async (dispatch: ThunkDispatch<{}, {}, AuthType>) => {

		const response:IResponse = await AuthAPI.signIn(payload);

		if (response.status === 200) {
			setToken(response.data.jwt)

			return dispatch(setUserAction(true))
		}
		 dispatch(setUserAction(false))

	}
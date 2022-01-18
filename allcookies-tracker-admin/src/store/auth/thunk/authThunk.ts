import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {RootStore} from "../../rootStore";
import {Action} from "redux";
import {AuthType, ILogin} from "../types";
import {setUserAction} from "../actions";
import {AuthAPI} from "../../../services/auth/auth.service"
import {setToken} from "../../../services/localStorage/localStorage.service"

export const authThunk = (payload: ILogin): ThunkAction<void, RootStore, unknown, Action<AuthType>> =>
	async (dispatch: ThunkDispatch<{}, {}, AuthType>) => {

		const response = await AuthAPI.signIn(payload);

		if (response.status === 200) {
			setToken(response.data.jwt)

			return dispatch(setUserAction(true))
		}
		 dispatch(setUserAction(false))

	}
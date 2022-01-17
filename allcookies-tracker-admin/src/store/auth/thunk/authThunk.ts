import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {RootStore} from "../../rootStore";
import {Action} from "redux";
import {AuthType, ILogin} from "../types";
import {setUserAction} from "../action";
import {AuthAPI} from "../../../services/auth/auth.service"
import {setToken} from "../../../services/localStorage/localStorage.service"

export const authThunk = (payload: ILogin): ThunkAction<void, RootStore, unknown, Action<AuthType>> =>
	async (dispatch: ThunkDispatch<{}, {}, AuthType>) => {
		try {
			const response = await AuthAPI.signIn(payload);

			if (response.status === 200) {
				setToken(response.data.jwt)
				dispatch(setUserAction(true))
			} else if (response.status === 400) {

			}
		} catch (error) {
			console.error(error)
		}
	}
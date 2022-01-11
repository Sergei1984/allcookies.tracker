import { Action } from "redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { RootStore } from "../../rootStore";
import { CountType } from "../types";

export const testThunk = (payload: number): ThunkAction<void, RootStore, unknown, Action<CountType>> => 
    async (dispatch: ThunkDispatch<{}, {}, CountType>) => {
        try {
            // send request to API and get response
            // const getAny = await CountAPI.getCount(payload);
            
            // dispatch any action for set data to redux store
            // dispatch(anyAction(getAny))
        } catch (error) {
            console.error(error)
        }
    }
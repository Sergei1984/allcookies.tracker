import { AppState, SET_APP_STATUS, SET_APP_ERROR } from "./types";
import { ActionType } from "../../core/types";
import { initialState } from "./store";

const appReducer = (state: AppState = initialState, action: ActionType) => {
  switch (action.type) {
    case SET_APP_STATUS:
      return { ...state, ...action.payload };
    case SET_APP_ERROR:
      return { ...state, page: action.payload };

    default:
      return state;
  }
};

export default appReducer;

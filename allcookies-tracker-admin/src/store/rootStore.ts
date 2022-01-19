import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import {authReducer} from "./auth/reducer";

export const rootReducer = combineReducers({
	authStore: authReducer
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
export type RootStore = ReturnType<typeof rootReducer>;
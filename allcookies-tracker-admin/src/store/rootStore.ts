import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { countReducer } from "./auth/reducer";

export const rootReducer = combineReducers({
    countStore: countReducer
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
export type RootStore = ReturnType<typeof rootReducer>;
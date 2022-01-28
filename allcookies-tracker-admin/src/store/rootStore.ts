import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import {alertReducer} from "./app/reducer";
import { authReducer } from "./auth/reducer";
import sellingPointsReducer from "./selling-points/reducer";
import {userReducer} from "./users/reducer";


export const rootReducer = combineReducers({
  authStore: authReducer,
  sellingPointsStore: sellingPointsReducer,
  userStore: userReducer,
  alertStore: alertReducer
});

const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);
export type RootStore = ReturnType<typeof rootReducer>;

import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { alertReducer } from "./alert/reducer";
import { authReducer } from "./auth/reducer";
import sellingPointsReducer from "./selling-points/reducer";
import appReducer from "./app/reducer";
import { userReducer } from "./users/reducer";
import { productReducer } from "./products/reducer";

export const rootReducer = combineReducers({
  authStore: authReducer,
  sellingPointsStore: sellingPointsReducer,
  userStore: userReducer,
  appStore: appReducer,
  alertStore: alertReducer,
  productStore: productReducer
});

const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);
export type RootStore = ReturnType<typeof rootReducer>;

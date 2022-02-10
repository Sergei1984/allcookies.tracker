import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { authReducer } from "./auth/reducer";
import sellingPointsReducer from "./selling-points/reducer";
import appReducer from "./app/reducer";
import { userReducer } from "./users/reducer";
import { productReducer } from "./products/reducer";
import profileReducer from "./profile/reducer";
import {usersActivityReducer} from "./users-activity/reducer";

export const rootReducer = combineReducers({
  authStore: authReducer,
  sellingPointsStore: sellingPointsReducer,
  userStore: userReducer,
  usersActivityStore: usersActivityReducer,
  appStore: appReducer,
  productStore: productReducer,
  profileStore: profileReducer,
});

const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);
export type RootStore = ReturnType<typeof rootReducer>;

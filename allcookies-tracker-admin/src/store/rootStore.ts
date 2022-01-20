import { applyMiddleware, combineReducers, createStore, compose } from "redux";
import thunk from "redux-thunk";
import { authReducer } from "./auth/reducer";
import sellingPointsReducer from "./selling-points/reducer";

export const rootReducer = combineReducers({
  authStore: authReducer,
  sellingPointsStore: sellingPointsReducer,
});

const composeEnhancers =
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);
export type RootStore = ReturnType<typeof rootReducer>;

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from './user/slice';
import sellingPointReducer from './sellingPoint/slice';
import productReducer from './product/slice';
import appReducer from './app/slice';

const rootReducer = combineReducers({
    userReducer,
    sellingPointReducer,
    productReducer,
    appReducer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer   
    })
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
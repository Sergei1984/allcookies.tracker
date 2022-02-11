import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialState } from "./store";
import { Notification } from "./types";

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        showNotificationAction: (state, action: PayloadAction<Notification>) => {
            state.notification = action.payload
        }
    },
    extraReducers: {
      
    }
})

export default appSlice.reducer;
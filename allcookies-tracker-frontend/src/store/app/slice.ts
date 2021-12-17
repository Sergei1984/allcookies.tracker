import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { initialState } from "./store"

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setAppLoadingAction: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload
        },
        setAppLoaderAction: (state, action: PayloadAction<boolean>) => {
            state.loader = action.payload
        },
    }
})

export default appSlice.reducer;
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialState } from "./store";
import { checkSellingPointThunk, getNewSellingPointsThunk, getSellingPointsThunk } from "./thunk";
import { SellingPointState } from "./types";

export const sellingPointSlice = createSlice({
    name: 'sellingPoint',
    initialState,
    reducers: {

    },
    extraReducers: {
        [getSellingPointsThunk.fulfilled.type]: (state, action: PayloadAction<SellingPointState>) => {
            state.data = action.payload.data,
            state.total = action.payload.total
        },
        [getNewSellingPointsThunk.fulfilled.type]: (state, action: PayloadAction<SellingPointState>) => {
            state.newSellingPoints = action.payload.data
        }
    }
})

export default sellingPointSlice.reducer;
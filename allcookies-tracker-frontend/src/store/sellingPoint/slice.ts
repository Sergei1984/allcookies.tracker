import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialState } from "./store";
import { getSellingPointsThunk } from "./thunk";
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
    }
})

export default sellingPointSlice.reducer;
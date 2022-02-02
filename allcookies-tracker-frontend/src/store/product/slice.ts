import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialState } from "./store";
import { getProductsThunk, searchProductThunk } from "./thunk";
import { ProductState } from "./types";

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {

    },
    extraReducers: {
        [getProductsThunk.fulfilled.type]: (state, action: PayloadAction<ProductState>) => {
            state.total = action.payload.total,
            state.data = [...state.data, ...action.payload.data]
        },
        [searchProductThunk.fulfilled.type]: (state, action: PayloadAction<ProductState>) => {
            state.total = action.payload.total
            state.data = action.payload.data
        }
    }
})

export default productSlice.reducer;
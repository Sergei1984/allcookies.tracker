import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialState } from "./store";
import { getProductsThunk, searchProductThunk } from "./thunk";
import { ProductState } from "./types";

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        handleIncrementCount: (state, action: PayloadAction<string>) => {
            state.data = state.data.map((el) => 
            el.title === action.payload ? { ...el, count: el.count + 1} : el
          )
        },
        handleDecrementCount: (state, action: PayloadAction<string>) => {
            state.data = state.data.map((el) =>
            el.title === action.payload ? { ...el, count: el.count - 1 } : el
          )
        },
        clearDefaultData: (state) => {
            state.data = []
        }
    },
    extraReducers: {
        [getProductsThunk.fulfilled.type]: (state, action: PayloadAction<ProductState>) => {
            state.total = action.payload.total,
            state.data = [...state.data, ...action.payload.data]
        },
        [searchProductThunk.fulfilled.type]: (state, action: PayloadAction<ProductState>) => {
            state.total = action.payload.total
            state.filteredData = action.payload.data
        }
    }
})

export default productSlice.reducer;
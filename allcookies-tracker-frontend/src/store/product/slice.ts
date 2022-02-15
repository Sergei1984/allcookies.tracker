import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialState } from "./store";
import { getProductsThunk, searchProductThunk } from "./thunk";
import { ProductState } from "./types";

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        handleIncrementRemainingCount: (state, action: PayloadAction<string>) => {
            state.data = state.data.map((el) => 
            el.title === action.payload ? { ...el, remaining_quantity: el.remaining_quantity + 1} : el
          )
        },
        handleDecrementRemainingCount: (state, action: PayloadAction<string>) => {
            state.data = state.data.map((el) =>
            el.title === action.payload ? { ...el, remaining_quantity: el.remaining_quantity - 1 } : el
          )
        },
        handleIncrementOrderCount: (state, action: PayloadAction<string>) => {
            state.data = state.data.map((el) => 
            el.title === action.payload ? { ...el, order_quantity: el.order_quantity + 1} : el
          )
        },
        handleDecrementOrderCount: (state, action: PayloadAction<string>) => {
            state.data = state.data.map((el) =>
            el.title === action.payload ? { ...el, order_quantity: el.order_quantity - 1 } : el
          )
        },
        clearDefaultData: (state) => {
            state.data = state.data.map(item => ({...item, count: 0}))
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
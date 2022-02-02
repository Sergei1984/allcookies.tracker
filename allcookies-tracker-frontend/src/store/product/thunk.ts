import { createAsyncThunk } from "@reduxjs/toolkit";
import { ProductsAPI } from "../../services/products.service";

export const getProductsThunk = createAsyncThunk('products/getProducts', async (data: {skip: number, take: number}, thunkAPI) => {
    try {
        const response = await ProductsAPI.getProducts(data.skip, data.take);
        return response;
    } catch (e) {
        console.log(e);
        return thunkAPI.rejectWithValue(e.message)
    }
})

export const searchProductThunk = createAsyncThunk('products/searchProduct', async (data: string, thunkAPI) => {
    try {
        const response = await ProductsAPI.searchProducts(data);
        return response;
    } catch (e) {
        console.log(e);
        return thunkAPI.rejectWithValue(e.message)
    }
})
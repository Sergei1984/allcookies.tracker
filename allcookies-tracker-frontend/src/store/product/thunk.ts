import { createAsyncThunk } from "@reduxjs/toolkit";
import { ProductsAPI } from "../../services/products.service";
import { Product } from "./types";

export const getProductsThunk = createAsyncThunk('products/getProducts', async (data: {skip: number, take: number}, thunkAPI) => {
    try {
        const response = await ProductsAPI.getProducts(data.skip, data.take);
        const testData = response.data.map((item: Product) => ({...item, count: 0}));
        const result = {
            total: response.total,
            data: testData
        }
        return result;
    } catch (e) {
        console.log(e);
        return thunkAPI.rejectWithValue(e.message)
    }
})

export const searchProductThunk = createAsyncThunk('products/searchProduct', async (data: string, thunkAPI) => {
    try {
        const response = await ProductsAPI.searchProducts(data);
        const testData = response.data.map((item: Product) => ({...item, count: 0}));
        const result = {
            total: response.total,
            data: testData
        }
        return result;
    } catch (e) {
        console.log(e);
        return thunkAPI.rejectWithValue(e.message)
    }
})
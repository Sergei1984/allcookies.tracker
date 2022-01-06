import { createAsyncThunk } from "@reduxjs/toolkit";
import { ProductsAPI } from "../../services/products.service";

export const getProductsThunk = createAsyncThunk('products/getProducts', async (_, thunkAPI) => {
    try {
        const response = await ProductsAPI.getProducts();
        return response;
    } catch (e) {
        console.log(e);
        return thunkAPI.rejectWithValue(e.message)
    }
})
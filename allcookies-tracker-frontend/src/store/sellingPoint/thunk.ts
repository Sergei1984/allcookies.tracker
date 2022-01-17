import { createAsyncThunk } from "@reduxjs/toolkit";
import { SellingPointsAPI } from "../../services/sellingPoints.service";
import { CheckSellingPointData, Location, SellingPointData } from "./types";

export const getSellingPointsThunk = createAsyncThunk('sellingPoints/getSellingPoints', async (_, thunkAPI) => {
    try {
        const response = await SellingPointsAPI.getSellingPoints();
        return response
    } catch (e) {
        console.log(e);
        return thunkAPI.rejectWithValue(e.message)
    }
})

export const createSellingPointThunk = createAsyncThunk('sellingPoints/createSellingPoint', async (data: SellingPointData, thunkAPI) => {
    try {
        const response = await SellingPointsAPI.createSellingPoint(data);
        return response
    } catch (e) {
        console.log(e);
        return thunkAPI.rejectWithValue(e.message)
    }
})

export const checkSellingPointThunk = createAsyncThunk('sellingPoints/checkSellingPoint', async (data: CheckSellingPointData, thunkAPI) => {
    try {
        const response = await SellingPointsAPI.checkSellingPoint(data);
        return response
    } catch (e) {
        console.log(e);
        return thunkAPI.rejectWithValue(e.message)
    }
})

export const getNewSellingPointsThunk = createAsyncThunk('sellingPoints/getNewSellingPoints', async (data: Location, thunkAPI) => {
    try {
        const response = await SellingPointsAPI.getNewSellingPoints(data);
        return response
    } catch (e) {
        console.log(e);
        return thunkAPI.rejectWithValue(e.message)
    }
})



import { createAsyncThunk } from "@reduxjs/toolkit";
import { SellingPointsAPI } from "../../services/sellingPoints.service";
import { UserAPI } from "../../services/user.service";
import { CheckSellingPointData, Location, SellingPointData } from "./types";

export const getSellingPointsThunk = createAsyncThunk('sellingPoints/getSellingPoints', async (data: {skip: number, take: number}, thunkAPI) => {
    try {
        const response = await SellingPointsAPI.getSellingPoints(data.skip, data.take);
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
        if(response && data.images.length !== 0) {
            data.images.map(async (item: any) => {
                const data1 = new FormData();
                data1.append("file", item);
                console.log(data1);
                await UserAPI.uploadPhoto(response.id, data1)
            });
        }
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


export const searchSellingPointThunk = createAsyncThunk('sellingPoints/searchSellingPoint', async (data: string, thunkAPI) => {
    try {
        const response = await SellingPointsAPI.searchSellingPoint(data);
        return response;
    } catch (e) {
        return thunkAPI.rejectWithValue(e.message)
    }
})


import AsyncStorageLib from "@react-native-async-storage/async-storage";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AuthAPI } from "../../services/auth.service";
import { UserAPI } from "../../services/user.service";
import { IOpenCloseDay, SignInData } from "./types";


export const signInThunk = createAsyncThunk('user/signIn', async (data: SignInData, thunkAPI) => {
    try {
        const response = await AuthAPI.signIn(data);
        await AsyncStorageLib.setItem('token', response.jwt);
        return response;
    } catch (e) {
        console.log(e)
        return thunkAPI.rejectWithValue(e.message)
    }
})

export const getProfileThunk = createAsyncThunk('user/getProfile', async (_, thunkAPI) => {
    try {
        const response = await UserAPI.getProfile();
        return response
    } catch (e) {
        console.log(e);
        return thunkAPI.rejectWithValue(e.message)
    }
})

export const openDayThunk = createAsyncThunk('user/openDay', async (data: IOpenCloseDay, thunkAPI) => {
    try {
        const response = await UserAPI.openDay(data);
        return response;
    } catch (e) {
        console.log(e);
        return thunkAPI.rejectWithValue(e.message)
    }
})

export const closeDayThunk = createAsyncThunk('user/closeDay', async (data: IOpenCloseDay, thunkAPI) => {
    try {
        const response = await UserAPI.closeDay(data);
        return response;
    } catch (e) {
        console.log(e);
        return thunkAPI.rejectWithValue(e.message)
    }
})

export const uploadPhotoThunk = createAsyncThunk('user/uploadPhoto', async (data: any, thunkAPI) => {
    try {
        const response = await UserAPI.uploadPhoto(data.id, data.photo);
        console.log(response)
        return response;
    } catch (e) {
        console.log(e);
        return thunkAPI.rejectWithValue(e.message)
    }
})
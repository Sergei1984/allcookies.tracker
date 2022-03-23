import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { initialState } from "./store"
import { getActivityStatusThunk, getProfileThunk, openDayThunk, signInThunk } from "./thunk"
import { IUser } from "./types"

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        clearCurrentUser: (state) => {
            state.isAuthorized = false,
            state.isLogout = true,
            state.user = null
        },
        setIsAuthorized: (state) => {
            state.isAuthorized = true
        },
        setCurrentActivity: (state, action: PayloadAction<any>) => {
            state.activity = action.payload
        },
        clearError: (state) => {
            state.error = ''
        }
    },
    extraReducers: {
        [signInThunk.pending.type]: (state) => {
            state.isLoading = true,
            state.isAuthorized = false
        },
        [signInThunk.fulfilled.type]: (state) => {
            state.isLoading = false,
            state.error = '',
            state.isAuthorized = true
        },
        [signInThunk.rejected.type]: (state, action: PayloadAction<string>) => {
            state.isLoading = false,
            state.error = 'Wrong email or password',
            state.isAuthorized = false
        },
        [getProfileThunk.fulfilled.type]: (state, action: PayloadAction<IUser>) => {
            state.user = action.payload
        },
        [openDayThunk.fulfilled.type]: (state, action: PayloadAction<any>) => {
            state.activity = action.payload
        },
        [getActivityStatusThunk.fulfilled.type]: (state, action: PayloadAction<any>) => {
            state.activityStatus = action.payload
        }
    }
})

export default userSlice.reducer;
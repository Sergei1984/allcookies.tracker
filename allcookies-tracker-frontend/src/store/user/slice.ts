import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { initialState } from "./store"
import { getProfileThunk, signInThunk } from "./thunk"
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
            state.error = action.payload,
            state.isAuthorized = false
        },
        [getProfileThunk.fulfilled.type]: (state, action: PayloadAction<IUser>) => {
            state.user = action.payload
        }
    }
})

export default userSlice.reducer;
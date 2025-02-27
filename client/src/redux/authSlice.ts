import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IUserLogin, IUserRegister} from "../interfaces/userInterfaces.ts";
import axiosInstance from "../../axiosConfig.ts";
import axios, {AxiosError} from 'axios';

interface AuthState {
    user: string | null,
    userId: number | null,
    email: string | null,
    isLoggedIn: boolean,
    authLoading: boolean,
    error: string | null,
}

const initialState: AuthState = {
    user: null,
    userId: null,
    email: null,
    isLoggedIn: false,
    authLoading: false,
    error: null,
}

export const loginUser = createAsyncThunk(
    "auth/login",
    async ({email, password}: IUserLogin, thunkAPI) => {
        try {
            const response = await axiosInstance.post('/login', {email, password});
            return response.data;
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                return thunkAPI.rejectWithValue({ message: error.response.data });
            } else {
                return thunkAPI.rejectWithValue({ message: 'Unexpected error occurred' });
            }
        }
    }
)

export const registerUser = createAsyncThunk(
    "auth/register",
    async({name, email, password, confirmPassword}: IUserRegister, thunkAPI) => {
        try {
            await axiosInstance.post('/register',
                {name, email, password, confirmPassword});
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                return thunkAPI.rejectWithValue({ message: error.response.data });
            } else {
                return thunkAPI.rejectWithValue({ message: 'Unexpected error occurred' });
            }
        }
    }
)

export const checkSession = createAsyncThunk(
    'auth/checkSession',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get('/checkSession');
            return response.data;
        } catch (error) {
            if (error instanceof AxiosError) {
                return rejectWithValue(
                    error.response?.data || "Error occurred"
                );
            }
        }
    }
)

export const logoutUser = createAsyncThunk(
    'auth/logout',
    async() => {
        const response = await axiosInstance.post('/logout', {});
        return response.data;
    }
)

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        resetError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.fulfilled, (state, action) => {
                state.user = action.payload.user.name;
                state.userId = action.payload.user.userId;
                state.isLoggedIn = action.payload.isLoggedIn;
                state.email = action.payload.user.email;
                state.authLoading = false;
            })
            .addCase(checkSession.fulfilled, (state, action) => {
                state.isLoggedIn = action.payload.isLoggedIn;
                state.user = action.payload.user.name;
                state.userId = action.payload.user.userId;
                state.email = action.payload.user.email;
                state.authLoading = false;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.user = null;
                state.isLoggedIn = false;
                state.authLoading = false;
                state.userId = null;
                state.email = null;
            })
            .addCase(checkSession.rejected, (state) => {
                state.authLoading = false;
                state.user = null;
                state.isLoggedIn = false;
            })
            .addMatcher(
                (action) =>
                    [loginUser.pending.type, registerUser.pending.type, checkSession.pending.type, logoutUser.pending.type].includes(action.type),
                (state) => {
                    state.authLoading = true;
                    state.error = null;
                }
            )
            .addMatcher(
                (action) =>
                    [loginUser.rejected.type, registerUser.rejected.type, logoutUser.rejected.type].includes(action.type),
                (state, action: PayloadAction<{message: string | null}>) => {
                    state.authLoading = false;
                    state.error = action.payload.message;
                    state.user = null;
                    state.isLoggedIn = false;
                }
            )
    }
})

export const {resetError} = authSlice.actions;
export default authSlice.reducer;
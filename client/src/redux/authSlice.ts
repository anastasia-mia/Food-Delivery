import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IUserLogin, IUserRegister} from "../interfaces/userInterfaces.ts";
import axios from "axios";

interface AuthState {
    user: string | null,
    isLoggedIn: boolean,
    loading: boolean,
    error: string | null,
}

const initialState: AuthState = {
    user: null,
    isLoggedIn: false,
    loading: false,
    error: null,
}

export const loginUser = createAsyncThunk(
    "auth/login",
    async ({email, password}: IUserLogin, thunkAPI) => {
        try {
            const response = await axios.post('http://localhost:3001/api/login', {email, password},
                {withCredentials: true});
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
            await axios.post('http://localhost:3001/api/register',
                {name, email, password, confirmPassword},
                {withCredentials: true});
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
    async() => {
        const response = await axios.get('http://localhost:3001/api/checkSession',
            {withCredentials: true});
        return response.data;
    }
)

export const logoutUser = createAsyncThunk(
    'auth/logout',
    async() => {
        const response = await axios.post('http://localhost:3001/api/logout', {},
            {withCredentials: true});
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
                state.isLoggedIn = action.payload.isLoggedIn;
            })
            .addCase(checkSession.fulfilled, (state, action) => {
                state.isLoggedIn = action.payload.isLoggedIn;
                state.user = action.payload.user.name;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.user = null;
                state.isLoggedIn = false;
            })
            .addMatcher(
                (action) => action.type.endsWith('/pending'),
                (state) => {
                    state.loading = true;
                    state.error = null;
                }
            )
            .addMatcher(
                (action) => action.type.endsWith('/rejected'),
                (state, action: PayloadAction<{message: string | null}>) => {
                    state.loading = false;
                    state.error = action.payload.message;
                    state.user = null;
                    state.isLoggedIn = false;
                }
            );
    }
})

export const {resetError} = authSlice.actions;
export default authSlice.reducer;
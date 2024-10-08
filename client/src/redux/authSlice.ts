import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IUserLogin} from "../interfaces/userInterfaces.ts";
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
            return response.data.user;
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

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.isLoggedIn = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.fulfilled, (state, action) => {
                state.user = action.payload.user.name;
                state.isLoggedIn = true;
            })
            .addCase(checkSession.fulfilled, (state, action) => {
                state.isLoggedIn = action.payload.isLoggedIn;
                state.user = action.payload.user.name;
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
                (state, action: PayloadAction<{message: string}>) => {
                    state.loading = false;
                    state.error = action.payload.message;
                }
            );
    }
})

export const {logout} = authSlice.actions;
export default authSlice.reducer;
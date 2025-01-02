import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";
import {IRestaurant} from "../interfaces/restaurantInterfaces.ts";
import {RootState} from "./store.ts";

export const fetchRestaurantId = createAsyncThunk<number, {name: string}>(
    "currentRestaurant/fetchRestaurantId",
    async ({name}, thunkAPI) => {
        try {
            const response = await axios.get(`http://localhost:3001/api/restaurants/name/${name}`,
                {withCredentials: true}
            );
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

export const fetchRestaurant = createAsyncThunk<IRestaurant, void, { state: RootState }>(
    "currentRestaurant/fetchRestaurant",
    async (_, thunkAPI) => {
        try {
            const state = thunkAPI.getState();
            const id = state.currentRestaurant.id;
            const response = await axios.get(`http://localhost:3001/api/restaurants/id/${id}`,
                {withCredentials: true}
            );
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

interface IInitialState{
    loading: boolean,
    error: null | string,
    id: number | null
    restaurant: IRestaurant
}

const initialState: IInitialState = {
    loading: false,
    error: null,
    id: null,
    restaurant: {
        id: 0,
        name: '',
        delivery_price_from: 0,
        delivery_price_to: 0,
        delivery_time_from: 0,
        delivery_time_to: 0,
        ranking: 0,
        type: ''
    }
}

const currentRestaurantSlice = createSlice({
    name: 'currentRestaurant',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchRestaurantId.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.id = action.payload;
            })
            .addCase(fetchRestaurant.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                state.restaurant = action.payload;
            })
            .addMatcher(
                (action) => action.type.endsWith('/pending'),
                (state) => {
                    state.loading = true;
                    state.error = null;
                }
            )
            .addMatcher((action) => action.type.endsWith('/rejected'),
                (state, action: PayloadAction<{message: string}>) => {
                    state.loading = false;
                    state.id = null;
                    state.restaurant = initialState.restaurant;
                    state.error = action.payload.message;
                })
    }
});

export default currentRestaurantSlice.reducer;
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IRestaurantObject} from "../interfaces/restaurantInterfaces.ts";

interface Restaurant {
    restaurantAddress: string,
    restaurant_id: number,
    restaurantName: string
}

const initialState: Restaurant = {
    restaurantAddress: '',
    restaurant_id: 0,
    restaurantName: ''
}

const chosenRestaurantSlice = createSlice({
    name: 'chosenRestaurant',
    initialState,
    reducers: {
        addRestaurantAddress: (state, action: PayloadAction<string>) => {
            state.restaurantAddress = action.payload
        },
        setRestaurant: (state, action: PayloadAction<IRestaurantObject>) => {
            state.restaurant_id = action.payload.restaurant_id;
            state.restaurantName = action.payload.restaurantName;
        },
        resetRestaurant: () => {
            return { ...initialState };
        }
    }
})

export const {addRestaurantAddress, setRestaurant, resetRestaurant} = chosenRestaurantSlice.actions;
export default chosenRestaurantSlice.reducer;
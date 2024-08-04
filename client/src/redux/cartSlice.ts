import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {CartItem, IRestaurantObject} from "../models/interfaces/interfaces.ts";

interface Cart{
    menuItems: CartItem[];
    restaurant: IRestaurantObject
}

const initialState: Cart = {
    menuItems: [],
    restaurant: {restaurant_id: 0, restaurantName: ''}
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action: PayloadAction<CartItem>) => {
            const existingItem = state.menuItems.find(item => item.id === action.payload.id);
            if (existingItem) {
                existingItem.quantity +=1;
            }else{
                state.menuItems.push(action.payload);
            }
        },
        increaseQuantity: (state, action: PayloadAction<number>) => {
            const existingItem = state.menuItems.find(item => item.id === action.payload);
            if (existingItem) {
                existingItem.quantity += 1;
            }
        },
        decreaseQuantity: (state, action: PayloadAction<number>) => {
            const existingItem = state.menuItems.find(item => item.id === action.payload);
            if (existingItem && existingItem.quantity > 1) {
                existingItem.quantity -= 1;
            }else{
                state.menuItems = state.menuItems.filter(item => item.id !== action.payload);
            }
        },
        setRestaurant: (state, action: PayloadAction<{ restaurant_id: number, restaurantName: string}>) => {
            state.restaurant = action.payload;
        }
    },
});

export const {addItem, increaseQuantity, decreaseQuantity, setRestaurant} = cartSlice.actions;
export default cartSlice.reducer;
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {CartItem} from "../models/interfaces/interfaces.ts";

interface Cart{
    menuItems: CartItem[];
}

const initialState: Cart = {
    menuItems: [],
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
        removeItem: (state, action: PayloadAction<number>) => {
            state.menuItems = state.menuItems.filter(item => item.id === action.payload);
        }
    },
});

export const {addItem, removeItem} = cartSlice.actions;
export default cartSlice.reducer;
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {CartItem} from "../interfaces/interfaces.ts";

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
        }
    },
});

export const {addItem, increaseQuantity, decreaseQuantity} = cartSlice.actions;
export default cartSlice.reducer;
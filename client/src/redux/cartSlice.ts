import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ICartItem} from "../interfaces/cartInterfaces.ts";

interface Cart{
    menuItems: ICartItem[];
    highlightedCart: boolean;
}

const initialState: Cart = {
    menuItems: [],
    highlightedCart: false
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action: PayloadAction<ICartItem>) => {
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
        removeAllItems: (state) => {
            state.menuItems = [];
        },
        toggleHighlightCart: (state, action) => {
            state.highlightedCart = action.payload
        }
    },
});

export const {addItem, increaseQuantity, decreaseQuantity, removeAllItems, toggleHighlightCart} = cartSlice.actions;
export default cartSlice.reducer;
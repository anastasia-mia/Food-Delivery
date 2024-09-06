import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface IState {
    price: number;
    distance: number;
}

const initialState: IState = {
    price: 0,
    distance: 0
}

const deliveryPriceSlice = createSlice({
    name: "deliveryPrice",
    initialState,
    reducers: {
        setDistance: (state, action: PayloadAction<number>) => {
            state.distance = action.payload;
            if (action.payload <= 2) {
                state.price = 1.5;
            }else if(action.payload <= 3 && action.payload > 2) {
                state.price = 2.80;
            }else{
                state.price = 4;
            }
        }
    }
})

export const {setDistance} = deliveryPriceSlice.actions;
export default deliveryPriceSlice.reducer;
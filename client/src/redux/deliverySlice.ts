import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface IState {
    price: number;
    distance: number;
    time: number;
}

const initialState: IState = {
    price: 0,
    distance: 0,
    time: 0,
}

const deliverySlice = createSlice({
    name: "delivery",
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
        },
        setTime: (state, action: PayloadAction<number>) => {
            state.time = action.payload;
        }
    }
})

export const {setDistance, setTime} = deliverySlice.actions;
export default deliverySlice.reducer;
import {createSlice} from "@reduxjs/toolkit";

const popUpsDisplayingSlice = createSlice({
    name: "popUpDisplaying",
    initialState: {
        isLoginPopUpDisplayed: false,
        isLocationPopUpDisplayed: false,
        isBurgerMenuDisplayed: false,
        isCartDisplayed: false
    },
    reducers: {
        setIsLoginPopDisplayed: (state, action) => {
            state.isLoginPopUpDisplayed = action.payload;
        },
        setIsLocationPopUpDisplayed: (state, action) => {
            state.isLocationPopUpDisplayed = action.payload;
        },
        setIsBurgerMenuDisplayed: (state, action) => {
            state.isBurgerMenuDisplayed = action.payload;
        },
        setIsCartDisplayed: (state, action) => {
            state.isCartDisplayed = action.payload;
        }
    },
})

export const {
    setIsLoginPopDisplayed,
    setIsLocationPopUpDisplayed,
    setIsBurgerMenuDisplayed,
    setIsCartDisplayed
} = popUpsDisplayingSlice.actions;
export default popUpsDisplayingSlice.reducer;
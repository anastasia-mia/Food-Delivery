import {createSlice} from "@reduxjs/toolkit";

const popUpsDisplayingSlice = createSlice({
    name: "popUpDisplaying",
    initialState: {
        isLoginPopUpDisplayed: false,
        isLocationPopUpDisplayed: false,
        isBurgerMenuDisplayed: false
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
        }
    },
})

export const {
    setIsLoginPopDisplayed,
    setIsLocationPopUpDisplayed,
    setIsBurgerMenuDisplayed
} = popUpsDisplayingSlice.actions;
export default popUpsDisplayingSlice.reducer;
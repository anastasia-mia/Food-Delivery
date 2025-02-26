import {createSlice} from "@reduxjs/toolkit";

const popUpsDisplayingSlice = createSlice({
    name: "popUpDisplaying",
    initialState: {
        isLoginPopUpDisplayed: false,
        isRegisterPopUpDisplayed: false,
        isLocationPopUpDisplayed: false,
        isBurgerMenuDisplayed: false,
        isCartDisplayed: false,
        isChatDisplayed: false,
        isAdminBurgerMenuDisplayed: false
    },
    reducers: {
        setIsLoginPopDisplayed: (state, action) => {
            state.isLoginPopUpDisplayed = action.payload;
        },
        setIsRegisterPopDisplayed: (state, action) => {
            state.isRegisterPopUpDisplayed = action.payload;
        },
        setIsLocationPopUpDisplayed: (state, action) => {
            state.isLocationPopUpDisplayed = action.payload;
        },
        setIsBurgerMenuDisplayed: (state, action) => {
            state.isBurgerMenuDisplayed = action.payload;
        },
        setIsCartDisplayed: (state, action) => {
            state.isCartDisplayed = action.payload;
        },
        setIsChatDisplayed: (state, action) => {
            state.isChatDisplayed = action.payload;
        },
        setIsAdminBurgerMenuDisplayed: (state, action) => {
            state.isAdminBurgerMenuDisplayed = action.payload;
        }
    },
})

export const {
    setIsLoginPopDisplayed,
    setIsRegisterPopDisplayed,
    setIsLocationPopUpDisplayed,
    setIsBurgerMenuDisplayed,
    setIsCartDisplayed,
    setIsChatDisplayed,
    setIsAdminBurgerMenuDisplayed
} = popUpsDisplayingSlice.actions;
export default popUpsDisplayingSlice.reducer;
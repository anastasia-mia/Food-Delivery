import {createSlice} from "@reduxjs/toolkit";

const popUpsDisplayingSlice = createSlice({
    name: "popUpDisplaying",
    initialState: {
        isLoginPopUpDisplayed: false,
        isLocationPopUpDisplayed: false
    },
    reducers: {
        setIsLoginPopDisplayed: (state, action) => {
            state.isLoginPopUpDisplayed = action.payload;
        },
        setIsLocationPopUpDisplayed: (state, action) => {
            state.isLocationPopUpDisplayed = action.payload;
        },
    },
})

export const { setIsLoginPopDisplayed, setIsLocationPopUpDisplayed } = popUpsDisplayingSlice.actions;
export default popUpsDisplayingSlice.reducer;
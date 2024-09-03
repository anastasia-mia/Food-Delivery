import {createSlice} from "@reduxjs/toolkit";

const locationPopUpSlice = createSlice({
    name: "locationPopUp",
    initialState: {
        isPopupOpen: false,
    },
    reducers: {
        openPopup: (state) => {
            state.isPopupOpen = true;
        },
        closePopup: (state) => {
            state.isPopupOpen = false;
        },
    },
})

export const { openPopup, closePopup } = locationPopUpSlice.actions;
export default locationPopUpSlice.reducer;
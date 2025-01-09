import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    text: '',
    buttonText: '',
    link: '',
    isDisplayedModal: false
}

const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        setIsDisplayedModal: (state, action) => {
            state.isDisplayedModal = action.payload;
        },
        setModalInformation: (state, action) => {
            state.text = action.payload.text;
            state.buttonText = action.payload.buttonText;
            state.link = action.payload.link;
        }
    }
})

export const {setIsDisplayedModal, setModalInformation} = modalSlice.actions;
export default modalSlice.reducer;
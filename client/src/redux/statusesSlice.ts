import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axiosInstance from "../../axiosConfig.ts";

export const fetchStatuses = createAsyncThunk(
    'statuses/getStatuses',
    async() => {
        try{
            const response = await axiosInstance.get('/getAllStatuses');
            return response.data;
        }catch(err){
            console.log(err);
        }
    }
)

interface IStatuses{
    id: number,
    name: string
}

const initialState: IStatuses[]  = [];

const statusesSlice = createSlice({
    name: 'statuses',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchStatuses.fulfilled, (_, action: PayloadAction<IStatuses[]>) => {
                return action.payload;
            })
    }
})

export default statusesSlice.reducer;
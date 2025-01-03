import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import axios from "axios";

export const fetchStatuses = createAsyncThunk(
    'statuses/getStatuses',
    async() => {
        try{
            const response = await axios.get('http://localhost:3001/api/getAllStatuses', {withCredentials: true});
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
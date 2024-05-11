import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { customFetch } from "../../utils";
import { logoutUser } from "./userSlice";
import { toast } from "react-toastify";

const initialState = {
    defaultStats : null,
    monthlyApplications : [],
    isLoading : false
};

const statSlice = createSlice({
    name : 'stats',
    initialState,
    reducers : {

    },
    extraReducers : (builder) => {
        builder.addCase(getStats.pending, (state) => {
            state.isLoading = true;
        }).addCase(getStats.fulfilled, (state, {payload}) => {
            return {isLoading:false, ...payload};
        }).addCase(getStats.rejected, (state, {payload}) => {
            state.isLoading = false;
            toast.error(payload);
        })
    }

});

export const getStats = createAsyncThunk(
    'stats/getStats',
    async (_, thunkAPI) => {

        try {

            const resp = await customFetch('/jobs/stats', {
                headers : {
                    authorization : `Bearer ${thunkAPI.getState().user.user.token}`
                }
            });
            return resp.data;
            
        } catch (error) {
            if (error.response.status === 401) {
                thunkAPI.dispatch(logoutUser());
                return thunkAPI.rejectWithValue("Unauthorized user, logging out..");
            }
            return thunkAPI.rejectWithValue(error.response.data.msg);
        }

    }
);

export default statSlice.reducer;

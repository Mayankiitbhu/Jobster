import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { customFetch } from '../../utils';
import { logoutUser } from './userSlice';
import { toast } from 'react-toastify';

const initialState = {
    isLoading : false,
    jobs : [],
    totalJobs : 0,
    numOfPages : 0,
    sortOptions : ['latest', 'oldest', 'a-z', 'z-a'],
    sort : 'latest',
    search : '',
    searchStatus : 'all',
    searchType : 'all',
    pageNumber : 1
};


const allJobSlice = createSlice({
    name : 'allJobs',
    initialState,
    reducers : {
        handleChange : (state, { payload : { name, value }}) => {
            state[name] = value;
        },
        clearValues : () => {
            return initialState;
        }
    },
    extraReducers : (builder) => {
        builder.addCase(getJobs.fulfilled,(state, action) => {
            const {jobs, totalJobs, numOfPages} = action.payload;
                state.isLoading = false;
                state.jobs = jobs;
                state.numOfPages = numOfPages;
                state.totalJobs = totalJobs;
            }
        ).addCase(getJobs.rejected, (state, action) => {
            state.isLoading = false;
            toast.error(action.payload);
        }).addCase(getJobs.pending, (state) => {
            state.isLoading = true;
        }).addCase(deleteJob.pending, (state) => {
            state.isLoading = true;
        }).addCase(deleteJob.rejected, (state, action) => {
            state.isLoading = false;
            toast.error(action.payload);
        })
    }

});


export const getJobs = createAsyncThunk(
    'jobs/getJobs',
    async (_, thunkAPI) => {
        const { search, pageNumber, sort, searchStatus, searchType } = thunkAPI.getState().allJobs;
        try {
            let url = `/jobs?status=${searchStatus}&jobType=${searchType}&sort=${sort}&page=${pageNumber}`;
            if(search) {
                console.log(search);
                url = url + `&search=${search}`;
            }
            const response = await customFetch(url, {
                headers : {
                    authorization : `Bearer ${thunkAPI.getState().user.user.token}`
                }
            });
            return response.data;
        } catch (error) {
            if (error.response.status === 401) {
                thunkAPI.dispatch(logoutUser());
                return thunkAPI.rejectWithValue("Unauthorized user, logging out..");
            }
            return thunkAPI.rejectWithValue(error.response.data.msg);
        }
    }
);

export const deleteJob = createAsyncThunk(
    'allJobs/deleteJob',
    async (jobId, thunkAPI) => {
        try {
            const resp = await customFetch.delete(`/jobs/${jobId}`, {
                headers : {
                    authorization : `Bearer ${thunkAPI.getState().user.user.token}`
                }
            });
            thunkAPI.dispatch(getJobs());
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

export const { handleChange, clearValues } = allJobSlice.actions;
export default allJobSlice.reducer;
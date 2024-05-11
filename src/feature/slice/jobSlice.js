import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { customFetch } from '../../utils';
import { logoutUser } from './userSlice';
import { toast } from 'react-toastify';


const initialState = {
    isLoading : false,
    jobTypeOptions: ['full-time', 'part-time', 'remote', 'internship'],
    statusOptions: ['interview', 'declined', 'pending'],
    status : 'pending',
    jobType : 'full-time',
    jobLocation : '',
    position : '',
    company : '',
    isEditing : false,
    editJobId : ''

};

const jobSlice = createSlice({
    name : 'jobs',
    initialState,
    reducers : {
        handleChange : (state, action) => {
            const { name, value } = action.payload;
            state[name] = value;
        },
        clearValues : (state) => {
            return initialState;
        },
        setEditFields : (state, { payload }) => {
            return {...state, isEditing : true, ...payload};
        }
    },
    extraReducers : (builder) => {
        builder.addCase(addJob.fulfilled,(state, action) => {
            state.isLoading = false;
            toast.success('Job created');
        }
        ).addCase(addJob.rejected, (state, action) => {
            state.isLoading = false;
            toast.error(action.payload);
        }).addCase(addJob.pending, (state) => {
            state.isLoading = true;
        }).addCase(editJob.fulfilled,(state) => {
            state.isLoading = false;
            toast.success('Job modified');
        }
        ).addCase(editJob.rejected, (state, action) => {
            state.isLoading = false;
            toast.error(action.payload);
        }).addCase(editJob.pending, (state) => {
            state.isLoading = true;
        })
    }
});



export const addJob = createAsyncThunk(
    'jobs/addJob',
    async (job, thunkAPI) => {
        try {
            const response = await customFetch.post('/jobs', job, {
                headers : {
                    authorization : `Bearer ${thunkAPI.getState().user.user.token}`
                }
            });
            thunkAPI.dispatch(clearValues());
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

export const editJob = createAsyncThunk(
    'jobs/editJob',
    async ({ jobId, job }, thunkAPI) => {
        try {
            console.log(jobId + " during call");
            const resp = await customFetch.patch(`/jobs/${jobId}`, job, {
                headers : {
                    authorization : `Bearer ${thunkAPI.getState().user.user.token}`
                }
            });
            thunkAPI.dispatch(clearValues());
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

export const { handleChange, clearValues, setEditFields } = jobSlice.actions;
export default jobSlice.reducer;
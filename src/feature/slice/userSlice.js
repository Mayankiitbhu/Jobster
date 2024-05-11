import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { customFetch } from '../../utils';
import { toast } from 'react-toastify';
import { addUserToLocalStorage, getUserFromLocalStorage, removeUserFromLocalStorage } from '../../utils/localStorage';

const initialState = {
    isLoading: false,
    user: getUserFromLocalStorage(),
  };

const userSlice = createSlice({
    name : 'user',
    initialState,
    reducers : {
        logoutUser : state => {
            removeUserFromLocalStorage();
            state.user = null;
            toast.success('Successfully logged out!');
        }
    },
    extraReducers(builder) {
        builder.addCase(login.pending, (state, action) => {
            state.isLoading = true;
        }).addCase(login.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = action.payload.user;
            addUserToLocalStorage(action.payload.user);
            toast.success(`Hello again ${state.user.name}!`);

        }).addCase(login.rejected, (state, action) => {
            state.isLoading = false;
            toast.error(action.payload);
        }).addCase(register.pending, (state, action) => {
            state.isLoading = true;
        }).addCase(register.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = action.payload.user;
            addUserToLocalStorage(action.payload.user);
            toast.success(`Hello ${state.user.name}!`);
        }).addCase(register.rejected, (state, action) => {
            state.isLoading = false;
            toast.error(action.payload);
        }).addCase(update.pending, (state, action) => {
            state.isLoading = true;
        }).addCase(update.fulfilled, (state, action) => {
            state.isLoading = false;
            state.user = action.payload.user;
            addUserToLocalStorage(action.payload.user);
            toast.success(`Updated details for user ${state.user.name}!`);
        }).addCase(update.rejected, (state, action) => {
            state.isLoading = false;
            toast.error(action.payload);
        })
    }
});

export const register = createAsyncThunk(
    'user/register',
    async (user, thunkAPI) => {
        try {
            const response = await customFetch.post('/auth/register', user);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.msg);
        }
    }
);

export const login = createAsyncThunk(
    'user/login',
    async (user, thunkAPI) => {
        try {
            const response = await customFetch.post('/auth/login', user);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.msg);
        }
    }
);

export const update = createAsyncThunk(
    'user/update',
    async (user, thunkAPI) => {
        try {
            const response = await customFetch.patch('/auth/updateUser', user, {
                headers : {
                    authorization : `Bearer ${thunkAPI.getState().user.user.token}`
                }
            });
            return response.data;
        } catch(err) {
            return thunkAPI.rejectWithValue(err.response.data.msg);
        }
    }
);

export const userSelector = store => store.user;
export const { logoutUser} = userSlice.actions;
export default userSlice.reducer;
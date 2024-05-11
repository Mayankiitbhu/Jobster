import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slice/userSlice';
import jobReducer from './slice/jobSlice'
import allJobsReducer from './slice/allJobSlice';
import statsReducer from './slice/statSlice';

const store = configureStore({
    reducer: {
        user : userReducer,
        jobs : jobReducer,
        allJobs : allJobsReducer,
        stats : statsReducer
    }
});

export default store;
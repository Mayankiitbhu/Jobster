import React from 'react';
import { useSelector } from 'react-redux';
import { userSelector } from '../feature/slice/userSlice';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const { user } = useSelector(userSelector);
    if (!user) {
        return <Navigate to='/landing' />;
    } 
    return children;
}

export default ProtectedRoute;
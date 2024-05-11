import React from 'react';
import { BigSidebar, NavBar, SmallSidebar } from '../components';
import Wrapper from '../assets/wrappers/SharedLayout';
import { Outlet } from 'react-router-dom';
import { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import { userSelector } from '../feature/slice/userSlice';
import { useNavigate, redirect } from 'react-router-dom';

const SharedLayout = () => {
    const [showSidebar, toggleShowSidebar] = useState(true);
    const { user } = useSelector(userSelector);
    const navigate = useNavigate();
    useEffect(() => {
        if (!user) {
            redirect('/login');
        } 
    }, [user, navigate]);

  return (
    <Wrapper>
        <div className="dashboard">
            <BigSidebar isSidebarOpen={showSidebar}/>
            <SmallSidebar isSidebarOpen={!showSidebar} toggleSidebar={() => toggleShowSidebar(!showSidebar)}/>
            <div>
                <NavBar toggleShowSidebar={() => toggleShowSidebar(!showSidebar)} />
                <div className="dashboard-page">
                    <Outlet />
                </div>
            </div>
        </div>
        
    </Wrapper>
  )
}

export default SharedLayout;
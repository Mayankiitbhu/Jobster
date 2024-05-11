import React from "react";
import Wrapper from "../assets/wrappers/Navbar";
import { Logo } from "../components";
import { VscThreeBars } from "react-icons/vsc";
import { MdArrowDropDown } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { useState } from "react";
import { logoutUser } from "../feature/slice/userSlice";
import { useDispatch } from 'react-redux';

const NavBar = ({toggleShowSidebar}) => {
  const [dropDown, toggleDropDown] = useState(false);
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(logoutUser());
  };

  return (
    <Wrapper>
      <div className="nav-center">
        <button className="toggle-btn" onClick={toggleShowSidebar}>
          <VscThreeBars />
        </button>
        <div>
          <Logo />
          <h3 className="logo-text">Dashboard</h3>
        </div>
        <div className="btn-container">
          <button className="btn" onClick={() => toggleDropDown(!dropDown)}>
            <CgProfile />
            Test User
            <MdArrowDropDown />
          </button>
          <div className={`dropdown ${dropDown ? "show-dropdown" : null}`}>
            <button className="dropdown-btn" onClick={logoutHandler}>Logout</button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default NavBar;

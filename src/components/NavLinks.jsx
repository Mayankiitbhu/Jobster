import React from 'react';
import links from "../utils/links";
import { NavLink } from "react-router-dom";

const NavLinks = ({toggleSidebar}) => {
  return (
    <div className="nav-links">
            {links.map((link) => (
              <NavLink
                key={link.key}
                to={link.path}
                onClick={toggleSidebar}
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                <div className="icon">{link.icon}</div>
                <div>{link.text}</div>
              </NavLink>
            ))}
          </div>
  )
}

export default NavLinks;
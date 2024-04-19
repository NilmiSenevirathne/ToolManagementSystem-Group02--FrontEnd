// Sidebar.jsx
import React, { useState } from 'react';
import { FaTh, FaBars, FaCartPlus, FaBriefcase, FaSearch, FaNewspaper } from 'react-icons/fa';
import { RiLogoutCircleRLine } from "react-icons/ri";
import { NavLink } from 'react-router-dom';

const Sidebar = ({ children }) => {
  const [isOpen,setIsOpen] = useState(false);
  const toggle = () => setIsOpen (!isOpen);
  
  //menuitem of the sidebar
  const menuItem = [
    {
      path: "/stocksupervisordashboard",
      name: "Dashboard",
      icon: <FaTh />
    },
    {
      path: "/managestock",
      name: "ManageStock",
      icon: <FaCartPlus />
    },
    {
      path: "/createtoolbox",
      name: "CreateToolBox",
      icon: <FaBriefcase />
    },
    {
      path: "/tracktoolbox",
      name: "TrackToolBox",
      icon: <FaSearch />
    },
    {
      path: "/reports",
      name: "Reports",
      icon: <FaNewspaper />
    },
    {
      path: "/",
      name: "Logout",
      icon: <RiLogoutCircleRLine />
    }
  ];

  return (
    <div className='container'>
      <div className='sidebar'>
        <div className='companylogo'>
          <h1  className='logo'>Dilum BMK Engineers (Pvt) Ltd</h1>
           
        </div>
        
        {
          menuItem.map((item, index) => (
            <NavLink to={item.path} key={index} className="link" activeClassName="active">
              <div className="icon">{item.icon}</div>
              <div className="link_text">{item.name}</div>
            </NavLink>
          ))
        }
      </div>
      <main>{children}</main>
    </div>
  );
}

export default Sidebar;

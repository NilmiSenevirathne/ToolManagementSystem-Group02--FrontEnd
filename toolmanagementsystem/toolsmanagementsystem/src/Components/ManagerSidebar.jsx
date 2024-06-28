import React, { useState } from 'react';
import { FaTh, FaBars, FaCartPlus, FaBriefcase, FaSearch, FaNewspaper } from 'react-icons/fa';
import { RiLogoutCircleRLine } from "react-icons/ri";
import { NavLink } from 'react-router-dom';
import userpic from '../images/user1.jpg';
import './ManagerSidebar.css';

// Sidebar component which includes navigation menu and a container for children components
const Sidebar = ({ children }) => {
  const [isOpen,setIsOpen] = useState(false);
  const toggle = () => setIsOpen (!isOpen);

  const role = "Manager"
  
  // Array of menu items for the sidebar
  const menuItem = [
    {
      path: "/managerdashboard",
      name: "Managerdashboard",
      icon: <FaTh />
    },
    {
      path: "/manageprojects",
      name: "Manageprojects",
      icon: <FaCartPlus />
    },
    {
      path: "/ViewInventory",
      name: "View Inventory",
      icon: <FaBriefcase />
    },
    {
      path: "/ViewLocations",
      name: "View Locations",
      icon: <FaSearch />
    },
    {
      path: "/",
      name: "Logout",
      icon: <RiLogoutCircleRLine />
    }
  ];

  return (
    <div className='container'>
      <div className='sidebar'>{/* Sidebar section */}
        <div className='companylogo'>{/* Company logo and user details section */}
          <h1  className='logo'>Dilum BMK Engineers (Pvt) Ltd</h1>
          <div className='details'>
              <img className="user" src={userpic}/>{/* User image */}
              <h3 className='name'>Mr.Dilum Samaranayake</h3>{/* User name */}
              <h2 className='role'>{role}</h2>{/* User role */}
          </div>
        </div>

        {/* Menu items mapping */}
        {
          menuItem.map((item, index) => (
            <NavLink to={item.path} key={index} className="link" activeClassName="active">
              <div className="icon">{item.icon}</div>{/* Menu item icon */}
              <div className="text">{item.name}</div>{/* Menu item text */}
            </NavLink>
          ))
        }
      </div>
      <main>{children}</main>{/* Main container to render children components */}
    </div>
  );
}

export default Sidebar;

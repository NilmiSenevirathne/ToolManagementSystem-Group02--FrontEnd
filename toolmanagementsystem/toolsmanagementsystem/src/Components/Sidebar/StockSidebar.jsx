// Sidebar.jsx
import React, { useState } from 'react';
import { FaTh, FaBars, FaCartPlus, FaBriefcase, FaSearch, FaNewspaper } from 'react-icons/fa';
import { RiLogoutCircleRLine } from "react-icons/ri";
import { NavLink } from 'react-router-dom';
import userpic from '../../images/user1.jpg';
import './sidebar.css';


const StockSidebar = ({ children }) => {
  const [isOpen,setIsOpen] = useState(false);
  const toggle = () => setIsOpen (!isOpen);

  const role = "StockSupervisor"
  
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
      path: "/maintoolbox",
      name: "ToolBox",
      icon: <FaBriefcase />
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
          <h1  className='logo'>Dilum BMK Engineers</h1>

          <div className='details'>
             {/* Wrap userpic with NavLink */}
             <NavLink to="/profile" className="userpic-link">
            <img className="user" src={userpic} alt="User Profile" />
             </NavLink>
            
              
              <h2 className='role'>{role}</h2>
          </div>
           
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

export default StockSidebar;

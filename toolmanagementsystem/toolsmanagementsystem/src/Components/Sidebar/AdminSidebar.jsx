
// Sidebar.jsx
import React, { useState } from 'react';
import { FaTh, FaCartPlus, FaBriefcase, FaNewspaper } from 'react-icons/fa';
import { RiLogoutCircleRLine } from "react-icons/ri";
import { NavLink } from 'react-router-dom';
import userpic from '../../images/user1.jpg';
import './adminsidebar.css';

const AdminSidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false); // State for sidebar toggle
  const toggle = () => setIsOpen(!isOpen); // Toggle function for sidebar

  const role = "Admin"; // Example user role
  const userName = "Mr. Nimantha Dissanayake"; // Example user name

  // Sidebar menu items
  const menuItems = [
    {
      path: "/admindashboard",
      name: "Dashboard",
      icon: <FaTh />
    },
    {
      path: "/manageusers",
      name: "Manage Users",
      icon: <FaCartPlus /> // Example icon
    },
    {
      path: "/adduser",
      name: "Add User",
      icon: <FaBriefcase />
    },
   
    {
      path: "/",
      name: "Logout",
      icon: <RiLogoutCircleRLine />,
      onClick: () => { 
        localStorage.removeItem("authToken"); // Example of logout logic
        window.location.href = "/"; // Redirect to the login page
      } 
    }
  ];

  return (
    <div className={`container ${isOpen ? 'open' : ''}`}>
      <div className="sidebar">
        {/* Logo and user information */}
        <div className="company-logo">
          <h1 className="logo">Dilum BMK Engineers (Pvt) Ltd</h1>

          <div className="details">
            <img className="user" src={userpic} alt="User Profile" />
            <h3 className="name">{userName}</h3>
            <h2 className="role">{role}</h2>
          </div>
        </div>

        {/* Sidebar menu items */}
        {menuItems.map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            className="link"
            activeClassName="active"
            onClick={item.onClick} // If defined, use onClick for actions like logout
          >
            <div className="icon">{item.icon}</div>
            <div className="link-text">{item.name}</div>
          </NavLink>
        ))}
      </div>
      <main>{children}</main> {/* Render child components */}
    </div>
  );
};

export default AdminSidebar;

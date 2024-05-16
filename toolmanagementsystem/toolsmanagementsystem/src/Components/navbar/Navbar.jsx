import React from 'react';
import { NavLink } from 'react-router-dom';
import Brand from '../../images/BMKLogo.jpg'; // Adjust the path if necessary
import './navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container">
        <div className="logo">
          <img src={Brand} alt="Logo" />
         
        </div>

        <div className="nav-elements">
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/blog">Blog</NavLink>
            </li>
            <li>
              <NavLink to="/projects">Projects</NavLink>
            </li>
            <li>
              <NavLink to="/about">About Us</NavLink>
            </li>
            <li>
              <NavLink to="/contact">Contact</NavLink>
            </li>

            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

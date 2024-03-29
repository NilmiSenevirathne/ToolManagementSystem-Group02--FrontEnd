import React, { useState } from 'react'
import './Sidebar.css'
import ProImg from '../../images/profile.jpg';

import {
       FaTh,
       FaCartPlus,
        FaBriefcase ,
        FaSearch,
        FaNewspaper
} from 'react-icons/fa';
import { RiLogoutCircleRLine } from "react-icons/ri";
import { useLocation } from 'react-router-dom';


const Sidebar =({Children}) =>{
      

 return (
    <div className='menu'>
        <div className='menu-list'>

          <div className='prof'>
            <img className='img' src={ProImg} alt=""/>
            <h3 className='username'>Nilmi Ama</h3>
            <span className='role'>Stock Supervisor</span>
          </div>

        <div className='ContentContainer'>
          <ul>
              <li>
                
                <a href='/'  className='item'><FaTh className='icon'/>Dashboard</a>
              </li>

              <li>
                
                <a href='/managestock' className='item'><FaCartPlus className='icon' />ManageStock</a>
              </li>

              <li>
                
                 <a href='/createtoolbox' className='item'> <FaBriefcase className='icon'/>CreateToolBox</a>
              </li>

              <li>
                
                 <a href='/tracktoolbox' className='item'><FaSearch className='icon'/>TrackToolBox</a>
              </li>

              <li>
                 
                 <a href='/reports' className='item'><FaNewspaper className='icon'/>Reports</a>
              </li>

              <li>
                 <a href='#' className='item'><RiLogoutCircleRLine  className='icon'/> Logout</a>
              </li>

          </ul>
        </div>  
        </div>
       
         
    </div>
  )
}

export default Sidebar;

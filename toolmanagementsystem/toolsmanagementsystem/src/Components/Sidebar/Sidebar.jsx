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
import {Link} from "react-router-dom"


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
          
              
              
                <Link to='/Dasboard'  className='item'><FaTh className='icon'/>Dashboard</Link>

              
                <Link to='/managestock' className='item'><FaCartPlus className='icon' /><span>ManageStock</span></Link>

              
                <Link to='/createtoolbox' className='item'><FaBriefcase className='icon'/><span>CreateToolBox </span></Link>

              
                <Link to='/tracktoolbox' className='item'><FaSearch className='icon'/><span>TrackToolBox </span></Link>

              
                <Link to='/reports' className='item'><FaNewspaper className='icon'/><span>Reports </span></Link>
                <Link to='#' className='item'><RiLogoutCircleRLine  className='icon'/> Logout</Link>
             
        </div>  
        </div>
       
         
    </div>
  )
}

export default Sidebar;

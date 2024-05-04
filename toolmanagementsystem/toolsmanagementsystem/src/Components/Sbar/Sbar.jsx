//stock supervisor sidebar
import "./sbar.css"
import DashboardIcon from '@mui/icons-material/Dashboard';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AssessmentIcon from '@mui/icons-material/Assessment';
import ScannerIcon from '@mui/icons-material/Scanner';
import { NavLink } from "react-router-dom";
import { useState } from "react";
import DashBoard from "../../pages/Dashboard/DashBoard";
import {Link} from "react-router-dom"
import Profile from "../../images/profile.avif";


const Sbar = () => {
  
  
  return (
    
    <div className="sidebar">
      <div className="top">
       
      <span className="logo">ADMIN</span>
     
      </div>
      <hr />
     
      <div className="center">
      <img 
          src={Profile} 
          alt="" 
          className="profile"/>
       <ul>
       <Link to="/" style={{textDecoration:"none"}}>
        <li>
        <DashboardIcon/><span>Dashboard</span> </li></Link>
        <Link to="/UserReg" style={{textDecoration:"none"}}>
        <li><AssignmentIcon/><span>User Registration</span></li></Link>
        <Link to="/UserManage" style={{textDecoration:"none"}}>
        <li><AssessmentIcon/><span>User Manage</span></li></Link>
       
       </ul>
      </div>
      <div className="bottom">
       
      </div>
    </div>
  )
}

export default Sbar

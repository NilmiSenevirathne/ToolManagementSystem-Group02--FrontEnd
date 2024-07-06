import "./sbar.css";
import profimg from "../images/user1.jpg";
import Profile from "../images/logo.jpg";
import { Link } from "react-router-dom";

import DashboardIcon from '@mui/icons-material/Dashboard';
import AssessmentIcon from '@mui/icons-material/Assessment';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const Sbar = () => {
  return (
    <div className="sidebar">
      <div className="top">
        <div className="logo">
          <img src={Profile} alt=""/>
          <span>Dilum BMK Engineers</span>
        </div>
        <img src={profimg} alt="" className="profimg"/>
        
        <span>Site Supervisor</span>
      </div>
      <div className="center">
        <ul>
          <Link to="/" style={{textDecoration:"none"}}>
            <li><DashboardIcon/><span>Dashboard</span></li>
          </Link>
          <Link to="/CreateReports" style={{textDecoration:"none"}}>
            <li><AssessmentIcon/> <span>Create Reports</span></li>
          </Link>
          <Link to="/LoginForm" style={{textDecoration:"none"}}>
            <li><ExitToAppIcon/> <span>Logout</span></li>
          </Link>
        </ul>
      </div>
    </div>
  );

 
      
  

}

export default Sbar;

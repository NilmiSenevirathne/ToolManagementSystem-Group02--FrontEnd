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
          <Link to="/ViewToolStatusReports" style={{textDecoration:"none"}}>
            <li><AssessmentIcon/> <span>View Tool Status Reports</span></li>
          </Link>
          <Link to="/ViewRequiredToolReports" style={{textDecoration:"none"}}>
            <li><AssessmentIcon/> <span>View Required Tool Reports</span></li>
          </Link>
          <Link to="/ToolstatosRep" style={{textDecoration:"none"}}>
            <li><AssessmentIcon/> <span>Create Tool Status Reports</span></li>
          </Link>

         <Link to="/RequiredToolReport" style={{textDecoration:"none"}}>
            <li><AssessmentIcon/> <span>Create Required Tool Reports</span></li>
          </Link>

          <Link to="/AddToolStatus" style={{textDecoration:"none"}}>
            <li><AssessmentIcon/> <span>Add Tool Status Reports</span></li>
          </Link>

          <Link to="/AddReportDetails" style={{textDecoration:"none"}}>
            <li><AssessmentIcon/> <span>Add Required Tool Reports</span></li>
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

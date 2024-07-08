import React from 'react';
import "./sbar.css";
import profimg from "../images/user1.jpg";
import Profile from "../images/logo.jpg";
import { Link } from "react-router-dom";
import DashboardIcon from '@mui/icons-material/Dashboard';
import AssessmentIcon from '@mui/icons-material/Assessment';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const Sbar = () => {
  return (
    <div className="sbar-container">
      <div className="sbar-top">
        <div className="sbar-logo">
          <img src={Profile} alt="Company Logo" />
          <span>Dilum BMK Engineers</span>
        </div>
        <img src={profimg} alt="Profile" className="sbar-profimg" />
        <span className="sbar-role">Site Supervisor</span>
      </div>
      <div className="sbar-center">
        <ul className="sbar-menu">
          <Link to="/" className="sbar-link">
            <li className="sbar-menu-item"><DashboardIcon /><span>Dashboard</span></li>
          </Link>
          <Link to="/ViewToolStatusReports" className="sbar-link">
            <li className="sbar-menu-item"><AssessmentIcon /><span>View Tool Status Reports</span></li>
          </Link>
          <Link to="/ViewRequiredToolReports" className="sbar-link">
            <li className="sbar-menu-item"><AssessmentIcon /><span>View Required Tool Reports</span></li>
          </Link>
          <Link to="/ToolstatosRep" className="sbar-link">
            <li className="sbar-menu-item"><AssessmentIcon /><span>Create Tool Status Reports</span></li>
          </Link>
          <Link to="/RequiredToolReport" className="sbar-link">
            <li className="sbar-menu-item"><AssessmentIcon /><span>Create Required Tool Reports</span></li>
          </Link>
          <Link to="/AddToolStatus" className="sbar-link">
            <li className="sbar-menu-item"><AssessmentIcon /><span>Add Tool Status Reports</span></li>
          </Link>
          <Link to="/AddReportDetails" className="sbar-link">
            <li className="sbar-menu-item"><AssessmentIcon /><span>Add Required Tool Reports</span></li>
          </Link>
          <Link to="/LoginForm" className="sbar-link">
            <li className="sbar-menu-item"><ExitToAppIcon /><span>Logout</span></li>
          </Link>
        </ul>
      </div>
    </div>
  );
}

export default Sbar;

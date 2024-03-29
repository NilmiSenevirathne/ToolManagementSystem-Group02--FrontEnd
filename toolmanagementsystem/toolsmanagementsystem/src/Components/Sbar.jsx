import "./sbar.css"

import Profile from"../images/profilepicsite.webp"
import {Link} from "react-router-dom"
import DashboardIcon from '@mui/icons-material/Dashboard';
import AssessmentIcon from '@mui/icons-material/Assessment';
const Sbar = () => {
  return (
    <div className="sidebar">
      <div className="top">
     
      <span className="logo">Site Supervisor</span>
      
      </div>
      
    <br/>
<div className="center">

      <ul>
      <Link to="/" style={{textDecoration:"none"}}>
      <li><DashboardIcon/><span>Dashboard</span></li>
        </Link>
        <Link to="/CreateReports" style={{textDecoration:"none"}}>
          <li><AssessmentIcon/> <span>Create Reports</span></li>
        </Link>
      </ul>
 </div>
 </div>
      
  )
}

export default Sbar

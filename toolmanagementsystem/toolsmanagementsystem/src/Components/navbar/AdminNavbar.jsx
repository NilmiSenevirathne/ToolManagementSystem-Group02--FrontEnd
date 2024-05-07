
import "./adminnavbar.css"
import user from "../../images/user1.jpg"
import SearchIcon from '@mui/icons-material/Search';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import NotificationsIcon from '@mui/icons-material/Notifications';

const AdminNavbr = () => {
  return (
    <div className="topbarContainer">
    <div className="topbarLeft">
     
    </div>
    
      
    
    <div className="topbarRight">
    
      <div className="topbarIcons">
        <div className="topbarIconItem">
          <MailOutlineIcon />
          <span className="topbarIconBadge">1</span>
        </div>
        <div className="topbarIconItem">
          <NotificationsIcon />
          <span className="topbarIconBadge">2</span>
        </div>
       
      </div>
      <img src={user} alt="" className="topbarImg"/>
    </div>
  </div>
     
        
      
   
  )
}

export default AdminNavbr

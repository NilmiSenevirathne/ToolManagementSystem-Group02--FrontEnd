import "./navbar.css"
import user from "../../images/user1.jpg"
import SearchIcon from '@mui/icons-material/Search';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import NotificationsIcon from '@mui/icons-material/Notifications';

const Navbr = () => {
  return (
    <div className="topbarContainer">
    <div className="topbarLeft">
     
    </div>
    <div className="topbarCenter">
      <div className="searchbar">
        <SearchIcon className="searchIcon" />
        <input
          placeholder="Search"
          className="searchInput"
        />
      </div>
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

export default Navbr

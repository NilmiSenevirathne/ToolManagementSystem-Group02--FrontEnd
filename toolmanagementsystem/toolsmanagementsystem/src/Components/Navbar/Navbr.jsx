import React, { useEffect, useState } from 'react';
import './navbar.css';
import SearchIcon from '@mui/icons-material/Search';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useNavigate } from 'react-router-dom';

const Navbr = () => {
  const [user, setUser] = useState({ name: '', profilePhoto: '' });
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user data from local storage or an API
    const loggedUser = JSON.parse(localStorage.getItem('user'));
    if (loggedUser) {
      setUser(loggedUser);
    } else {
      // Handle user not logged in, redirect to login page
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <SearchIcon />
      </div>
      
        <div className="topbarUser">
          <img src={user.profilePhoto} alt="User" className="topbarImg" />
          <span className="topbarUserName">{user.name}</span>
        </div>
      </div>
    
  );
};

export default Navbr;

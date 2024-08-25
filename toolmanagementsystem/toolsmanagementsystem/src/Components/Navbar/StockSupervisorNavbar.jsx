import React, { useEffect } from 'react';
import { AppBar, Toolbar, Typography, Avatar, IconButton, Menu, MenuItem } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../actions/userActions';

const StockSupervisorNavbar = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin || {};
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);

  

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfileClick = () => {
    navigate('/profile');
    handleMenuClose();
  };

  
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Welcome, {userInfo}!
        </Typography>
        <IconButton onClick={handleMenuOpen}>
          <Avatar alt="Profile Picture" src={userInfo?.profilePictureUrl || '/default-profile.jpg'} />
          <ArrowDropDownIcon />
        </IconButton>
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
          <MenuItem onClick={handleProfileClick}>Profile</MenuItem>
          
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default StockSupervisorNavbar;

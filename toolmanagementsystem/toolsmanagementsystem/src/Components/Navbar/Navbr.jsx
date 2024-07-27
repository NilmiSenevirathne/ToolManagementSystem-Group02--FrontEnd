import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Avatar, IconButton, Menu, MenuItem, Box } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import profile from '../../images/profile.jpg';
import { useNavigate } from 'react-router-dom';

const Navbr = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const user = {
    firstname: 'Kusal',
    lastname: 'Senarathne',
    avatar: profile
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
    
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfileClick = () => {
    navigate('/SiteSupervisorProfile');
    handleMenuClose();
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
         Site Supervisor
        </Typography>
        
        {user.firstname && (
          <Box display="flex" alignItems="center">
            <Typography variant="body1" component="span" sx={{ marginRight: 1 }}>
              {user.firstname}
            </Typography>
            <IconButton color="inherit" onClick={handleMenuOpen}>
              <Avatar alt="Profile Image" src={user.avatar} />
              <ArrowDropDownIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleProfileClick}>Profile</MenuItem>
             
            </Menu>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbr;

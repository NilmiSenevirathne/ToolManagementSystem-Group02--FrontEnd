import React, { useState, useEffect } from 'react';
import { IconButton, Box, Avatar, AppBar, Toolbar, Typography, Button, Menu, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Navbar = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(JSON.parse(localStorage.getItem('userInfo')) || {});
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/authentication/getUserDetails/${userInfo.id}`); // Fetch user details using userInfo.id
        setUserInfo(response.data);
        localStorage.setItem('userInfo', JSON.stringify(response.data)); // Update localStorage
      } catch (error) {
        console.error('Failed to fetch user info:', error);
      }
    };

    if (userInfo.id) {
      fetchUserInfo();
    }
  }, [userInfo.id]);

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    navigate('/');
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Welcome, {userInfo.role || 'Guest'}!
        </Typography>

        <Avatar src={userInfo.userimageData || ''} />
         
        <Box sx={{ display: 'flex', alignItems: 'center' }} gap={2}>
          

          <Typography
            variant="h6"
            component="div"
            sx={{ ml: 2, cursor: 'pointer' }}
            onClick={handleMenuOpen}
          >
            {userInfo.firstname || 'Guest'}
          </Typography>


          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={() => { navigate(`/profile/${userInfo.firstname}`); handleMenuClose(); }}>
              Profile
            </MenuItem>
          </Menu>

          <Button
            onClick={handleLogout}
            sx={{ backgroundColor: 'red', color: 'white', '&:hover': { backgroundColor: 'darkred' } }}
          >
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

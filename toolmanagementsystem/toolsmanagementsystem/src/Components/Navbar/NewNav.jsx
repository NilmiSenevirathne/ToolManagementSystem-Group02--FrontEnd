import React from 'react';
import { IconButton, Box, Avatar, AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem('userInfo')) || {}; // Fetch userInfo from localStorage

  const handleLogout = () => {
    // Remove userInfo from localStorage and navigate to the login page
    localStorage.removeItem('userInfo');
    navigate('/');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Welcome, {userInfo.role || 'Guest'}!
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {/* Profile picture icon */}
          <IconButton sx={{ ml: 2 }} onClick={() => navigate('/profile')}>
            <Avatar src={userInfo.userimagedata || ''} /> {/* Replace with your default profile picture path */}
          </IconButton>

          <Typography variant="h6" component="div" sx={{ ml: 2 }}>
            Mr. {userInfo.firstname || 'Guest'}
          </Typography>

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

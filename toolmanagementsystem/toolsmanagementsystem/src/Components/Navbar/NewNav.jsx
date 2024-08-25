import React from 'react';
import { IconButton, Box, Avatar,AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem('userInfo')) || {}; // Fetch userInfo from localStorage

  const handleLogout = () => {
    // Dispatch logout action and redirect to login page
    localStorage.removeItem('userInfo');
    // Replace with your logout action if needed
    navigate('/');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Welcome, {userInfo.role || 'Guest'} !
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
        

          {/* Profile picture icon */}
          <IconButton sx={{ ml: 2 }} onClick={() => navigate('/profile')}>
            <Avatar
              alt={userInfo.name || 'User'}
              src={userInfo.userimagedata || '/static/images/avatar/1.jpg'} // Replace with your default profile picture path
            />
          </IconButton>

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

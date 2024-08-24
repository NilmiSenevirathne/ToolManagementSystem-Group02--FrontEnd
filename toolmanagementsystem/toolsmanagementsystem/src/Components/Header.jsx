import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Logo from '../images/BMKLogo.jpg';

function Header() {
  return (
    <AppBar position="static" sx={{ width: '1560px' }}>
      <Toolbar>
       
        <img src={Logo} alt="Company Logo" style={{ height: '70px', marginRight: '10px' }} />

        {/* Company Name */}
        <Typography variant="h2" component="div" sx={{ flexGrow: 1 }}>
          Dilum BMK Engineers (Pvt) Ltd.
        </Typography>

        {/* Navigation Links */}
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button color="inherit" href="#about">About</Button>
          <Button color="inherit" href="#services">Services</Button>
          <Button color="inherit" href="#contact">Contact</Button>
        </Box>

        {/* Login button on the right */}
        <Button color="small" href="#login">Login</Button>
      </Toolbar>
    </AppBar>
  );
}

export default Header;

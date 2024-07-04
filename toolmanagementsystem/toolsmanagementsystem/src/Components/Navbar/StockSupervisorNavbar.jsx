import React from 'react'
import { AppBar, Toolbar, Typography, Avatar, IconButton } from '@mui/material';
import profile from '../../images/profile.jpg';


const StockSuperviorNavbar = () => {
  return (
    
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
           Welcome Stock Supervisor Dashboard !
        </Typography>
        <IconButton color="inherit">
          <Avatar alt="Profile Image" src={profile} />
        </IconButton>
      </Toolbar>
    </AppBar>

  )
}

export default StockSuperviorNavbar;

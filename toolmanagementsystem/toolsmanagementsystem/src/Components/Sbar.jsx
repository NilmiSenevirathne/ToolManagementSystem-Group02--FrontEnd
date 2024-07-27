import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Drawer, List, ListItem, ListItemText, ListItemIcon, Typography, Box, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AssessmentIcon from '@mui/icons-material/Assessment';
import AddBoxIcon from '@mui/icons-material/AddBox';
import StorageIcon from '@mui/icons-material/Storage';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import profimg from "../images/user1.jpg";
import Profile from "../images/logo.jpg";

const Sbar = () => {

  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const handleToggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Box sx={{ display: 'flex', position: 'relative' }}>
      <Drawer
        variant="permanent"
        sx={{
          width: collapsed ? 60 : 80,
          flexShrink: 0,
          whiteSpace: 'nowrap',
          '& .MuiDrawer-paper': {
            width: collapsed ? 60 : 320,
            transition: 'width 0.3s',
            backgroundColor: "#131842",
            boxSizing: 'border-box',
            overflowX: 'hidden',
            boxShadow: '0px 6px 15px rgb(39, 39, 159)',
          },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px 0', flexDirection: 'column' }}>
          <img src={Profile} alt="Company Logo" style={{ width: 50, height: 50, objectFit: 'cover', marginBottom: 10 }} />
          {!collapsed && (
            <>
              <Typography variant="h6" sx={{ color: 'white', textAlign: 'center' }}>
                Dilum BMK Engineers
              </Typography>
             
            </>
          )}
        </Box>

        <List>
          {[
            { text: 'Dashboard', icon: <DashboardIcon />, path: '/sitesupervisor' },
           
            { text: 'View Required Tool Reports', icon: <AssessmentIcon />, path: '/ViewRequiredToolReports' },
            { text: 'View Tool Status Reports', icon: <AssessmentIcon />, path: '/ViewToolStatusReports' },
            { text: 'View Projects', icon: <AssessmentIcon />, path: '/ViewProjects' },
            { text: 'Create Tool Status Reports', icon: <AddBoxIcon />, path: '/ToolstatosRep' },
            { text: 'Create Required Tool Reports', icon: <AddBoxIcon />, path: '/RequiredToolReport' },
            { text: 'Add Tool Status Reports', icon: <StorageIcon />, path: '/AddToolStatus' },
            { text: 'Add Required Tool Reports', icon: <StorageIcon />, path: '/AddReportDetails' },
            { text: 'Logout', icon: <ExitToAppIcon />, path: '/' },
          ].map((item, index) => (
            <ListItem 
              button 
              key={index} 
              onClick={() => navigate(item.path)} 
              sx={{ 
                my: 1, 
                mx: 2, 
                borderRadius: 2, 
                '&:hover': { backgroundColor: 'rgb(38, 196, 244)' }, 
                transition: 'background-color 0.3s ease-in-out',
                flexDirection: collapsed ? 'column' : 'row', 
                alignItems: 'center',
              }}
            >
              <ListItemIcon sx={{ color: 'white' }}>
                {item.icon}
              </ListItemIcon>
              {!collapsed && (
                <ListItemText primary={item.text} sx={{ color: 'white', ml: -2}} />
              )}
            </ListItem>
          ))}
        </List>
      </Drawer>

      <IconButton
        color="white"
        aria-label="open drawer"
        onClick={handleToggleSidebar}
        edge="start"
        sx={{
          position: 'absolute',
          top: 16,
          left: collapsed ? 20: 25,
          transition: 'left 0.3s',
          zIndex: 1300,
        }}
      >
        <MenuIcon />
      </IconButton>
    </Box>
  );
};

export default Sbar;

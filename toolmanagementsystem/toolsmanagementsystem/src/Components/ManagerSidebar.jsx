import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemText, ListItemIcon, Typography, Box, IconButton } from '@mui/material';
import { FaTh, FaCartPlus, FaBriefcase, FaNewspaper } from 'react-icons/fa';
import { RiLogoutCircleRLine } from 'react-icons/ri';
import companyLogo from '../images/BMKLogo.jpg';
import MenuIcon from '@mui/icons-material/Menu';

const StockSidebar = () => {
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
          width: collapsed ? 80 : 240,
          flexShrink: 0,
          whiteSpace: 'nowrap',
          '& .MuiDrawer-paper': {
            width: collapsed ? 60 : 240,
            transition: 'width 0.3s',
            backgroundColor: "#131842",
            boxSizing: 'border-box',
            overflowX: 'hidden', // Ensure contents don't overflow when collapsed
          },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px 0' }}>
          <img src={companyLogo} alt="Company Logo" style={{ width: 40, height: 40, marginRight: 8 }} />
          {!collapsed && (
            <Typography variant="h6" sx={{ color: 'white' }}>
              Dilum BMK Engineers
            </Typography>
          )}
        </Box>

        <List>
          {[
            { text: 'Managerdashboard', icon: <FaTh />, path: '/ManagerDashboard' },
            { text: 'Manage Projects', icon: <FaCartPlus />, path: '/ManageProjects' },
            { text: 'Location Details', icon: <FaBriefcase />, path: '/locationHome' },
            { text: 'Tools Stock Details', icon: <FaNewspaper />, path: '/Toolstockdetails' },
            { text: 'Tool Box', icon: <FaNewspaper />, path: '/ViewToolBoxDetails' },
            { text: 'Logout', icon: <RiLogoutCircleRLine />, path: '/' },
          ].map((item, index) => (
            <ListItem button key={index} onClick={() => navigate(item.path)} sx={{ my: 2 }}>
              <ListItemIcon sx={{ color: 'white' }}>{item.icon}</ListItemIcon>
              {!collapsed && (
                <ListItemText primary={item.text} sx={{ color: 'white' }} />
              )}
            </ListItem>
          ))}
        </List>
      </Drawer>

      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={handleToggleSidebar}
        edge="start"
        sx={{
          position: 'absolute',
          top: 16,
          left: collapsed ? 16 : 256, // Adjust position based on the collapsed state
          transition: 'left 0.3s',
          zIndex: 1300 // Ensures the button is above other elements
        }}
      >
        <MenuIcon />
      </IconButton>
    </Box>
  );
};

export default StockSidebar;

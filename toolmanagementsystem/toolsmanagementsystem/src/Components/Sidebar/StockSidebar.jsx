import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemText, ListItemIcon, Typography, Box, IconButton } from '@mui/material';
import { FaTh, FaCartPlus, FaBriefcase, FaNewspaper } from 'react-icons/fa';
import { RiLogoutCircleRLine } from 'react-icons/ri';
import companyLogo from '../../images/BMKLogo.jpg';
import MenuIcon from '@mui/icons-material/Menu';
import axios from 'axios';

const StockSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  // Handle the toggle button
  const handleToggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  // Logout function
  const handleLogout = () => {
    axios.post('/authentication/logout')
      .then(response => {
        localStorage.removeItem('stocksupervisor');
        navigate('/', { replace: true });
        window.location.reload();
      })
      .catch(error => {
        console.error("Logout failed", error);
      });
  };

  const menuItems = [
    { text: 'Dashboard', icon: <FaTh />, path: '/stocksupervisordashboard' },
    { text: 'Manage Stock', icon: <FaCartPlus />, path: '/managestock' },
    { text: 'ToolBox', icon: <FaBriefcase />, path: '/maintoolbox' },
    { text: 'Reports', icon: <FaNewspaper />, path: '/reports' },
    { text: 'Logout', icon: <RiLogoutCircleRLine />, action: handleLogout, path: '/' },
  ];

  return (
    <Box sx={{ display: 'flex', position: 'relative' }}>
      <Drawer
        variant="permanent"
        sx={{
          width: collapsed ? 60 : 240,
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
          {menuItems.map((item, index) => (
            <ListItem
              button
              key={index}
              onClick={() => {
                if (item.action) {
                  item.action();
                } else {
                  navigate(item.path);
                }
              }}
              sx={{
                my: 1,
                mx: 2,
                borderRadius: 1,
                '&:hover': { backgroundColor: 'rgb(38, 196, 244)' },
                transition: 'background-color 0.3s ease-in-out',
                flexDirection: collapsed ? 'column' : 'row',
                alignItems: 'center',
                backgroundColor: location.pathname === item.path ? 'rgba(38, 196, 244, 0.2)' : 'transparent', // Highlight active tab
              }}
            >
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
          left: collapsed ? 16 : 256,
          transition: 'left 0.3s',
          zIndex: 1300
        }}
      >
        <MenuIcon />
      </IconButton>
    </Box>
  );
};

export default StockSidebar;

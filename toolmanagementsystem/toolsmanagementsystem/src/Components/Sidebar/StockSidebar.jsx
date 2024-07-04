import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemText, ListItemIcon, Typography,Box } from '@mui/material';
import { FaTh, FaCartPlus, FaBriefcase, FaNewspaper } from 'react-icons/fa';
import { RiLogoutCircleRLine } from 'react-icons/ri';
import companyLogo from '../../images/BMKLogo.jpg';


const StockSidebar = () => {
  const navigate = useNavigate();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          backgroundColor:"#131842",
          
          boxSizing: 'border-box',
        },
      }}
    >
    
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px 0' }}>
        <img src={companyLogo} alt="Company Logo" style={{ width: 40, height: 40, marginRight: 8 }} />
        <Typography variant="h6" sx={{ color: 'white' }}>
          Dilum BMK Engineers
        </Typography>
      </Box>


      <List>
        {[
          { text: 'Dashboard', icon: <FaTh />, path: '/stocksupervisordashboard' },
          { text: 'Manage Stock', icon: <FaCartPlus />, path: '/managestock' },
          { text: 'ToolBox', icon: <FaBriefcase />, path: '/maintoolbox' },
          { text: 'Reports', icon: <FaNewspaper />, path: '/reports' },
          { text: 'Logout', icon: <RiLogoutCircleRLine />, path: '/' },

        ].map((item, index) => (
          <ListItem button key={index} onClick={() => navigate(item.path)}>
            <ListItemIcon sx={{ color: 'white' }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} sx={{ color: 'white' }} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default StockSidebar;

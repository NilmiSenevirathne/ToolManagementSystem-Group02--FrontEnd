import React, { useState, useEffect } from 'react';
import { CssBaseline, Grid, Box, Typography } from '@mui/material';
import axios from 'axios';
import ManagerNavbar from '../../../Components/Navbar/ManagerNavbar.jsx';
import ManagerSidebar from '../../../Components/ManagerSidebar.jsx';

import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer
} from 'recharts';

const StockSupervisorDashboard = () => {
  
  const [toolInventoryData, setToolInventoryData] = useState([]);
  
  useEffect(() => {
    axios.get('http://localhost:8080/tool/toolInventory')
      .then(response => {
        setToolInventoryData(response.data);
      })
      .catch(error => {
        console.error('Error fetching tool inventory data:', error);
      });
  }, []);

  return (
    <Grid container>
      <CssBaseline />
      <Grid item>
        <ManagerSidebar />
      </Grid>
      <Grid item xs>
        <ManagerNavbar />
        <Box className="dboard-chartContainer">
          <Typography variant="h4" className="dboard-chartTitle">Tool Inventory</Typography>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              data={toolInventoryData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              barSize={50}
            >
              <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
              <XAxis dataKey="toolName" />
              <YAxis />
              <Tooltip 
                contentStyle={{ backgroundColor: '#333', border: 'none' }} 
                itemStyle={{ color: '#fff' }} 
              />
              <Legend wrapperStyle={{ color: 'white' }} />
              <Bar 
                dataKey="quantity" 
                fill="url(#colorUv)" 
                animationBegin={800} 
                animationDuration={1200} 
                isAnimationActive={true}
              />
              <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#38c4f4" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#38c4f4" stopOpacity={0} />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </Grid>
    </Grid>
  );
};

export default StockSupervisorDashboard;
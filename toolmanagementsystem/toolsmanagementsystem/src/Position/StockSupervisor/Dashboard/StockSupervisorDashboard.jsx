import React, { useState, useEffect } from 'react';
import { CssBaseline, Grid, Box, Typography } from '@mui/material';
import axios from 'axios';
import StockSidebar from '../../../Components/Sidebar/StockSidebar';
import StockSupervisorNavbar from '../../../Components/Navbar/StockSupervisorNavbar.jsx';
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
        <StockSidebar />
      </Grid>
      <Grid item xs>
        <StockSupervisorNavbar />
        <Box className="dboard-chartContainer">
          <Typography variant="h4" className="dboard-chartTitle">Tool Inventory</Typography>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              data={toolInventoryData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
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
                fill="#38c4f4" 
                barSize={40}
                animationBegin={800} 
                animationDuration={1200} 
                isAnimationActive={true}
              />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </Grid>
    </Grid>
  );
};

export default StockSupervisorDashboard;

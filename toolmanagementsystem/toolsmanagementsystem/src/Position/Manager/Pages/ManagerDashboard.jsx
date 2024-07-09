import React from 'react';
import { CssBaseline, Grid, Box, Typography } from '@mui/material';
import { Pie, Line } from 'react-chartjs-2';
import ManagerSidebar from '../../../Components/ManagerSidebar.jsx';
// import StockSidebar from '../../../Components/Sidebar/StockSidebar';
import ManagerNavbar from '../../../Components/Navbar/ManagerNavbar.jsx';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, Title);

const ManagerDashboard = () => {
  const pieData = {
    labels: ['Allocated_Tools', 'Available_Tools'],
    datasets: [
      {
        label: '',
        data: [100, 67,],
        backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)'],
        borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)'],
        borderWidth: 1,
      },
    ],
  };

  const lineData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Tools',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
      },
    ],
  };

  return (
    <Grid container>
      <CssBaseline />
      <Grid item>
        <ManagerSidebar />
      </Grid>
      <Grid item xs>
        <ManagerNavbar />
        <Box sx={{ p: 3 }}>
          
          {/* Pie chart */}
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Box sx={{ p: 3, border: '1px solid #ccc', borderRadius: '8px' }}>
                
                <Pie data={pieData} />
              </Box>
            </Grid>

            {/* Line chart */}
            <Grid item xs={12} md={6}>
              <Box sx={{ p: 3, border: '1px solid #ccc', borderRadius: '8px' }}>
                <Typography variant="h6" gutterBottom>
                  Tools Variation of the Year
                </Typography>
                <Line data={lineData} />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  );
};

export default ManagerDashboard;

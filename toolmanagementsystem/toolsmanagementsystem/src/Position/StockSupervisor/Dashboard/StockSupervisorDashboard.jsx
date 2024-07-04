import React from 'react';
import { CssBaseline, Grid } from '@mui/material';
import StockSidebar from '../../../Components/Sidebar/StockSidebar';
import StockSuperviorNavbar from '../../../Components/Navbar/StockSupervisorNavbar.jsx';
import { PieChart } from '@mui/x-charts/PieChart';

const StockSupervisorDashboard = () => {
  return (
    <Grid container>
      <CssBaseline />
      <Grid item>
        <StockSidebar />
      </Grid>

      <Grid item xs>
        <StockSuperviorNavbar />
      </Grid>

      <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <PieChart
          series={[
            {
              data: [
                { id: 0, value: 10, label: 'series A' },
                { id: 1, value: 15, label: 'series B' },
                { id: 2, value: 20, label: 'series C' },
              ],
            },
          ]}
          width={400}
          height={200}
        />
      </Grid>
    </Grid>
  );
};

export default StockSupervisorDashboard;

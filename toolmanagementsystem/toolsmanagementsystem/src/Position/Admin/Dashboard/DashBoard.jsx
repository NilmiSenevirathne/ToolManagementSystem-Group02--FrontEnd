import React, { useEffect, useState } from "react";
import { CssBaseline, Grid, Box, Typography } from '@mui/material';
import AdminSidebar from '../../../Components/Sidebar/AdminSidebar.jsx';
import AdminNavbar from '../../../Components/Navbar/Adminnavbar.jsx';
import axios from 'axios';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer
} from 'recharts';

const DashBoard = () => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/authentication/getUsertoolbox')
      .then(response => {
        setUserData(response.data);
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }, []);

  return (
    <Grid container>
      <CssBaseline />
      <Grid item>
        <AdminSidebar />
      </Grid>

      <Grid item xs>
        <AdminNavbar />

        <Box className="dboard-chartContainer">
          <Typography variant="h4" className="dboard-chartTitle">Users</Typography>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              data={userData} // Use the state variable here
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              barSize={50}
            >
              <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
              <XAxis dataKey="user" />
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

export default DashBoard;

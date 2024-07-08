import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sbar from "../../../Components/Sbar";
import StockSupervisorNavbar from '../../../Components/Navbar/StockSupervisorNavbar';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer
} from 'recharts';

import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material';
import './dboard.css';
import Navbr from '../../../Components/Navbar/Navbar';

const Dboard = () => {
  const [toolInventoryData, setToolInventoryData] = useState([]);
  const [toolLocations, setToolLocations] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/tool/toolInventory')
      .then(response => {
        setToolInventoryData(response.data);
      })
      .catch(error => {
        console.error('Error fetching tool inventory data:', error);
      });
  }, []);

  const fetchToolLocation = (toolId) => {
    axios.get(`http://localhost:8080/locationTrack/tool/${toolId}`)
      .then(response => {
        setToolLocations(response.data);
      })
      .catch(error => {
        console.error('Error fetching tool location data:', error);
      });
  };

  return (
    <div>
      <Navbr/>
    
    <Box display="flex" className='dboard-container'>
      
      <Sbar />
      <Box flexGrow={1} className='dboard-homeContainer'>
        <Box className="dboard-chartContainer">
          <Typography variant="h4" className="dboard-chartTitle">Tool Inventory</Typography>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              data={toolInventoryData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              barSize={50}
            >
              <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
              <XAxis dataKey="toolName"  />
              <YAxis  />
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

        <Box className="tool-location-container">
          <Typography variant="h4" className="dboard-chartTitle">Tool Locations</Typography>
          <TableContainer component={Paper}>
            <Table className="tool-location-table">
              <TableHead>
                <TableRow>
                  <TableCell>Tool Id</TableCell>
                  <TableCell>Tool Name</TableCell>
                  <TableCell>Location</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {toolInventoryData.map(tool => (
                  <TableRow key={tool.toolId}>
                    <TableCell>{tool.toolId}</TableCell>
                    <TableCell>{tool.toolName}</TableCell>
                    <TableCell>
                      {toolLocations
                        .filter(locationTrack => locationTrack.tool.toolId === tool.toolId)
                        .map(locationTrack => locationTrack.location.locationName)
                        .join(', ')}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => fetchToolLocation(tool.toolId)}
                      >
                        Show Location
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Box>
    </div>
  );
};

export default Dboard;

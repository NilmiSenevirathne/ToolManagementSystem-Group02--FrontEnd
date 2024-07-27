import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; // Import Leaflet CSS
import Sbar from "../../../Components/Sbar";
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
  Paper,
  Modal,
  TextField
} from '@mui/material';
import './dboard.css';
import Navbr from '../../../Components/Navbar/Navbr';
import { margin } from '@mui/system';

const Dboard = () => {
  const [toolInventoryData, setToolInventoryData] = useState([]);
  const [selectedToolLocations, setSelectedToolLocations] = useState([]);
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [tools, setTools] = useState([]);

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
    axios.get(`http://localhost:8080/${toolId}/locations`)
      .then(response => {
        setSelectedToolLocations(response.data);
        setOpen(true);
      })
      .catch(error => {
        console.error('Error fetching tool location data:', error);
      });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const filteredTools = Array.isArray(tools)
    ? tools.filter((tool) =>
        tool.toolId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.toolName.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];
  return (
    <div>
      <Navbr />
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

          <Box className="tool-location-container">
            <Typography variant="h4" className="dboard-chartTitle">Tool Locations</Typography>
            <TableContainer component={Paper}>
              <Table className="tool-location-table">
                <TableHead>
                  <TableRow>
                    <TableCell>Tool Id</TableCell>
                    <TableCell>Tool Name</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {toolInventoryData.map(tool => (
                    <TableRow key={tool.toolId}>
                      <TableCell>{tool.toolId}</TableCell>
                      <TableCell>{tool.toolName}</TableCell>
                      
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

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          
          <Box className="modal-style">
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Tool Locations
           
            </Typography>
            <TextField
            label="Search tools using tool id or tool name"
            variant="outlined"
            fullWidth
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ ml: 1 }}
          />
            
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Location Name</TableCell>
                    <TableCell>Latitude</TableCell>
                    <TableCell>Longitude</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {selectedToolLocations.map(location => (
                    <TableRow key={location.locationId}>
                      <TableCell>{location.locationName}</TableCell>
                      <TableCell>{location.latitude}</TableCell>
                      <TableCell>{location.longitude}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <Box style={{ height: "400px", width: "50%", margin: '100px' }}>
              <MapContainer
                center={[selectedToolLocations[0]?.latitude || 0, selectedToolLocations[0]?.longitude || 0]}
                zoom={13}
                style={{ height: "100%", width: "100%" }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {selectedToolLocations.map(location => (
                  <Marker
                    key={location.locationId}
                    position={[location.latitude, location.longitude]}
                  >
                    <Popup>{location.locationName}</Popup>
                  </Marker>
                ))}
              </MapContainer>
            </Box>

            <Button onClick={handleClose} variant="contained" color="primary" sx={{ mt: 2 }}>
              Close
            </Button>
          </Box>
        </Modal>
      </Box>
    </div>
  );
};

export default Dboard;

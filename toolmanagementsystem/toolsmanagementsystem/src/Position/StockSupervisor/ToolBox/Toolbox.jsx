import React, { useEffect, useState } from 'react';
import StockSidebar from '../../../Components/Sidebar/StockSidebar.jsx';
import { Link } from 'react-router-dom';
import axios from 'axios';
import NewNav from '../../../Components/Navbar/NewNav.jsx';
import { Grid, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Box } from '@mui/material';

const Toolbox = () => {
  const [tools, setTools] = useState([]);
  const [locations, setLocations] = useState({}); // Store location names

  useEffect(() => {
    loadToolbox();
  }, []);

  // Fetch toolbox details from the backend
  const loadToolbox = async () => {
    try {
      const result = await axios.get('http://localhost:8080/toolbox/gettoolbox');
      
      // Update tool data and fetch location names
      const toolData = result.data;
      const locationIds = toolData.map(tool => tool.location_id);
      
      // Fetch location names for all location_ids
      const locationPromises = locationIds.map(id =>
        axios.get(`http://localhost:8080/locations/${id}`)
      );

      const locationResults = await Promise.all(locationPromises);
      const locationMap = locationResults.reduce((acc, result) => {
        acc[result.data.locationId] = result.data.locationName;
        return acc;
      }, {});
      
      setLocations(locationMap);
      
      const updatedTools = toolData.map(tool => ({
        ...tool,
        allocatedQuantity: tool.quantity - tool.availableQuantity,
        availableQuantity: tool.quantity - tool.allocatedQuantity
      }));
      
      setTools(updatedTools);
    } catch (error) {
      console.error('Error fetching toolbox:', error);
    }
  };

  // Delete tool details from the database
  const deleteTool = async (toolbox_id) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this toolbox?');
    if (!isConfirmed) {
      return;
    }
    try {
      await axios.delete(`http://localhost:8080/toolbox/delete/${toolbox_id}`);
      loadToolbox();
      alert('Toolbox deleted Successfully!');
    } catch (error) {
      alert('Error occurred when deleting the toolbox!');
    }
  };

  return (
    <Grid container>
      <Grid item>
        <StockSidebar />
      </Grid>

      <Grid item xs>
        <NewNav />

        <div style={{ margin: '20px' }}>
          <Typography variant="h4" gutterBottom>Welcome to ToolBox Details Section!</Typography>
          <TableContainer component={Paper} style={{ maxHeight: 400, width: '100%' }}>
            <Table stickyHeader aria-label="Toolbox Table" sx={{ borderCollapse: 'separate', borderSpacing: 0, '& .MuiTableCell-root': { border: '1px solid rgba(224,224,224,1)' }, }}>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', backgroundColor: 'grey', color: 'white' }}>ToolBox ID</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', backgroundColor: 'grey', color: 'white' }}>Project ID</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', backgroundColor: 'grey', color: 'white' }}>Site Supervisor</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', backgroundColor: 'grey', color: 'white' }}>Created Date</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', backgroundColor: 'grey', color: 'white' }}>Location</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', backgroundColor: 'grey', color: 'white' }}>Selected Tools</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', backgroundColor: 'grey', color: 'white' }}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tools.map((tool) => (
                  <TableRow key={tool.toolbox_id}>
                    <TableCell sx={{ textAlign: 'center' }}>{tool.toolbox_id}</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>{tool.project_id}</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>{tool.site_supervisor_id}</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>{tool.createdDate}</TableCell>

                    <TableCell sx={{ textAlign: 'center' }}>
                      <Button
                        variant="contained"
                        color="primary"
                        sx={{ padding: '2px 6px', bgcolor: 'orange', size: 'small' }}
                        onClick={() => {
                          const locationName = locations[tool.location_id] || 'Unknown Location';
                          const googleMapsUrl = `https://www.google.com/maps?q=${encodeURIComponent(locationName)}`;
                          window.open(googleMapsUrl, '_blank');
                        }}
                      >
                        Check Location
                      </Button>
                    </TableCell>

                    <TableCell sx={{ textAlign: 'center' }}>{tool.selectedTools.join(', ')}</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>
                      <Link to={`/editToolbox/${tool.toolbox_id}`}>
                        <Button variant="contained" sx={{ padding: '2px 6px', bgcolor: 'purple', size: 'small' }} style={{ marginRight: '10px' }}>
                          Update
                        </Button>
                      </Link>
                      <Button variant="contained" sx={{ padding: '2px 6px', bgcolor: 'red', size: 'small' }} onClick={() => deleteTool(tool.toolbox_id)}>
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box mt={2} display="flex" justifyContent="center" gap={2}>
            <Link to='/createtoolbox' style={{ textDecoration: 'none' }}>
              <Button variant="contained" color="primary" sx={{ fontSize: '1rem' }}>
                Create ToolBox
              </Button>
            </Link>
          </Box>
        </div>
      </Grid>
    </Grid>
  );
};

export default Toolbox;

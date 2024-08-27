import React, { useEffect, useState } from 'react';
import ManagerSidebar from '../../../Components/ManagerSidebar.jsx';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import ManagerNavbar from '../../../Components/Navbar/ManagerNavbar.jsx';
import { Grid, Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Container } from '@mui/material';

const Toolbox = () => {
  const [toolbox, setToolbox] = useState([]);
  const [tools, setTools] = useState([]);

  useEffect(() => {
    loadToolbox();
  }, []);

  //fetch toolbox details from the backend
  const loadToolbox = async () => {
    try {
      const result = await axios.get('http://localhost:8080/toolbox/gettoolbox');

      // allocatedQuantity and availableQuantity functionalities
      const updatedTools = result.data.map(tool => ({
        ...tool,
        allocatedQuantity: tool.quantity - tool.availableQuantity,
        availableQuantity: tool.quantity - tool.allocatedQuantity
      }));
      setTools(result.data);
      console.log(result.data);
    } catch (error) {
      console.error('Error fetching toolbox:', error);
    }
  };

  // delete tool details from the database
  const deleteTool = async (toolbox_id) => {
    // Added confirmation before deleting
    const isConfirmed = window.confirm('Are you sure you want to delete this toolbox?');
    if (!isConfirmed) {
      return;
    }
    try {
      // Fixed extra slash in URL and used correct toolbox_id property
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
      <ManagerSidebar />
            </Grid>

      <Grid item xs>
      <ManagerNavbar />

        <Container maxWidth="md">
          <Box mt={4}>
            <Typography variant="h4" align="center" gutterBottom>
              Welcome to ToolBox Details Section!
            </Typography>
            <TableContainer component={Paper} style={{ maxHeight: 400 }}>
              <Table stickyHeader aria-label="Toolbox Table" sx={{ borderCollapse: 'separate', borderSpacing: 0, '& .MuiTableCell-root': { border: '1px solid rgba(224,224,224,1)' }, }}>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', backgroundColor: 'grey', color: 'white' }}>ToolBox ID</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', backgroundColor: 'grey', color: 'white' }}>Project ID</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', backgroundColor: 'grey', color: 'white' }}>SiteSupervisor ID</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', backgroundColor: 'grey', color: 'white' }}>Location ID</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', backgroundColor: 'grey', color: 'white' }}>Created Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tools.map((tool, index) => (
                    <TableRow key={tool.toolbox_id}>
                      <TableCell sx={{ textAlign: 'center' }}>{tool.toolbox_id}</TableCell>
                      <TableCell sx={{ textAlign: 'center' }}>{tool.project_id}</TableCell>
                      <TableCell sx={{ textAlign: 'center' }}>{tool.site_supervisor_id}</TableCell>
                      <TableCell sx={{ textAlign: 'center' }}>{tool.location_id}</TableCell>
                      <TableCell sx={{ textAlign: 'center' }}>{tool.createdDate}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Box mt={2} display="flex" justifyContent="center" gap={2}>
              
              <Link to='/ManagerTrackToolBox' style={{ textDecoration: 'none' }}>
                <Button variant="contained" color="secondary" sx={{ fontSize: '1rem' }}>
                   View Tools of tool box
                </Button>
              </Link>
            </Box>
          </Box>
        </Container>
      </Grid>
    </Grid>
  );
};

export default Toolbox;

import React, { useState } from 'react';
import StockSidebar from '../../../../Components/Sidebar/StockSidebar.jsx';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import StockSuperviorNavbar from '../../../../Components/Navbar/StockSupervisorNavbar.jsx';
import {Grid, Container, Box, Typography, TextField, Button, Paper} from '@mui/material';

const STrackToolbox = () => {
  let navigate = useNavigate();

  const [toolbox, setToolbox] = useState({
    toolboxId: ''
  });

  const [toolboxDetails, setToolboxDetails] = useState(null);
  const [error, setError] = useState(null);

  const onInputChange = (e) => {
    setToolbox({ ...toolbox, [e.target.name]: e.target.value });
  };

  const fetchToolboxDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/toolbox/${toolbox.toolboxId}`);
      setToolboxDetails(response.data);
      setError(null);
    } catch (err) {
      setError('Error fetching toolbox details. Please try again.');
      setToolboxDetails(null);
    }
  };

  const onSearchClick = () => {
    if (toolbox.toolboxId) {
      fetchToolboxDetails();
    } else {
      setError('Please enter a toolbox ID.');
    }
  };

  return (
    
    <Grid container>
         <Grid item>
             <StockSidebar/>
         </Grid>
         <Grid item xs>
             <StockSuperviorNavbar/>
             <Container maxWidth="md">
          <Box mt={4}>
            <Typography variant="h4" align="center" gutterBottom>
              Welcome to TrackToolbox Section!
            </Typography>
            <Box display="flex" flexDirection="column" alignItems="center">
              <TextField
                label="Enter the Toolbox ID"
                variant="outlined"
                name="toolboxId"
                value={toolbox.toolboxId}
                onChange={onInputChange}
                fullWidth
                margin="normal"
              />
              <Button variant="contained" color="primary" onClick={onSearchClick}>
                Search
              </Button>
            </Box>
            {error && (
              <Typography color="error" align="center" mt={2}>
                {error}
              </Typography>
            )}
            {toolboxDetails && (
              <Paper elevation={3} sx={{ mt: 4, p: 2 }}>
                <Typography variant="h5" gutterBottom>
                  Toolbox Details
                </Typography>
                <Typography>ID: {toolboxDetails.id}</Typography>
                <Typography>Name: {toolboxDetails.name}</Typography>
                <Typography>Description: {toolboxDetails.description}</Typography>
                {/* Add more fields as necessary */}
              </Paper>
            )}
          </Box>
        </Container>
         </Grid>

    </Grid>
  );
};

export default STrackToolbox;

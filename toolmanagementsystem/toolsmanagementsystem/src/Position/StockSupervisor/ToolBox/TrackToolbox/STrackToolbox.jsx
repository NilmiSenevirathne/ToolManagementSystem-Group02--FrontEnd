import React, { useState, useEffect } from 'react';
import StockSidebar from '../../../../Components/Sidebar/StockSidebar.jsx';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import StockSuperviorNavbar from '../../../../Components/Navbar/StockSupervisorNavbar.jsx';
import { Grid, Container, Box, Typography, Button, Paper, Table, TableHead, TableRow, TableCell, TableBody, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const STrackToolbox = () => {
  let navigate = useNavigate();

  const [toolbox, setToolbox] = useState({
    toolboxId: ''
  });

  const [toolboxDetails, setToolboxDetails] = useState(null);
  const [error, setError] = useState(null);
  const [toolboxIds, setToolboxIds] = useState([]);

  const onInputChange = (e) => {
    setToolbox({ ...toolbox, [e.target.name]: e.target.value });
  };

  const fetchToolboxIds = async () => {
    try {
      const response = await axios.get("http://localhost:8080/toolbox/gettoolbox");
      setToolboxIds(response.data);
    } catch (error) {
      console.error("Error fetching ToolboxId: ", error);
    }
  };

  const fetchToolboxDetails = async () => {
    try {
      const id = toolbox.toolboxId;
      const response = await axios.get(`http://localhost:8080/toolbox/search/${id}`);
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

  useEffect(() => {
    fetchToolboxIds();
  }, []);

  return (
    <Grid container>
      <Grid item>
        <StockSidebar />
      </Grid>
      <Grid item xs>
        <StockSuperviorNavbar />
        <Container maxWidth="md">
          <Box mt={4}>
            <Typography variant="h4" align="center" gutterBottom>
              Welcome to   View Tools of Toolbox Section!
            </Typography>
            <Box display="flex" flexDirection="column" alignItems="center">
              <FormControl fullWidth margin="normal">
                <InputLabel id="toolbox-select-label">Select Toolbox ID</InputLabel>
                <Select
                  labelId="toolbox-select-label"
                  label="Select Toolbox ID"
                  name="toolboxId"
                  value={toolbox.toolboxId}
                  onChange={onInputChange}
                >
                  {toolboxIds.map((tb) => (
                    <MenuItem key={tb.toolbox_id} value={tb.toolbox_id}>
                      {tb.toolbox_id}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
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
                <Table stickyHeader aria-label="Toolbox Details Table" sx={{ borderCollapse: 'separate', borderSpacing: 0, '& .MuiTableCell-root': { border: '1px solid rgba(224,224,224,1)' }, }}>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', backgroundColor: 'grey', color: 'white' }}>ID</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', backgroundColor: 'grey', color: 'white' }}>Location</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', backgroundColor: 'grey', color: 'white' }}>Project</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', backgroundColor: 'grey', color: 'white' }}>Site Supervisor</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', backgroundColor: 'grey', color: 'white' }}>Selected Tools</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>{toolboxDetails.toolbox_id}</TableCell>
                      <TableCell>{toolboxDetails.location_id}</TableCell>
                      <TableCell>{toolboxDetails.project_id}</TableCell>
                      <TableCell>{toolboxDetails.site_supervisor_id}</TableCell>
                      <TableCell>{toolboxDetails.selectedTools.join(', ')}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Paper>
            )}
          </Box>
        </Container>
      </Grid>
    </Grid>
  );
};

export default STrackToolbox;

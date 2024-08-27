import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import ManagerSidebar from '../../../../../../Components/ManagerSidebar.jsx';
import './LocationHome.css';
import { Grid, Container, Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, InputAdornment } from '@mui/material';
import ManagerNavbar from '../../../../../../Components/Navbar/ManagerNavbar.jsx';
import SearchIcon from '@mui/icons-material/Search'; // Import SearchIcon from Material-UI

export default function LocationHome() {
  const [locations, setLocations] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredLocations, setFilteredLocations] = useState([]);

  useEffect(() => {
    loadLocations();
  }, []);

  const { locationId } = useParams();

  const loadLocations = async () => {
    try {
      const response = await axios.get("http://localhost:8080/locations");
      setLocations(response.data);
      setFilteredLocations(response.data); // Initialize filtered locations with all locations
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const deleteLocation = async (locationId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this location?");
    if (confirmDelete) {
      await axios.delete(`http://localhost:8080/location/${locationId}`);
      loadLocations(); // Refresh the locations list after deletion
    }
  };

  // Function to handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    filterLocations(e.target.value);
  };

  // Function to filter locations based on search query
  const filterLocations = (query) => {
    if (query.trim() === '') {
      setFilteredLocations(locations); // Reset to all locations if query is empty
    } else {
      const filtered = locations.filter(location =>
        location.locationId.toLowerCase().includes(query.toLowerCase()) ||
        location.locationName.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredLocations(filtered);
    }
  };

  return (
    <Grid container>
      <Grid item>
        <ManagerSidebar />
      </Grid>

      <Grid item xs>
        <ManagerNavbar />
        <Container maxWidth="lg">
          <Box mt={4}>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/AddLocation"
              style={{ marginBottom: '20px' }}
            >
              Add Locations
            </Button>
            <TextField
              fullWidth
              label="Search"
              variant="outlined"
              margin="normal"
              value={searchQuery}
              onChange={handleSearchChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
            <TableContainer component={Paper}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell>#</TableCell>
                    <TableCell>Location Id</TableCell>
                    <TableCell>Location Name</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredLocations.map((location, index) => (
                    <TableRow key={index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{location.locationId}</TableCell>
                      <TableCell>{location.locationName}</TableCell>
                      <TableCell>
                        <Button
                          variant="outlined"
                          color="primary"
                          component={Link}
                          to={`/UpdateLocation/${location.locationId}`}
                          style={{ marginRight: '10px' }}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() => deleteLocation(location.locationId)}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Container>
      </Grid>
    </Grid>
  );
}

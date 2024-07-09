import { Link, useNavigate } from 'react-router-dom'; // Import React Router components for navigation
import React, { useState } from 'react'; // Import React and useState hook
import axios from 'axios'; // Import axios for making HTTP requests
import ManagerSidebar from '../../../../../../Components/ManagerSidebar.jsx'; // Import Sidebar component
import ManagerNavbar from '../../../../../../Components/Navbar/ManagerNavbar.jsx';
import { Grid, Container, Box, TextField, Button, Typography, Paper } from '@mui/material'; // Import Material-UI components

// Main function component for adding a new location
export default function AddLocation() {
  let navigate = useNavigate(); // Initialize navigation

  // State to store form data for location
  const [locations, setLocation] = useState({
    locationId: "",
    locationName: ""
  });

  // Destructure state variables for easier access
  const { locationId, locationName } = locations;

  // Handle input changes
  const onInputChange = (e) => {
    setLocation({ ...locations, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const onSubmit = async (e) => {
    e.preventDefault();
    // Location Form validation
    if (!locationId || !locationName) {
      alert("Please fill in all fields.");
      return;
    }

    // Send a POST request to add the new location
    await axios.post("http://localhost:8080/location", locations);
    // Reset the form fields
    setLocation({
      locationId: "",
      locationName: ""
    });
    navigate("/locationHome"); // Navigate to ViewLocations page upon success
  };

  // Function to reset the form fields
  const resetForm = () => {
    setLocation({
      locationId: "",
      locationName: ""
    });
  };

  // Render the form inside the Sidebar component
  return (
    <Grid container>
      <Grid item>
        <ManagerSidebar />
      </Grid>

      <Grid item xs>
        <ManagerNavbar />

        <Container maxWidth="md">
          <Box mt={4}>
            <Paper elevation={3}>
              <Box p={4}>
                <Typography variant="h6" gutterBottom>
                  Add New Location
                </Typography>
                <form onSubmit={(e) => onSubmit(e)}>
                  <TextField
                    fullWidth
                    label="Location Id"
                    name="locationId"
                    value={locationId}
                    onChange={(e) => onInputChange(e)}
                    margin="normal"
                    variant="outlined"
                  />
                  <TextField
                    fullWidth
                    label="Location Name"
                    name="locationName"
                    value={locationName}
                    onChange={(e) => onInputChange(e)}
                    margin="normal"
                    variant="outlined"
                  />
                  
                  <Box mt={2} display="flex" justifyContent="space-between">
                    <Button variant="outlined" color="secondary" component={Link} to="/locationHome">
                      Back to Location Details
                    </Button>
                    <Box>
                      <Button variant="outlined" color="secondary" onClick={resetForm} style={{ marginRight: '10px' }}>
                        Clear
                      </Button>
                      <Button variant="contained" color="primary" type="submit">
                        Submit
                      </Button>
                    </Box>
                  </Box>
                </form>
              </Box>
            </Paper>
          </Box>
        </Container>
      </Grid>
    </Grid>
  );
}

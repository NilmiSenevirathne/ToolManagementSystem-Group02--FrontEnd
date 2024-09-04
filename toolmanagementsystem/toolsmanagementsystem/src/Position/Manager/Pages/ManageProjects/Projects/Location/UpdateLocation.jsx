import { Link, useNavigate, useParams } from 'react-router-dom'; // Import React Router components for navigation and parameter handling
import React, { useEffect, useState } from 'react'; // Import React and hooks
import axios from 'axios'; // Import axios for making HTTP requests
import ManagerSidebar from '../../../../../../Components/ManagerSidebar.jsx'; // Import Sidebar component
import NewNav from '../../../../../../Components/Navbar/NewNav.jsx';
import { Grid, Container, Box, TextField, Button, Typography, Paper } from '@mui/material'; // Import Material-UI components

// Main function component for updating a location
export default function UpdateLocation() {
  let navigate = useNavigate();

  // Retrieve location ID from URL parameters
  const { locationId: paramLocationId } = useParams();

  // State to store form data for location
  const [locations, setLocation] = useState({
    locationId: "",
    locationName: ""
  });

  const [errors, setErrors] = useState({
    locationId: "",
    locationName: "",
  });

  // Destructure state variables for easier access
  const { locationId, locationName } = locations;

  // Handle input changes
  const onInputChange = (e) => {
    const { name, value } = e.target;
    setLocation({ ...locations, [name]: value });

    // Validate locationId
    if (name === "locationId") {
      const locationIdPattern = /^L\d{3}$/;
      if (!locationIdPattern.test(value)) {
        setErrors({ ...errors, locationId: "Location ID must be in the format 'L001'" });
      } else {
        setErrors({ ...errors, locationId: "" });
      }
    }
  };

  // Function to load location data based on the ID from URL
  const loadLocations = async () => {
    const result = await axios.get(`http://localhost:8080/locations/${paramLocationId}`);
    setLocation(result.data);
  };

  useEffect(() => {
    loadLocations();
  }, []);

  // Handle form submission
  const onSubmit = async (e) => {
    e.preventDefault();
    // Location Form validation
    if (!locationId || !locationName) {
      alert("Please fill in all fields.");
      return;
    }
    // Send a PUT request to update the location
    await axios.put(`http://localhost:8080/locations/${paramLocationId}`, locations);
    navigate("/locationHome"); // Navigate to locationHome page upon success
  };

  // Render the form inside the Sidebar component
  return (
    <Grid container>
      <Grid item>
        <ManagerSidebar />
      </Grid>

      <Grid item xs>
        <NewNav />

        <Container maxWidth="sm" >
          <Box mt={4}>
            <Paper elevation={3}>
              <Box p={4}>
                <Typography variant="h4"  align= "center" gutterBottom>
                  Edit Location Details
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
                    error={!!errors.locationId}
                    helperText={errors.locationId}
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
                  <Box mt={2} display="flex" justifyContent="center" gap={2}>
                    <Box flexGrow={1}>
                    <Button variant="outlined" color="secondary" component={Link} to="/locationHome">
                      Back
                    </Button>
                    </Box>
                    <Box>
                    <Button variant="contained" sx={{ bgcolor: 'green', width: '100%', fontSize: '1.25rem' }} type="submit">
                       Update
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

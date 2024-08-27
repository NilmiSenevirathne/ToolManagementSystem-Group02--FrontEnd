import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import axios from 'axios';
import ManagerSidebar from '../../../../../../Components/ManagerSidebar.jsx';
import ManagerNavbar from '../../../../../../Components/Navbar/ManagerNavbar.jsx';
import { Grid, Container, Box, TextField, Button, Typography, Paper } from '@mui/material';

export default function AddLocation() {
  let navigate = useNavigate();

  const [locations, setLocation] = useState({
    locationId: "",
    locationName: "",
  });

  const [errors, setErrors] = useState({
    locationId: "",
    locationName: "",
  });

  const { locationId, locationName } = locations;

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

    // Validate locationName
    if (name === "locationName") {
      const locationNamePattern = /^[A-Za-z\s]+$/;
      if (!locationNamePattern.test(value)) {
        setErrors({ ...errors, locationName: "Location Name must only contain letters and spaces" });
      } else {
        setErrors({ ...errors, locationName: "" });
      }
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!locationId || !locationName) {
      alert("Please fill in all fields.");
      return;
    }

    if (errors.locationId || errors.locationName) {
      alert("Please correct the errors in the form.");
      return;
    }

    try {
      await axios.post("http://localhost:8080/location", locations, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setLocation({
        locationId: "",
        locationName: "",
      });
      navigate("/locationHome");
    } catch (error) {
      if (error.response && error.response.status === 409) {
        // Handle duplicate locationId or locationName
        const errorMessage = error.response.data;
        if (errorMessage.includes('Location ID')) {
          setErrors({ ...errors, locationId: errorMessage });
        } else if (errorMessage.includes('Location Name')) {
          setErrors({ ...errors, locationName: errorMessage });
        }
      } else {
        console.error("There was an error adding the location!", error);
      }
    }
  };

  const resetForm = () => {
    setLocation({
      locationId: "",
      locationName: "",
    });
    setErrors({
      locationId: "",
      locationName: "",
    });
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
                    error={!!errors.locationName}
                    helperText={errors.locationName}
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
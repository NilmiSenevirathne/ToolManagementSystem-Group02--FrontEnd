import axios from 'axios'; // Import axios for making HTTP requests
import React, { useState, useEffect } from 'react'; // Import React and hooks
import { Link, useNavigate } from 'react-router-dom'; // Import React Router components
import ManagerSidebar from '../../../../../Components/ManagerSidebar.jsx'; // Import Sidebar component
import ManagerNavbar from '../../../../../Components/Navbar/ManagerNavbar.jsx';
import { Grid, Container, Box, TextField, Button, Typography, Paper, MenuItem } from '@mui/material'; // Import Material-UI components

export default function AddProjects() {
  const navigate = useNavigate(); // Initialize navigation

  // State for storing locations and existing project IDs
  const [locations, setLocations] = useState([]);
  const [existingProjectIds, setExistingProjectIds] = useState([]); 

  // Fetch locations and existing project IDs when the component mounts
  useEffect(() => {
    fetchLocations();
    fetchExistingProjectIds();
  }, []);

  // Function to fetch locations from the backend
  const fetchLocations = async () => {
    try {
      const response = await axios.get("http://localhost:8080/locations");
      setLocations(response.data);
    } catch (error) {
      console.error('Error fetching locations:', error);
    }
  };

  // Function to fetch existing project IDs from the backend
  const fetchExistingProjectIds = async () => {
    try {
      const response = await axios.get("http://localhost:8080/projects");
      setExistingProjectIds(response.data.map(project => project.projectId));
    } catch (error) {
      console.error('Error fetching existing project IDs:', error);
    }
  };

  // State for storing form data
  const [projects, setProjects] = useState({
    projectId: "",
    projectName: "",
    description: "",
    siteSupervisorID: "",
    siteSupervisorName: "",
    locationId: "",
    locationName: "",
    startDate: "",
    endDate: ""
  });

  // Function to reset the form
  const resetForm = () => {
    setProjects({
      projectId: "",
      projectName: "",
      description: "",
      siteSupervisorID: "",
      siteSupervisorName: "",
      locationId: "",
      locationName: "",
      startDate: "",
      endDate: ""
    });
  };

  // Destructure form data from projects state
  const { projectId, projectName, description, siteSupervisorID, siteSupervisorName, locationId, locationName, startDate, endDate } = projects;

  // Handle input changes
  const onInputChange = (e) => {
    const { name, value } = e.target;

    // If the location ID is changed, update the location name
    if (name === "locationId") {
      const selectedLocation = locations.find(location => location.locationId === value);
      setProjects({ ...projects, locationId: value, locationName: selectedLocation ? selectedLocation.locationName : "" });
    } else {
      setProjects({ ...projects, [name]: value });
    }
  };

  // Handle form submission
  const onSubmit = async (e) => {
    e.preventDefault();

    // Check if project ID already exists
    if (existingProjectIds.includes(projectId)) {
      alert("Project ID already exists. Please enter a different ID.");
      return;
    }

    // Check if all fields are filled
    if (!projectId || !projectName || !description || !siteSupervisorID || !siteSupervisorName || !locationId || !startDate || !endDate) {
      alert("Please fill in all fields.");
      return;
    }

    // Try to add the new project to the backend
    try {
      await axios.post("http://localhost:8080/project", projects);
      navigate("/manageprojects"); // Navigate to manage projects page
    } catch (error) {
      console.error('Error adding project:', error);
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
            <Paper elevation={3}>
              <Box p={4}>
                <Typography variant="h6" gutterBottom>
                  Add New Project
                </Typography>
                <form onSubmit={onSubmit}>
                  <TextField
                    fullWidth
                    label="Project Id"
                    name="projectId"
                    value={projectId}
                    onChange={onInputChange}
                    margin="normal"
                    variant="outlined"
                  />
                  <TextField
                    fullWidth
                    label="Project Name"
                    name="projectName"
                    value={projectName}
                    onChange={onInputChange}
                    margin="normal"
                    variant="outlined"
                  />
                  <TextField
                    fullWidth
                    label="Description"
                    name="description"
                    value={description}
                    onChange={onInputChange}
                    margin="normal"
                    variant="outlined"
                  />
                  <TextField
                    fullWidth
                    label="Start Date"
                    name="startDate"
                    type="date"
                    value={startDate}
                    onChange={onInputChange}
                    margin="normal"
                    variant="outlined"
                    InputLabelProps={{ shrink: true }}
                  />
                  <TextField
                    fullWidth
                    label="End Date"
                    name="endDate"
                    type="date"
                    value={endDate}
                    onChange={onInputChange}
                    margin="normal"
                    variant="outlined"
                    InputLabelProps={{ shrink: true }}
                  />
                  <TextField
                    fullWidth
                    label="Site Supervisor ID"
                    name="siteSupervisorID"
                    value={siteSupervisorID}
                    onChange={onInputChange}
                    margin="normal"
                    variant="outlined"
                  />
                  <TextField
                    fullWidth
                    label="Site Supervisor Name"
                    name="siteSupervisorName"
                    value={siteSupervisorName}
                    onChange={onInputChange}
                    margin="normal"
                    variant="outlined"
                  />
                  <TextField
                    fullWidth
                    select
                    label="Location ID"
                    name="locationId"
                    value={locationId}
                    onChange={onInputChange}
                    margin="normal"
                    variant="outlined"
                  >
                    <MenuItem value="">
                      <em>Select Location ID</em>
                    </MenuItem>
                    {locations.map(location => (
                      <MenuItem key={location.locationId} value={location.locationId}>
                        {location.locationId}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    fullWidth
                    label="Location Name"
                    name="locationName"
                    value={locationName}
                    margin="normal"
                    variant="outlined"
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  <Box mt={2} display="flex" justifyContent="space-between">
                    <Button variant="outlined" color="secondary" onClick={resetForm}>
                      Clear
                    </Button>
                    <Button variant="contained" color="primary" type="submit">
                      Submit
                    </Button>
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

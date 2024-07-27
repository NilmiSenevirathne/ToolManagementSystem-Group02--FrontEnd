import axios from 'axios'; // Import axios for making HTTP requests
import React, { useEffect, useState } from 'react'; // Import React and hooks
import { useNavigate, useParams } from 'react-router-dom'; // Import React Router components
import ManagerSidebar from '../../../../../Components/ManagerSidebar.jsx'; // Import Sidebar component
import { Grid, Container, Box, TextField, Button, Typography, Paper, MenuItem } from '@mui/material'; // Import Material-UI components
import ManagerNavbar from '../../../../../Components/Navbar/ManagerNavbar.jsx';

export default function Updateprojects() {
  const navigate = useNavigate(); // Initialize navigation
  const { project_id } = useParams(); // Get the project ID from the URL parameters

  // State for storing project details
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

  // State for storing locations
  const [locations, setLocations] = useState([]);

  // Fetch locations and project details when the component mounts
  useEffect(() => {
    fetchLocations();
    loadProjects();
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

  // Function to load project details from the backend
  const loadProjects = async () => {
    try {
      const result = await axios.get(`http://localhost:8080/Projects/${project_id}`);
      setProjects(result.data);
    } catch (error) {
      console.error('Error loading project details:', error);
    }
  };

  // Destructure project details from the state
  const { projectId, projectName, description, siteSupervisorID, siteSupervisorName, locationId, locationName, startDate, endDate } = projects;

 // Handle input changes
 const onInputChange = (e) => {
  const { name, value } = e.target;

  // Validate projectId
  if (name === "projectId") {
    const projectIdPattern = /^P\d{3}$/;
    if (!projectIdPattern.test(value)) {
      setProjects({ ...projects, [name]: value }); // Allow non-matching values to be typed temporarily
    } else {
      setProjects({ ...projects, [name]: value });
    }
  } else {
    setProjects({ ...projects, [name]: value });
    }
  };

  // Handle form submission
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/Projects/${project_id}`, projects);
      navigate("/manageprojects");
    } catch (error) {
      console.error('Error updating project:', error);
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
                  Edit Project Details
                </Typography>
                <form onSubmit={onSubmit}>
                <TextField
                    fullWidth
                    label="Project Id"
                    name="projectId"
                    value={projects.projectId}
                    onChange={onInputChange}
                    margin="normal"
                    variant="outlined"
                    error={!/^P\d{3}$/.test(projects.projectId)} // Validate the format
                    helperText={!/^P\d{3}$/.test(projects.projectId) ? "Project ID must be in the format P001" : ""}
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

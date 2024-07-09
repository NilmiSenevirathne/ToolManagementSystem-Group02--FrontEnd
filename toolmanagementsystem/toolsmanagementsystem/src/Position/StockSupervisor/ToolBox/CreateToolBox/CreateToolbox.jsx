import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import StockSidebar from '../../../../Components/Sidebar/StockSidebar.jsx';
import StockSupervisorNavbar from '../../../../Components/Navbar/StockSupervisorNavbar.jsx';
import { Grid, Container, Box, Typography, TextField, Select, MenuItem, Button } from "@mui/material";
import axios from "axios";

function CreateToolbox() {
  const navigate = useNavigate();
  const location = useLocation();
  const initialState = location.state || {};

  const [locations, setLocations] = useState([]);
  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [selectedTools, setSelectedTools] = useState(initialState.selectedTools || []);
  
  const [toolbox, setToolbox] = useState({
    toolbox_id: initialState.toolbox_id || "",
    project_id: initialState.project_id || "",
    site_supervisor_id: initialState.site_supervisor_id || "",
    location_id: initialState.location_id || "",
  });

  useEffect(() => {
    fetchLocations();
    fetchUsers();
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get("http://localhost:8080/Projects");
      setProjects(response.data);
    } catch (error) {
      console.error("Error fetching projects: ", error);
    }
  };

  const fetchLocations = async () => {
    try {
      const response = await axios.get("http://localhost:8080/locations");
      setLocations(response.data);
    } catch (error) {
      console.error("Error fetching locations: ", error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8080/authentication/getUsertoolbox");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users: ", error);
    }
  };

  const onInputChange = (e) => {
    setToolbox({ ...toolbox, [e.target.name]: e.target.value });
  };

  //submit the new toolbox details
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const requestData = {
        toolbox_id: toolbox.toolbox_id,
        project_id: toolbox.project_id,
        site_supervisor_id: toolbox.site_supervisor_id,
        location_id: toolbox.location_id,  // Ensure this matches the state key
        // selectedTools: selectedTools.map(tool => tool.toolId), // Adjust as per your backend
      };
  
      console.log("Submitting data:", requestData);
  
      const response = await axios.post("http://localhost:8080/toolbox/create", requestData);
      console.log("Response from server:", response);
  
      if (response.status === 201) {
        alert("New Toolbox Successfully Added!");
        navigate("/maintoolbox");
      } else {
        alert("Failed to add new toolbox. Please try again.");
      }
    } catch (error) {
      console.error("Error occurred while adding toolbox:", error);
      if (error.response) {
        console.error("Server responded with:", error.response.data);
        alert("Failed to add new toolbox: " + JSON.stringify(error.response.data));
      } else {
        alert("An error occurred. Please try again.");
      }
    }
  };
  

  return (
    <Grid container>
      <Grid item>
        <StockSidebar />
      </Grid>
      <Grid item xs>
        <StockSupervisorNavbar />
        <Container maxWidth="md">
          <Box mt={4}>
            <Box p={4} border={1} borderRadius={8} borderColor="grey.300" boxShadow={3}>
              <Typography variant="h4" align="center" gutterBottom>
                New Toolbox Details Form
              </Typography>
              <form onSubmit={onSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      margin="normal"
                      label="Toolbox ID"
                      name="toolbox_id"
                      value={toolbox.toolbox_id}
                      onChange={onInputChange}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      select
                      fullWidth
                      variant="outlined"
                      margin="normal"
                      label="Project"
                      name="project_id"
                      value={toolbox.project_id}
                      onChange={onInputChange}
                    >
                      <MenuItem value="">
                        <em>Select project</em>
                      </MenuItem>
                      {projects.map((project) => (
                        <MenuItem key={project.projectId} value={project.projectId}>
                          {project.projectName}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      select
                      fullWidth
                      variant="outlined"
                      margin="normal"
                      label="Site Supervisor"
                      name="site_supervisor_id"
                      value={toolbox.site_supervisor_id}
                      onChange={onInputChange}
                    >
                      <MenuItem value="">
                        <em>Select Name</em>
                      </MenuItem>
                      {users.map((user) => (
                        <MenuItem key={user.userid} value={user.userid}>
                          {user.firstname} {user.lastname}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      select
                      fullWidth
                      variant="outlined"
                      margin="normal"
                      label="Location"
                      name="location_id"
                      value={toolbox.location_id}
                      onChange={onInputChange}
                    >
                      <MenuItem value="">
                        <em>Select Location</em>
                      </MenuItem>
                      {locations.map((loc) => (
                        <MenuItem key={loc.locationId} value={loc.locationId}>
                          {loc.locationName}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                </Grid>
                <Box my={2} display="flex" justifyContent="center">
                  <Link to="/tool" state={{ toolbox }} style={{ textDecoration: 'none' }}>
                    <Button variant="contained" sx={{ bgcolor: 'blue', width: '100%', fontSize: '1.25rem', maxWidth: "150px" }}>
                      Select Tools
                    </Button>
                  </Link>
                </Box>
                <TextField
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  label="Selected Tools"
                  value={selectedTools.map(tool => tool.toolName).join(', ')}
                  InputProps={{
                    readOnly: true,
                  }}
                  multiline
                  rows={4}
                />
                {/* submit button */}
                <Box mt={2} display="flex" justifyContent="center" gap={2}>
                  <Box flexGrow={1}>
                    <Button
                      variant="contained"
                      sx={{ bgcolor: 'green', width: '100%', fontSize: '1.25rem' }}
                      type="submit"
                    >
                      Submit
                    </Button>
                  </Box>
                  {/* cancel button */}
                  <Box flexGrow={1}>
                    <Link to="/maintoolbox" style={{ textDecoration: 'none' }}>
                      <Button
                        variant="contained"
                        sx={{ bgcolor: 'red', width: '100%', fontSize: '1.25rem' }}
                      >
                        Cancel
                      </Button>
                    </Link>
                  </Box>
                </Box>
              </form>
            </Box>
          </Box>
        </Container>
      </Grid>
    </Grid>
  );
}

export default CreateToolbox;

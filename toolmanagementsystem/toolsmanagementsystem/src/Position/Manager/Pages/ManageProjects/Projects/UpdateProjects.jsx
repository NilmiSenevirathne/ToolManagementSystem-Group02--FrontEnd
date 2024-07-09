import axios from 'axios'; // Import axios for making HTTP requests
import React, { useEffect, useState } from 'react'; // Import React and hooks
import { Link, useNavigate, useParams } from 'react-router-dom'; // Import React Router components
import ManagerSidebar from '../../../../../Components/ManagerSidebar.jsx'; // Import Sidebar component
import { Grid, Container, Box } from '@mui/material';
import ManagerNavbar from '../../../../../Components/Navbar/ManagerNavbar.jsx';

export default function Updateprojects() {
  let navigate = useNavigate(); // Initialize navigation
  const Id = useParams(); // Get the project ID from the URL parameters

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

  // Fetch locations when the component mounts
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
      const result = await axios.get(`http://localhost:8080/Projects/${Id.project_id}`);
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
    try {
      await axios.put(`http://localhost:8080/Projects/${Id.project_id}`, projects);
      navigate("/manageprojects");
    } catch (error) {
      console.error('Error updating project:', error);
    }
  };

  return (
    <Grid container>
      <Grid item >
        <ManagerSidebar />
      </Grid>

      <Grid item xs>
        <ManagerNavbar />

        <Container maxWidth="md">
          <Box mt={4}>
            <Box
              p={4}
              border={1}
              borderRadius={8}
              borderColor="grey.300"
              boxShadow={3}
            >
              <h2 className='text-center m-4'>Edit Projects Details </h2>
              <form onSubmit={(e) => onSubmit(e)}>
                <div className='mb-3'>
                  <label htmlFor="projectId" className="form-label">Project Id</label>
                  <input type="text" className='form-control'
                    placeholder='Enter Project id'
                    name="projectId"
                    value={projectId}
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
                <div className='mb-3'>
                  <label htmlFor="projectName" className="form-label">Project name</label>
                  <input type="text" className='form-control'
                    placeholder='Enter Project Name'
                    name="projectName"
                    value={projectName}
                    onChange={(e) => onInputChange(e)}
                  />
                </div>

                <div className='mb-3'>
                  <label htmlFor="description" className="form-label">Description</label>
                  <input type="text" className='form-control'
                    placeholder='Enter Description'
                    name="description"
                    value={description}
                    onChange={(e) => onInputChange(e)}
                  />
                </div>

                <div className='mb-3'>
                  <label htmlFor="siteSupervisorID" className="form-label">Site Supervisor ID</label>
                  <input type="text" className='form-control'
                    placeholder='Enter Site Supervisor ID'
                    name="siteSupervisorID"
                    value={siteSupervisorID}
                    onChange={(e) => onInputChange(e)}
                  />
                </div>

                <div className='mb-3'>
                  <label htmlFor="siteSupervisorName" className="form-label">Site Supervisor name</label>
                  <input type="text" className='form-control'
                    placeholder='Enter Supervisor name'
                    name="siteSupervisorName"
                    value={siteSupervisorName}
                    onChange={(e) => onInputChange(e)}
                  />
                </div>

                <div className='mb-3'>
                  <label htmlFor="locationId" className="form-label">Location ID</label>
                  <select className='form-control' name="locationId" value={locationId} onChange={onInputChange}>
                    <option value="">Select Location ID</option>
                    {locations.map(location => (
                      <option key={location.id} value={location.locationId}>{location.locationId}</option>
                    ))}
                  </select>
                </div>
                <div className='mb-3'>
                  <label htmlFor="locationName" className="form-label">Location Name</label>
                  <input type="text" className='form-control'
                    placeholder='Enter Location Name'
                    name="locationName"
                    value={locationName}
                    readOnly
                  />
                </div>

                <div className='mb-3'>
                  <label htmlFor="startDate" className="form-label">Start Date </label>
                  <input type="date" className='form-control'
                    placeholder='Enter project start date'
                    name="startDate"
                    value={startDate}
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
                <div className='mb-3'>
                  <label htmlFor="endDate" className="form-label">End Date </label>
                  <input type="date" className='form-control'
                    placeholder='Enter project end date'
                    name="endDate"
                    value={endDate}
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
                <button type="submit" className='btn btn-outline-primary'>Submit</button>
              </form>
            </Box>
          </Box>
        </Container>
      </Grid>
    </Grid>
  );
}

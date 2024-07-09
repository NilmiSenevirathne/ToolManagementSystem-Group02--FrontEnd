import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import ManagerSidebar from '../../../../../../Components/ManagerSidebar.jsx';
import './LocationHome.css';
import { Grid, Container, Box, Typography, Button } from '@mui/material';
import ManagerNavbar from '../../../../../../Components/Navbar/ManagerNavbar.jsx';

export default function LocationHome() {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    loadLocations();
  }, []);

  const { locationId } = useParams();

  const loadLocations = async () => {
    try {
      const response = await axios.get("http://localhost:8080/locations");
      setLocations(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const deleteLocations = async (locationId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this location?");
    if (confirmDelete) {
      await axios.delete(`http://localhost:8080/location/${locationId}`);
      loadLocations(); // Refresh the locations list after deletion
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
            <Link className="btn" style={{ backgroundColor: 'navy', color: 'white' }} to="/AddLocation">Add Locations</Link>
            <table className="table border shadow">
              <thead style={{ top: 0, zIndex: 1, background: '#fff' }}>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Location Id</th>
                  <th scope="col">Location Name</th> 
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {locations.map((location, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th> 
                    <td>{location.locationId}</td>
                    <td>{location.locationName}</td>
                    <td>
                      <Link className='btn btn-outline-primary mx-2' to={`/UpdateLocation/${location.locationId}`}>Edit</Link>
                      <button className='btn btn-danger mx-2' onClick={() => deleteLocations(location.locationId)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Box>
        </Container>
      </Grid>
    </Grid>
  );
}

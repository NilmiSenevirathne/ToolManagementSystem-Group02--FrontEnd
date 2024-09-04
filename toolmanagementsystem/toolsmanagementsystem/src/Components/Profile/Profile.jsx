// Profile.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Grid, Paper, Typography, TextField, Box, Button } from '@mui/material';
import NewNav from '../Navbar/NewNav.jsx';

const Profile = () => {
  const { username } = useParams();  // Extract username from URL params
  const navigate = useNavigate();

  const [values, setValues] = useState({
    profileimage: '',
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    nic: '',
    contact: '',
    role: ''
  });
  const [error, setError] = useState('');

  // Fetch user details from the API
  const getUserDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/authentication/getUserDetails/${username}`);
      const userDetails = response.data;
      setValues({
        profileimage: userDetails.userimageData || '', // Ensure your backend provides this field
        firstName: userDetails.firstname || '',
        lastName: userDetails.lastname || '',
        username: userDetails.username || '',
        password: userDetails.password || '',
        nic: userDetails.nic || '',
        contact: userDetails.contact || '',
        role: userDetails.role || ''
      });
      setError('');
    } catch (error) {
      console.error('Error fetching user details:', error);
      setError('Error fetching user details. Please check the username and try again.');
    }
  };

  useEffect(() => {
    getUserDetails();
  }, [username]);

  // Handle input changes
  const onInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    });
  };

  // Handle form submission to update user details
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:8080/authentication/updateUserProfile/${username}`, values);
      alert('User details updated successfully:', response.data);
      navigate('/stocksupervisordashboard');
    } catch (error) {
      console.error('Error updating user details:', error);
      alert('Error updating user details. Please try again.');
    }
  };

  return (
    <Grid container>
      <Grid item xs>
        <NewNav />
        <Grid container justifyContent="center">
          <Grid item xs={10} md={8} lg={6} component={Paper} elevation={3} sx={{ p: 4, mt: 4 }}>
            <Typography variant="h6" gutterBottom align="center" sx={{ fontSize: '2.5rem' }}>
              Update Profile Form
            </Typography>
            {error && <Typography color="error" align="center">{error}</Typography>}
            <form onSubmit={onSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    label="First Name"
                    variant="outlined"
                    fullWidth
                    value={values.firstName}
                    onChange={onInputChange}
                    name="firstName"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Last Name"
                    variant="outlined"
                    fullWidth
                    value={values.lastName}
                    onChange={onInputChange}
                    name="lastName"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Username"
                    variant="outlined"
                    fullWidth
                    value={values.username}
                    onChange={onInputChange}
                    name="username"
                    disabled
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Password"
                    variant="outlined"
                    fullWidth
                    type="password"
                    value={values.password}
                    onChange={onInputChange}
                    name="password"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="NIC"
                    variant="outlined"
                    fullWidth
                    value={values.nic}
                    onChange={onInputChange}
                    name="nic"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Contact"
                    variant="outlined"
                    fullWidth
                    value={values.contact}
                    onChange={onInputChange}
                    name="contact"
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Role"
                    variant="outlined"
                    fullWidth
                    value={values.role}
                    onChange={onInputChange}
                    name="role"
                    disabled
                  />
                </Grid>
              </Grid>
              <Box mt={2} display="flex" justifyContent="center" gap={2}>
                <Box flexGrow={1}>
                  <Button
                    variant="contained"
                    sx={{ bgcolor: 'green', width: '100%', fontSize: '1.25rem', maxWidth: "200px" }}
                    type="submit"
                  >
                    Update
                  </Button>
                </Box>
              </Box>
            </form>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Profile;

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Grid, Box, Paper, Typography, TextField, Button, Avatar } from '@mui/material';
import axios from 'axios';
import Sbar from '../Sbar';
import Navbr from '../Navbar/Navbr';

const SiteSupervisorProfile = () => {
  const { userid } = useParams();
  const navigate = useNavigate();

  const [values, setValues] = useState({
    profileimage: '',
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    nic: '',
    contact: '',
    role: 'SiteSupervisor',
  });

  // Fetch user details from the database
  const getUserDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/authentication/getUserDetails/${userid}`);
      const userDetails = response.data;
      setValues({
        ...values,
        profileimage: userDetails.profileimage || '',
        firstName: userDetails.firstName || '',
        lastName: userDetails.lastName || '',
        username: userDetails.username || '',
        password: userDetails.password || '',
        nic: userDetails.nic || '',
        contact: userDetails.contact || '',
      });
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  useEffect(() => {
    getUserDetails();
  }, [userid]);

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const onFileChange = (e) => {
    setValues({ ...values, profileimage: e.target.files[0] });
  };

  // Update user details
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('profileimage', values.profileimage);
      formData.append('firstName', values.firstName);
      formData.append('lastName', values.lastName);
      formData.append('username', values.username);
      formData.append('password', values.password);
      formData.append('nic', values.nic);
      formData.append('contact', values.contact);
      formData.append('role', values.role);

      const response = await axios.put(`http://localhost:8080/updateUserProfile/${userid}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('User details updated successfully');
      navigate('/sitesupervisor');
    } catch (error) {
      console.error('Error updating user details:', error);
    }
  };

  const onCancel = () => {
    navigate('/sitesupervisor');
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={3}>
        <Sbar />
      </Grid>
      <Grid item xs={12} md={9}>
        <Navbr />
        <Grid container justifyContent="center">
          <Grid item xs={12} md={8} lg={6}>
            <Paper elevation={3} sx={{ padding: 3, marginTop: 3 }}>
              <Typography variant="h5" gutterBottom align="center">
                Update Profile Form
              </Typography>
              <form onSubmit={onSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12} display="flex" justifyContent="center">
                    <Avatar
                      src={values.profileimage ? URL.createObjectURL(values.profileimage) : ''}
                      alt="Profile"
                      sx={{ width: 100, height: 100 }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      type="file"
                      variant="outlined"
                      fullWidth
                      onChange={onFileChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="First Name"
                      variant="outlined"
                      fullWidth
                      name="firstName"
                      value={values.firstName}
                      onChange={onInputChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Last Name"
                      variant="outlined"
                      fullWidth
                      name="lastName"
                      value={values.lastName}
                      onChange={onInputChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Username"
                      variant="outlined"
                      fullWidth
                      name="username"
                      value={values.username}
                      onChange={onInputChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Password"
                      variant="outlined"
                      fullWidth
                      type="password"
                      name="password"
                      value={values.password}
                      onChange={onInputChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="NIC"
                      variant="outlined"
                      fullWidth
                      name="nic"
                      value={values.nic}
                      onChange={onInputChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Contact"
                      variant="outlined"
                      fullWidth
                      name="contact"
                      value={values.contact}
                      onChange={onInputChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      label="Role"
                      variant="outlined"
                      fullWidth
                      value={values.role}
                      disabled
                    />
                  </Grid>
                </Grid>
                <Box mt={2} display="flex" justifyContent="center" gap={2}>
                  <Button
                    variant="contained"
                    color="success"
                    sx={{ width: '100%', fontSize: '1.25rem' }}
                    type="submit"
                  >
                    Update
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    sx={{ width: '100%', fontSize: '1.25rem' }}
                    onClick={onCancel}
                  >
                    Cancel
                  </Button>
                </Box>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SiteSupervisorProfile;

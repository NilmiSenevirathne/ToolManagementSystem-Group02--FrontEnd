import React, { useState } from 'react';
import { Grid, CssBaseline, TextField, Button, Paper, Typography } from '@mui/material';
import AdminSidebar from '../../../Components/Sidebar/AdminSidebar.jsx';
import AdminNavbar from '../../../Components/Navbar/Adminnavbar.jsx';

const UserReg = () => {
  const [userDetails, setUserDetails] = useState({
    userid: '',
    username: '',
    password: '',
    firstname: '',
    lastname: '',
    nic: '',
    contact: '',
    role: '',
    imageData: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({
      ...userDetails,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/authentication/createUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userDetails)
      });
      if (response.ok) {
        alert('User registered successfully!');
      } else {
        alert('Failed to register user.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while registering the user.');
    }
  };

  return (
    <Grid container>
      <CssBaseline />
      <Grid item>
        <AdminSidebar />
      </Grid>
      <Grid item xs>
        <AdminNavbar />
        <Paper style={{ padding: 16, marginTop: 16 }}>
          <Typography variant="h6" gutterBottom>
            Register New User
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  name="userid"
                  label="User ID"
                  fullWidth
                  value={userDetails.userid}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="username"
                  label="Username"
                  fullWidth
                  value={userDetails.username}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="password"
                  label="Password"
                  type="password"
                  fullWidth
                  value={userDetails.password}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="firstname"
                  label="First Name"
                  fullWidth
                  value={userDetails.firstname}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="lastname"
                  label="Last Name"
                  fullWidth
                  value={userDetails.lastname}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="nic"
                  label="NIC"
                  fullWidth
                  value={userDetails.nic}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="contact"
                  label="Contact"
                  type="tel"
                  fullWidth
                  value={userDetails.contact}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="role"
                  label="Role"
                  fullWidth
                  value={userDetails.role}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="imageData"
                  label="Image Data"
                  fullWidth
                  value={userDetails.imageData}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary" fullWidth>
                  Register
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default UserReg;

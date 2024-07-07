import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import StockSidebar from '../Sidebar/StockSidebar';
import StockSupervisorNavbar from '../Navbar/StockSupervisorNavbar';
import { Grid, Paper, Typography, TextField, Box, Button } from '@mui/material';

const StockProfile = () => {
   const {userid} = useParams();
   const navigate  = useNavigate();

   const role = 'Stock Supervisor';
   
   const [values, setValues] = useState({
       userid:userid,
       profileimage:'',
       firstName:'',
       lastName:'',
       username:'',
       password:'',
       nic: '',
       contact:'',
       role:role,
   });

   //get userdetils from the database
   const getUserDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/authentication/getUserDetails/${userid}`);
      const userDetails = response.data;
      console.log('userid :', userid);
      setValues({
        ...values,
        userid: userDetails.userid || '',
        profileimage: userDetails.profileimage || '',
        firstName: userDetails.firstName || '',
        lastName: userDetails.lastName || '',
        username: userDetails.username || '',
        password: userDetails.password || '',
        nic: userDetails.nic || '',
        contact: userDetails.contact || '',
        // role: userDetails.role || '',
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

  //update user details  function
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.put(`http://localhost:8080/updateUserProfile/${userid}`, values);
        alert('User details updated successfully:', response.data);
        navigate('/stocksupervisordashboard');
    } catch (error) {
      console.error('Error updating user details:', error);
    }
  };

   // Function to handle cancel button click
   const onCancel = () => {
    navigate('/stocksupervisordashboard');
  }; 

  
   
  return (
    <Grid container>
      <Grid item>
        <StockSidebar />
      </Grid>
      <Grid item xs>
        <StockSupervisorNavbar />
        <Grid container justifyContent="center">
          <Grid item xs={10} md={8} lg={6} component={Paper} elevation={3} sx={{ p: 4, mt: 4 }}>
            <Typography variant="h6" gutterBottom align="center" sx={{ fontSize: '2.5rem' }}>
              Update Profile Form
            </Typography>
            <form onSubmit={onSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    label="UserId"
                    variant="outlined"
                    fullWidth
                    value={userid}
                    onChange={onInputChange}
                    disabled
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    type="file"
                    label="Profile Picture"
                    variant="outlined"
                    fullWidth
                    value={values.profileimage}
                    onChange={onInputChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="First Name"
                    variant="outlined"
                    fullWidth
                    value={values.firstName}
                    onChange={onInputChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Last Name"
                    variant="outlined"
                    fullWidth
                    value={values.lastName}
                    onChange={onInputChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Username"
                    variant="outlined"
                    fullWidth
                    value={values.username}
                    onChange={onInputChange}
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
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="NIC"
                    variant="outlined"
                    fullWidth
                    value={values.nic}
                    onChange={onInputChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Contact"
                    variant="outlined"
                    fullWidth
                    value={values.contact}
                    onChange={onInputChange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Role"
                    variant="outlined"
                    fullWidth
                    value={values.role}
                    onChange={onInputChange}
                    disabled
                  />
                </Grid>
              </Grid>
              <Box mt={2} display="flex" justifyContent="center" gap={2}>
                <Box flexGrow={1}>
                  <Button
                    variant="contained"
                    sx={{ bgcolor: 'green', width: '100%', fontSize: '1.25rem' }}
                    type="submit"
                  >
                    Update
                  </Button>
                </Box>
                <Box flexGrow={1}>
                  <Link to="/stocksupervisordashboard" style={{ textDecoration: 'none' }}>
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
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default StockProfile;

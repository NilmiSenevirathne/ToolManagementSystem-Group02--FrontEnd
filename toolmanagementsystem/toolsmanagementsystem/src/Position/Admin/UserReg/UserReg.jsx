import React, {useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Select, InputLabel, FormControl, Box, Link, Container, Grid, CssBaseline, TextField, Button, Paper, Typography, IconButton, MenuItem } from '@mui/material';
import AdminSidebar from '../../../Components/Sidebar/AdminSidebar.jsx';
import NewNav from '../../../Components/Navbar/NewNav.jsx';
import axios from 'axios'; // Import axios
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const UserReg = () => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({
    userid: '',
    username: '',
    password: '',
    confirmPassword: '', // Added for password confirmation
    firstname: '',
    lastname: '',
    nic: '',
    contact: '',
    role: '',
    // imageData: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({
      ...userDetails,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userDetails.password !== userDetails.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
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
        navigate('/usernamage')
      } else {
        alert('Failed to register user.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while registering the user.');
    }
  };

  const fetchLatestUserId = async () => {
    try {
      const response = await axios.get("http://localhost:8080/authentication/getUsertoolbox");
      const latestUser = response.data.reduce((maxId, user) => {
        const currentId = parseInt(user.userid.substring(1)); // Assuming your ID format is like "U001", extract and convert to integer
        return currentId > maxId ? currentId : maxId;
      }, 0);
      const newUserId = `U${(latestUser + 1).toString().padStart(3, '0')}`; // Increment and format to "UXXX"
      setUserDetails((prev) => ({ ...prev, userid: newUserId }));
    } catch (error) {
      console.error("Error fetching latest User ID: ", error);
    }
  };

  useEffect(() => {
    fetchLatestUserId();
  }, []);

  return (
    <Grid container>
      <CssBaseline />
      <Grid item>
        <AdminSidebar />
      </Grid>
      <Grid item xs>
        <NewNav />

        <Container maxWidth="md" style={{ marginTop: '20px' }}>
          <Typography variant="h4" align="center" gutterBottom>
            New User Register Form
          </Typography>

          <Paper elevation={3} style={{ padding: '60px' }}>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="userid"
                    label="User ID"
                    fullWidth
                    value={userDetails.userid}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="username"
                    label="Username"
                    fullWidth
                    value={userDetails.username}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={userDetails.password}
                    onChange={handleChange}
                    variant="outlined"
                    InputProps={{
                      endAdornment: (
                        <IconButton 
                          onClick={() => setShowPassword(!showPassword)} 
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      )
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Confirm Password"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={userDetails.confirmPassword}
                    onChange={handleChange}
                    variant="outlined"
                    InputProps={{
                      endAdornment: (
                        <IconButton 
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)} 
                          edge="end"
                        >
                          {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      )
                    }}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    name="firstname"
                    label="First Name"
                    fullWidth
                    value={userDetails.firstname}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="lastname"
                    label="Last Name"
                    fullWidth
                    value={userDetails.lastname}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="nic"
                    label="NIC"
                    fullWidth
                    value={userDetails.nic}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="contact"
                    label="Contact"
                    type="tel"
                    fullWidth
                    value={userDetails.contact}
                    onChange={handleChange}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel>Role</InputLabel>
                    <Select
                      label="Role"
                      name="role"
                      value={userDetails.role}
                      onChange={handleChange}
                    >
                      <MenuItem value="Admin">Admin</MenuItem>
                      <MenuItem value="StockSupervisor">Stock Supervisor</MenuItem>
                      <MenuItem value="SiteSupervisor">Site Supervisor</MenuItem>
                      <MenuItem value="Manager">Manager</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                {/* <Grid item xs={12} sm={6}>
  <FormControl fullWidth variant="outlined">
    <InputLabel>Image Data</InputLabel>
    <input
      type="file"
      name="imageData"
      accept="image/*"
      onChange={(e) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setUserDetails((prev) => ({
              ...prev,
              imageData: reader.result
            }));
          };
          reader.readAsDataURL(file); // Convert image file to base64 string
        }
      }}
    />
  </FormControl>
</Grid> */}

                <Grid item xs={12}>
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
                    <Box flexGrow={1}>
                      <Link to="/usernamage" style={{ textDecoration: 'none' }}>
                        <Button
                          variant="contained"
                          sx={{ bgcolor: 'red', width: '100%', fontSize: '1.25rem' }}
                        >
                          Cancel
                        </Button>
                      </Link>
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Container>
      </Grid>
    </Grid>
  );
};

export default UserReg;

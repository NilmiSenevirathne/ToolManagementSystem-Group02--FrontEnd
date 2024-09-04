import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Select, InputLabel, FormControl, Box, Container, Grid, CssBaseline,
  TextField, Button, Paper, Typography, IconButton, MenuItem
} from '@mui/material';
import AdminSidebar from '../../../Components/Sidebar/AdminSidebar.jsx';
import NewNav from '../../../Components/Navbar/NewNav.jsx';
import axios from 'axios';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const UserReg = () => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({
    userid: '',
    username: '',
    password: '',
    confirmPassword: '',
    firstname: '',
    lastname: '',
    gender: '',
    nic: '',
    contact: '',
    role: '',
    userimageData: null // State for image data
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({
      ...userDetails,
      [name]: value
    });
  };

  const handleFileChange = (e) => {
    setUserDetails({
      ...userDetails,
      userimageData: e.target.files[0]
    });
  };

  const validateFields = () => {
    const errors = {};
    const { username, password, confirmPassword, firstname, lastname, nic, contact, role } = userDetails;

    if (!username.trim()) errors.username = 'Username is required.';
    if (username.length < 3) errors.username = 'Username must be at least 3 characters long.';

    if (!password) errors.password = 'Password is required.';
    if (password.length < 8) errors.password = 'Password must be at least 8 characters long.';
    if (!/\d/.test(password)) errors.password = 'Password must contain at least one number.';
    if (!/[!@#$%^&*()_+{}\[\]:;"\'<>,.?~`]/.test(password)) errors.password = 'Password must contain at least one special character.';

    if (password !== confirmPassword) errors.confirmPassword = 'Passwords do not match.';

    if (!firstname.trim()) errors.firstname = 'First name is required.';
    if (!lastname.trim()) errors.lastname = 'Last name is required.';

    if (!nic.trim()) {
      errors.nic = 'NIC is required.';
    } else if (!/^\d{9} V$/.test(nic) && !/^\d{12}$/.test(nic)) {
      errors.nic = 'NIC must be in the format xxxxxxxxxx V or 12 digits.';
    }

    if (!contact.trim()) errors.contact = 'Contact number is required.';
    if (!/^\d{10}$/.test(contact)) errors.contact = 'Contact number must be exactly 10 digits long.';

    if (!role) errors.role = 'Role is required.';

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateFields()) return;

    const formData = new FormData();
    formData.append('userid', userDetails.userid);
    formData.append('username', userDetails.username);
    formData.append('password', userDetails.password);
    formData.append('firstname', userDetails.firstname);
    formData.append('lastname', userDetails.lastname);
    formData.append('gender', userDetails.gender);
    formData.append('nic', userDetails.nic);
    formData.append('contact', userDetails.contact);
    formData.append('role', userDetails.role);
    if (userDetails.userimageData) {
        formData.append('userimageData', userDetails.userimageData);
    }

    try {
        const response = await fetch('http://localhost:8080/authentication/createUser', {
            method: 'POST',
            body: formData
        });
        if (response.ok) {
            alert('User registered successfully!');
            navigate('/usernamage'); // Corrected URL
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
        const currentId = parseInt(user.userid.substring(1));
        return currentId > maxId ? currentId : maxId;
      }, 0);
      const newUserId = `U${(latestUser + 1).toString().padStart(3, '0')}`;
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

          <Paper elevation={3} style={{ padding: '40px' }}>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="userid"
                    label="User ID"
                    fullWidth
                    value={userDetails.userid}
                    onChange={handleChange}
                    InputProps={{
                      readOnly: true
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="username"
                    label="Username"
                    fullWidth
                    value={userDetails.username}
                    onChange={handleChange}
                    error={!!errors.username}
                    helperText={errors.username}
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
                    error={!!errors.password}
                    helperText={errors.password}
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
                    error={!!errors.confirmPassword}
                    helperText={errors.confirmPassword}
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
                    error={!!errors.firstname}
                    helperText={errors.firstname}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="lastname"
                    label="Last Name"
                    fullWidth
                    value={userDetails.lastname}
                    onChange={handleChange}
                    error={!!errors.lastname}
                    helperText={errors.lastname}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth variant="outlined" error={!!errors.gender}>
                    <InputLabel>Gender</InputLabel>
                    <Select
                      label="Gender"
                      name="gender"
                      value={userDetails.gender}
                      onChange={handleChange}
                    >
                      <MenuItem value="Male">Male</MenuItem>
                      <MenuItem value="Female">Female</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    name="nic"
                    label="NIC"
                    fullWidth
                    value={userDetails.nic}
                    onChange={handleChange}
                    error={!!errors.nic}
                    helperText={errors.nic}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <TextField
                    name="contact"
                    label="Contact Number"
                    fullWidth
                    value={userDetails.contact}
                    onChange={handleChange}
                    error={!!errors.contact}
                    helperText={errors.contact}
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth variant="outlined" error={!!errors.role}>
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

                <Grid item xs={12} sm={12} container justifyContent="center">
                  <Button
                    variant="contained"
                    component="label"
                    sx={{ bgcolor: 'blue', width: '80%', fontSize: '1.2rem', maxWidth: "150px" }}
                  >
                    Upload Image
                    <input
                      type="file"
                      accept="image/*"
                      hidden
                      onChange={handleFileChange}
                    />
                  </Button>
                  {userDetails.userimageData && (
                    <Typography variant="body2" style={{ marginTop: '10px' }}>
                      Selected file: {userDetails.userimageData.name}
                    </Typography>
                  )}
                </Grid>
    
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
    {/* cancel button */}
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

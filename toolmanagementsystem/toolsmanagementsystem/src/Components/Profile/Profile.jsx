import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import {
  Avatar, IconButton, Grid, Paper, Typography, TextField, Box, Button, InputLabel, Select, MenuItem
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import NewNav from '../Navbar/NewNav.jsx';

const Profile = () => {
  const navigate = useNavigate();
  const { username } = useParams(); 

  const [user, setUser] = useState({
    contact: "",
    firstname: "",
    lastname: "",
    gender: "",
    nic: "",
    password: "",
    confirmPassword: "",
    role: "",
    username: "",
    userimageData: "" // Base64 string or URL for image
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [imageFile, setImageFile] = useState(null); // State for the new image file
  const [imagePreview, setImagePreview] = useState(""); // State for image preview

  // Fetch user details from the API
  const loadUser = async () => {
    try {
      const result = await axios.get(`http://localhost:8080/authentication/getUserInfo/${username}`);
      setUser(result.data);

      // Set user image if it exists in the response
      if (result.data.userimageData) {
        setImagePreview(`data:image/jpeg;base64,${result.data.userimageData}`);
      }
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };

  useEffect(() => {
    loadUser();
  }, [username]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser(prevUser => ({ ...prevUser, [name]: value }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setImageFile(file);

    // Preview the image
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (user.password !== user.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      // Prepare form data for submission
      const formData = new FormData();
      formData.append('contact', user.contact);
      formData.append('firstname', user.firstname);
      formData.append('lastname', user.lastname);
      formData.append('gender', user.gender);
      formData.append('nic', user.nic);
      formData.append('password', user.password);
      formData.append('confirmPassword', user.confirmPassword);
      formData.append('role', user.role);
      formData.append('username', user.username);
      if (imageFile) formData.append('userimageData', imageFile);

      await axios.put(`http://localhost:8080/authentication/updateUserProfile/${username}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      alert("Successfully updated user details!");
      navigate(-1);
    } catch (error) {
      console.error("Error occurred:", error);
      alert("Unsuccessfully!");
    }
  };

  return (
    <Grid container>
      <Grid item xs>
        <NewNav />
        <Grid container justifyContent="center">
          <Grid item xs={10} md={8} lg={6} component={Paper} elevation={3} sx={{ p: 4, mt: 4 }}>
            <Typography variant="h6" gutterBottom align="center" sx={{ fontSize: '2.5rem' }}>
              Update Profile Details Form
            </Typography>
            <Paper elevation={3} style={{ padding: '60px' }}>
              <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  {/* Display user image */}
                  <Grid item xs={12} container justifyContent="center">
                    <Avatar
                      src={imagePreview || `data:image/jpeg;base64,${user.userimageData}`}
                      alt="User Image"
                      sx={{ width: 100, height: 100, mb: 2 }}
                    />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      style={{ marginTop: '10px' }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="First Name"
                      name="firstname"
                      value={user.firstname}
                      onChange={handleInputChange}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Last Name"
                      name="lastname"
                      value={user.lastname}
                      onChange={handleInputChange}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputLabel>Gender</InputLabel>
                    <Select
                      fullWidth
                      name="gender"
                      value={user.gender}
                      onChange={handleInputChange}
                    >
                      <MenuItem value="Male">Male</MenuItem>
                      <MenuItem value="Female">Female</MenuItem>
                    </Select>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Contact"
                      name="contact"
                      value={user.contact}
                      onChange={handleInputChange}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="NIC"
                      name="nic"
                      value={user.nic}
                      variant="outlined"
                      
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      value={user.password}
                      onChange={handleInputChange}
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
                      value={user.confirmPassword}
                      onChange={handleInputChange}
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
                      fullWidth
                      label="Role"
                      name="role"
                      value={user.role}
                      onChange={handleInputChange}
                      variant="outlined"
                      InputProps={{ readOnly: true }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Username"
                      name="username"
                      value={user.username}
                      onChange={handleInputChange}
                      variant="outlined"
                      InputProps={{ readOnly: true }}
                    />
                  </Grid>
                  <Grid item xs={12}>
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
                        <Button
                          onClick={() => navigate(-1)} // Go back to the previous page
                          variant="contained"
                          sx={{ bgcolor: 'red', width: '100%', fontSize: '1.25rem' }}
                        >
                          Cancel
                        </Button>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Profile;

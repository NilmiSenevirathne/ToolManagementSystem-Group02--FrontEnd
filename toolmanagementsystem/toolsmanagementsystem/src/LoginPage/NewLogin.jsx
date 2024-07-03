import React, { useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import backgroundImage from '../images/back1.jpg';
import companyLogo from '../images/BMKLogo.jpg';
import { useNavigate } from 'react-router-dom';

const defaultTheme = createTheme();

function NewLogin() {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');

  function handleChange(e) {
    setValues({ ...values, [e.target.name]: e.target.value });
  }

  function Validation(values) {
    const errors = {};
    if (!values.email) {
      errors.email = 'Email is required';
    }
    if (!values.password) {
      errors.password = 'Password is required';
    }
    return errors;
  }

  // Submit function
  async function handleSubmit(e) {
    e.preventDefault();

    const validationErrors = Validation(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await fetch('http://localhost:8080/authentication/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });

        if (!response.ok) {
          const errorMessage = await response.text();
          console.error('Server error message:', errorMessage);
          setServerError(errorMessage); // Set server error message
          throw new Error('Login failed');
        }

        const role = await response.text();
        console.log("Login Success!!");
        switch (role.toLowerCase()) {
          case 'admin':
            navigate("/admindashboard");
            break;
          case 'manager':
            navigate("/managerdashboard");
            break;
          case 'stocksupervisor':
            navigate("/stocksupervisordashboard");
            break;
          case 'supervisor':
            navigate("/supervisordashboard");
            break;
          default:
            throw new Error('Unknown role');
        }
      } catch (error) {
        console.error('Error during login:', error);
      }
    } else {
      console.error('Form validation errors:', validationErrors);
    }
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'left',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            top: 300,
            left: 180,
            color: 'white',
            bgcolor: 'rgba(0, 0, 0, 0.5)',
            padding: '10px 20px',
            borderRadius: '5px',
          }}
        >
          <Typography variant="h2" component="h6">
            Tool Management System
          </Typography>
        </Box>
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              backgroundColor: 'rgba(200,200,200)',
              padding: '100px',
              borderRadius: '8px',
            }}
          >
            <Box component="img" src={companyLogo} alt="Company Logo" sx={{ width: 100, height: 100, mb: 1 }} />
            <Typography component="h1" variant="h3">
              Login
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={values.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={values.password}
                onChange={handleChange}
                error={!!errors.password}
                helperText={errors.password}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Login
              </Button>
              {serverError && (
                <Typography color="error" variant="body2">
                  {serverError}
                </Typography>
              )}
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

export default NewLogin;

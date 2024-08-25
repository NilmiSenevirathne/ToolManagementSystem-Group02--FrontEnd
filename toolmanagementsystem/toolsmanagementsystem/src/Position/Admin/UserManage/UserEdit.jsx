import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { 
  CssBaseline, Container, Grid, TextField, Button, Typography, Paper, Box, IconButton 
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import AdminSidebar from '../../../Components/Sidebar/AdminSidebar.jsx';
import NewNav from "../../../Components/Navbar/NewNav.jsx";

const UserEdit = () => {
    const [user, setUser] = useState({
        contact: "",
        firstname: "",
        lastname: "",
        nic: "",
        password: "",
        confirmPassword: "",
        role: "",
        username: ""
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        loadUser();
    }, []);

    const loadUser = async () => {
        try {
            const result = await axios.get(`http://localhost:8080/authentication/${id}`);
            setUser(result.data);
        } catch (error) {
            console.error("Error occurred:", error);
        }
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUser(prevUser => ({ ...prevUser, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (user.password !== user.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        try {
            await axios.put(`http://localhost:8080/authentication/${id}`, user);
            alert("User updated successfully");
            navigate("/usernamage");
        } catch (error) {
            console.error("Error occurred:", error);
        }
    };

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
                        Update User Details Form
                    </Typography>

                    <Paper elevation={3} style={{ padding: '60px' }}>
                        <form onSubmit={handleSubmit}>
                            <Grid container spacing={2}>
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
                                        onChange={handleInputChange}
                                        variant="outlined"
                                        InputProps={{ readOnly: true }}
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

export default UserEdit;

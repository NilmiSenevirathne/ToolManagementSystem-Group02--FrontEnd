import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  CssBaseline,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
} from "@mui/material";
import AdminSidebar from "../../../Components/Sidebar/AdminSidebar.jsx";
import NewNav from "../../../Components/Navbar/NewNav.jsx";

const UserManage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const result = await axios.get("http://localhost:8080/authentication/getUsertoolbox");
      setUsers(result.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const deleteUser = async (id) => {
    try {
      // Fetch the user details to check the role
      const response = await axios.get(`http://localhost:8080/authentication/${id}`);
      const user = response.data;

      // Check if the user role is "Admin"
      if (user.role === "Admin") {
        alert("Cannot delete an Admin user.");
        return; // Exit the function to prevent deletion
      }

      // Proceed with deletion if the user is not an Admin
      await axios.delete(`http://localhost:8080/authentication/${id}`);
      alert("User deleted successfully.");
      loadUsers(); // Function to refresh user list after deletion
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Failed to delete user. Please try again.");
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
        <div style={{ margin: '20px' }}>
          <Typography variant="h4" gutterBottom>
            Welcome to User Details Section!
          </Typography>

          <TableContainer component={Paper} style={{ maxHeight: 400 }}>
            <Table stickyHeader aria-label="User Details Table" sx={{ borderCollapse: 'separate', borderSpacing: 0, '& .MuiTableCell-root': { border: '1px solid rgba(224,224,224,1)' } }}>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', backgroundColor: 'grey', color: 'white' }}>User Id</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', backgroundColor: 'grey', color: 'white' }}>Contact</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', backgroundColor: 'grey', color: 'white' }}>First Name</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', backgroundColor: 'grey', color: 'white' }}>Last Name</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', backgroundColor: 'grey', color: 'white' }}>NIC</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', backgroundColor: 'grey', color: 'white' }}>Password</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', backgroundColor: 'grey', color: 'white' }}>Role</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', backgroundColor: 'grey', color: 'white' }}>Username</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', backgroundColor: 'grey', color: 'white' }}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.userid}>
                    <TableCell sx={{ textAlign: 'center' }}>{user.userid}</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>{user.contact}</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>{user.firstname}</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>{user.lastname}</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>{user.nic}</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>{'*'.repeat(user.password.length)}</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>{user.role}</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>{user.username}</TableCell>
                    <TableCell>
                      <Link to={`/UserEdit/${user.userid}`}>
                        <Button variant="contained" sx={{ bgcolor: 'purple', size: "small" }} style={{ marginRight: '10px' }}>
                          Edit
                        </Button>
                      </Link>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => deleteUser(user.userid)}
                        sx={{ bgcolor: 'red', size: "small" }}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </Grid>
    </Grid>
  );
};

export default UserManage;

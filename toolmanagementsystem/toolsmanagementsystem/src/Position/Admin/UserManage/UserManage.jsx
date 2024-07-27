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
import AdminNavbar from "../../../Components/Navbar/Adminnavbar.jsx";



const UserManage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const result = await axios.get("http://localhost:8080/authentication/getUsertoolbox");
    setUsers(result.data);
  };

  const deleteUser = async (id) => {
    await axios.delete(`http://localhost:8080/authentication/${id}`);
    loadUsers();
  };

  return (
    <Grid container>
      <CssBaseline />
      <Grid item>
        <AdminSidebar />
      </Grid>
      <Grid item xs>
        <AdminNavbar />
        <Box sx={{ padding: 3 ,marginLeft:'300px'}}>
          <Typography variant="h4" gutterBottom>
            User Management
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>User Id</TableCell>
                  <TableCell>Contact</TableCell>
                  <TableCell>First Name</TableCell>
                  <TableCell>Last Name</TableCell>
                  <TableCell>NIC</TableCell>
                  <TableCell>Password</TableCell>
                  <TableCell>Role</TableCell>
                  <TableCell>Username</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user, index) => (
                  <TableRow key={user.userid}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{user.contact}</TableCell>
                    <TableCell>{user.firstname}</TableCell>
                    <TableCell>{user.lastname}</TableCell>
                    <TableCell>{user.nic}</TableCell>
                    <TableCell>{user.password}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>
                      <Link
                        className="btn btn-primary mx-2"
                        to={`/ViewUser/${user.userid}`}
                      >
                        View
                      </Link>
                      <Link
                        className="btn btn-outline-primary mx-2"
                        to={`/UserEdit/${user.userid}`}
                      >
                        Edit
                      </Link>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => deleteUser(user.userid)}
                        sx={{ mx: 2 }}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Grid>
    </Grid>
  );
};

export default UserManage;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import ManagerSidebar from '../../../../Components/ManagerSidebar.jsx';
import ReactPaginate from 'react-paginate'; // Import React Paginate
import './Home.css';
import ManagerNavbar from '../../../../Components/Navbar/ManagerNavbar.jsx';
import { Grid, Container, Typography, Box, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

export default function Home() {
  const [projects, setProjects] = useState([]); // To store the list of projects
  const [pageNumber, setPageNumber] = useState(0); // State to track current page number
  const [searchTerm, setSearchTerm] = useState(''); // State for search term

  const projectsPerPage = 2; // Number of projects to show per page
  const pagesVisited = pageNumber * projectsPerPage;

  useEffect(() => {
    loadProjects();
  }, []);

  const { projectId } = useParams();

  const loadProjects = async () => {
    try {
      const result = await axios.get("http://localhost:8080/Projects");
      setProjects(result.data);
    } catch (error) {
      console.error("Error loading projects:", error);
      alert("Error loading projects. Please check the console for more details.");
    }
  };

  const deleteProject = async (projectId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this project?");
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:8080/Projects/${projectId}`);
        loadProjects();
      } catch (error) {
        console.error("Error deleting project:", error);
        alert("Error deleting project. Please check the console for more details.");
      }
    }
  };

 

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredProjects = projects.filter((project) =>
    project.projectId.toString().includes(searchTerm) ||
    project.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.siteSupervisorID.toString().includes(searchTerm) ||
    project.siteSupervisorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.locationId.toString().includes(searchTerm) ||
    project.locationName.toString().includes(searchTerm.toLowerCase()) ||
    project.startDate.includes(searchTerm) ||
    project.endDate.includes(searchTerm)
  );

  const displayProjects = filteredProjects
    .slice(pagesVisited, pagesVisited + projectsPerPage) // Get the projects for the current page
    .map((project, index) => (
      <TableRow key={index}>
        <TableCell>{pagesVisited + index + 1}</TableCell>
        <TableCell>{project.projectId}</TableCell>
        <TableCell>{project.projectName}</TableCell>
        <TableCell>{project.description}</TableCell>
        <TableCell>{project.siteSupervisorID}</TableCell>
        <TableCell>{project.siteSupervisorName}</TableCell>
        <TableCell>{project.locationId}</TableCell>
        <TableCell>{project.locationName}</TableCell>
        <TableCell>{project.startDate}</TableCell>
        <TableCell>{project.endDate}</TableCell>
        <TableCell>
          <Button variant="contained" color="primary" component={Link} to={`/UpdateProjects/${project.projectId}`}>
            Edit
          </Button>
        </TableCell>
        <TableCell>
          <Button variant="contained" color="secondary" onClick={() => deleteProject(project.projectId)}>
            Delete
          </Button>
        </TableCell>
      </TableRow>
    ));

  const pageCount = Math.ceil(filteredProjects.length / projectsPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <Grid container>
      <Grid item>
        <ManagerSidebar />
      </Grid>
      <Grid item xs>
        <ManagerNavbar />
        <Container maxWidth="lg">
          <Box mt={4}>
            <Typography variant="h4" align="center" gutterBottom>
              Welcome to Project Details
            </Typography>
            <Box mb={2} display="flex" justifyContent="space-between">
              <TextField
                label="Search Projects"
                variant="outlined"
                value={searchTerm}
                onChange={handleSearchChange}
                fullWidth
              />
              <Button
                variant="contained"
                color="primary"
                component={Link}
                to="/addprojects"
                style={{ marginLeft: '20px' }}
              >
                Add Projects
              </Button>
            </Box>
            <TableContainer component={Paper}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell>#</TableCell>
                    <TableCell>Project ID</TableCell>
                    <TableCell>Project Name</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Site Supervisor ID</TableCell>
                    <TableCell>Site Supervisor Name</TableCell>
                    <TableCell>Location ID</TableCell>
                    <TableCell>Location Name</TableCell>
                    <TableCell>Start Date</TableCell>
                    <TableCell>End Date</TableCell>
                    <TableCell>Action</TableCell>
                    <TableCell>Action</TableCell>
                    
                  </TableRow>
                </TableHead>
                <TableBody>
                  {displayProjects}
                </TableBody>
              </Table>
            </TableContainer>
            <Box mt={2} display="flex" justifyContent="center">
              <ReactPaginate
                previousLabel={"Previous"}
                nextLabel={"Next"}
                pageCount={pageCount}
                onPageChange={changePage}
                containerClassName={"pagination"}
                previousLinkClassName={"previousBttn"}
                nextLinkClassName={"nextBttn"}
                disabledClassName={"paginationDisabled"}
                activeClassName={"paginationActive"}
              />
            </Box>
          </Box>
        </Container>
      </Grid>
    </Grid>
  );
}

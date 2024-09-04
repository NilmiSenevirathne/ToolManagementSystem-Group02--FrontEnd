import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import ManagerSidebar from '../../../../Components/ManagerSidebar.jsx';
import ReactPaginate from 'react-paginate'; // Import React Paginate
import './Home.css';
import NewNav from '../../../../Components/Navbar/NewNav.jsx';

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
        <TableCell >{pagesVisited + index + 1}</TableCell>
        <TableCell sx={{ textAlign: 'center' }}>{project.projectId}</TableCell>
        <TableCell sx={{ textAlign: 'center' }}>{project.projectName}</TableCell>
        <TableCell sx={{ textAlign: 'center' }}>{project.description}</TableCell>
        <TableCell sx={{ textAlign: 'center' }}>{project.siteSupervisorID}</TableCell>
        <TableCell sx={{ textAlign: 'center' }}>{project.siteSupervisorName}</TableCell>
        <TableCell sx={{ textAlign: 'center' }}>{project.locationId}</TableCell>
        <TableCell sx={{ textAlign: 'center' }}>{project.locationName}</TableCell>
        <TableCell sx={{ textAlign: 'center' }}>{project.startDate}</TableCell>
        <TableCell sx={{ textAlign: 'center' }}>{project.endDate}</TableCell>
        <TableCell>
          <Button variant="contained" sx={{ bgcolor: 'purple', size:"small" }} component={Link} to={`/UpdateProjects/${project.projectId}`}>
            Update
          </Button>
        </TableCell>
        <TableCell>
          <Button variant="contained" sx={{ bgcolor: 'red', size:"small" }} onClick={() => deleteProject(project.projectId)}>
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
        <NewNav />
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
               
                component={Link}
                to="/addprojects"
                sx={{ bgcolor: 'green', width: '100%', maxWidth: '100px', fontSize: '1.25rem' }}
                style={{ marginLeft: '20px' }}
              >
                Add Projects
              </Button>
            </Box>

            <TableContainer component={Paper} style={{ maxHeight: 400 }}>
              <Table stickyHeader aria-label="sticky table" sx={{ borderCollapse: 'separate', borderSpacing: 0 ,'& .MuiTableCell-root':{border:'1px solid rgba(224,224,224,1)',} ,}}>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', backgroundColor: 'grey', color: 'white'   }}>#</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', backgroundColor: 'grey', color: 'white'   }}>Project ID</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', backgroundColor: 'grey', color: 'white'   }}>Project Name</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', backgroundColor: 'grey', color: 'white'   }}>Description</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', backgroundColor: 'grey', color: 'white'   }}>Site Supervisor ID</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', backgroundColor: 'grey', color: 'white'   }}>Site Supervisor Name</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', backgroundColor: 'grey', color: 'white'   }}>Location ID</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', backgroundColor: 'grey', color: 'white'   }}>Location Name</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', backgroundColor: 'grey', color: 'white'   }}>Start Date</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', backgroundColor: 'grey', color: 'white'   }}>End Date</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', backgroundColor: 'grey', color: 'white'   }}>Action</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', backgroundColor: 'grey', color: 'white'   }}>Action</TableCell>
                    
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

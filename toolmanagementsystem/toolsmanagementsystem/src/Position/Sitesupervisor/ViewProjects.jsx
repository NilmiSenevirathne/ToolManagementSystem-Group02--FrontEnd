import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import Sbar from "../../Components/Sbar";

const ViewProjects = () => {
  const [projects, setProjects] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const response = await axios.get('http://localhost:8080/Projects');
      setProjects(response.data);
    } catch (error) {
      console.error("Error loading projects:", error);
    }
  };

  const filteredProjects = projects.filter(project =>
    project.projectId.toString().toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.projectName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <Sbar/>
    <Box sx={{ padding: 2, marginLeft: '330px' }}> {/* Added marginLeft */}
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        View Projects Details
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
        <IconButton sx={{ marginRight: 1 }}>
          <SearchIcon />
        </IconButton>
        <TextField
          placeholder="Search projects using project ID or project name"
          variant="outlined"
          fullWidth
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Project ID</TableCell>
              <TableCell>Project Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Site Supervisor ID</TableCell>
              <TableCell>Site Supervisor Name</TableCell>
              <TableCell>Location ID</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredProjects.map((project) => (
              <TableRow key={project.projectId}>
                <TableCell>{project.projectId}</TableCell>
                <TableCell>{project.projectName}</TableCell>
                <TableCell>{project.description}</TableCell>
                <TableCell>{project.siteSupervisorID}</TableCell>
                <TableCell>{project.siteSupervisorName}</TableCell>
                <TableCell>{project.locationId}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
    </div>
  );
}

export default ViewProjects;

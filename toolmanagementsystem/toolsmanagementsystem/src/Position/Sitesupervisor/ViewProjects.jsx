import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Grid, CssBaseline,
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
import NewNav from '../../Components/Navbar/NewNav.jsx';


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

    <Grid container>
      <CssBaseline />
    
      <Grid item>
      <Sbar/>
      </Grid>

      <Grid item xs>
      <NewNav />

    <div style={{ margin: '20px' }}>
    <Box sx={{ padding: 2, marginLeft: '200px' }}> {/* Added marginLeft */}
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

      <TableContainer component={Paper} style={{ maxHeight: 400 }}>
        <Table stickyHeader aria-label="Tools Table" sx={{ borderCollapse: 'separate', borderSpacing: 0 ,'& .MuiTableCell-root':{border:'1px solid rgba(224,224,224,1)',} ,}}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', backgroundColor: 'grey', color: 'white'   }}>Project ID</TableCell>
              <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', backgroundColor: 'grey', color: 'white'   }}>Project Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', backgroundColor: 'grey', color: 'white'   }}>Description</TableCell>
              <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', backgroundColor: 'grey', color: 'white'   }}>Site Supervisor ID</TableCell>
              <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', backgroundColor: 'grey', color: 'white'   }}>Site Supervisor Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', backgroundColor: 'grey', color: 'white'   }}>Location ID</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredProjects.map((project) => (
              <TableRow key={project.projectId}>
                <TableCell sx={{ textAlign: 'center' }}>{project.projectId}</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>{project.projectName}</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>{project.description}</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>{project.siteSupervisorID}</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>{project.siteSupervisorName}</TableCell>
                <TableCell sx={{ textAlign: 'center' }}>{project.locationId}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
    </div>
    </Grid>
    </Grid>
  );
}

export default ViewProjects;

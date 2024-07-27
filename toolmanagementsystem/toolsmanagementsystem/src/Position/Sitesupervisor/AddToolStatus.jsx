import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import Sbar from '../../Components/Sbar';

const AddToolStatus = () => {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState('');
  const [reportPdf, setReportPdf] = useState(null);
  const [reportId, setReportId] = useState(null);

  useEffect(() => {
    // Fetch projects from backend
    const fetchProjects = async () => {
      try {
        const response = await axios.get('http://localhost:8080/Projects');
        setProjects(response.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
        alert('An error occurred while fetching projects.');
      }
    };

    fetchProjects();
  }, []);

  const handleProjectChange = (e) => {
    setSelectedProject(e.target.value);
  };

  const handleReportPdfChange = (e) => {
    setReportPdf(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Confirmation dialog
    const isConfirmed = window.confirm('Are you sure you want to submit?');
    if (!isConfirmed) {
      return;
    }

    // Create FormData object
    const formData = new FormData();
    formData.append('projectName', selectedProject); // Ensure field name matches backend
    formData.append('reportPdf', reportPdf); // Ensure field name matches backend

    try {
      // Send POST request
      const response = await axios.post('http://localhost:8080/api/toolboxstatus', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Update state with response data
      setReportId(response.data.reportId);

      // Clear form fields
      setSelectedProject('');
      setReportPdf(null);
      alert('Report details added successfully!');
    } catch (error) {
      console.error('Error adding report details:', error);
      alert('An error occurred while adding report details.');
    }
  };

  return (
    <Container>
      <Sbar />
      <Paper
        style={{
          marginLeft: '300px',
          backgroundSize: 'cover',
          padding: '20px',
          borderRadius: '8px',
          marginTop: '20px',
        }}
      >
        <Typography variant="h4" gutterBottom>
          Add Tool Status Reports
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel htmlFor="project">Project Name</InputLabel>
                <Select
                  id="project"
                  value={selectedProject}
                  onChange={handleProjectChange}
                >
                  {projects.map((project) => (
                    <MenuItem key={project.projectId} value={project.projectName}>
                      {project.projectName}   
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type="file"
                label="Report PDF"
                InputLabelProps={{ shrink: true }}
                onChange={handleReportPdfChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
        {reportId && (
          <Typography variant="body1" style={{ marginTop: '20px' }}>
            Generated Report ID: {reportId}
          </Typography>
        )}
        <Link to="/ViewToolStatusReports" style={{ textDecoration: 'none' }}>
          <Button variant="outlined" color="primary" sx={{ mt: 2 }}>
            View Tool Status Reports
          </Button>
        </Link>
      </Paper>
    </Container>
  );
};

export default AddToolStatus;

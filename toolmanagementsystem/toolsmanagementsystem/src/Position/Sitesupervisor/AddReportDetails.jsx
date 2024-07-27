import React, { useState, useEffect } from 'react';
import axios from 'axios';
import backgroundImage from '../../images/new.webp'; 
import { Link } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  InputLabel,
  Input,
  FormControl,
  FormHelperText,
  Paper,
  Container,
  Grid,
  Select,
  MenuItem
} from '@mui/material';
import Sbar from '../../Components/Sbar';

const AddReportDetails = () => {
  const [projects, setProjects] = useState([]); // State to store fetched projects
  const [selectedProject, setSelectedProject] = useState(''); // State to store selected project
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
    const isConfirmed = window.confirm("Are you sure you want to submit?");
    if (!isConfirmed) {
      return;
    }

    // Create FormData object
    const formData = new FormData();
    formData.append('projectName', selectedProject); // Use selectedProject for submission
    formData.append('reportPdf', reportPdf);

    try {
      // Send POST request to backend API to add report details
      const response = await axios.post('http://localhost:8080/api/reports', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      // Extract and set the generated Report ID from the response
      setReportId(response.data.reportId);
      
      // Clear form fields after successful submission
      setSelectedProject('');
      setReportPdf(null);
      alert('Report details added successfully!');
    } catch (error) {
      console.error('Error adding report details:', error);
      alert('An error occurred while adding report details.');
    }
  };

  return (
    <div>
      <Sbar />
      <Box sx={{ marginLeft: '300px', backgroundSize: 'cover', minHeight: '100vh', padding: 3 }}>
        <Container component={Paper} sx={{ padding: 4, maxWidth: 600, mx: 'auto', backgroundColor: 'white' }}>
          <Typography variant="h4" gutterBottom>
            Add Required Report Details
          </Typography>
          <form onSubmit={handleSubmit}>
            <FormControl fullWidth margin="normal">
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
              <FormHelperText>Select the project associated with the report.</FormHelperText>
            </FormControl>
            
            <FormControl fullWidth margin="normal">
              <InputLabel htmlFor="reportPdf">Report PDF</InputLabel>
              <Input
                id="reportPdf"
                type="file"
                onChange={handleReportPdfChange}
              />
            </FormControl>
            
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
            >
              Submit
            </Button>
          </form>
          
          {reportId && (
            <Typography variant="body1" sx={{ mt: 2 }}>
              Generated Report ID: {reportId}
            </Typography>
          )}

          <Link to="/ViewRequiredToolReports" style={{ textDecoration: 'none' }}>
            <Button
              variant="outlined"
              color="primary"
              sx={{ mt: 2 }}
            >
              View Required Tool Reports
            </Button>
          </Link>
        </Container>
      </Box>
    </div>
  );
};

export default AddReportDetails;

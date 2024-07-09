import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Container, TextField, Button, Typography, Paper, Grid, InputLabel, FormControl, Input } from '@mui/material';
import Sbar from '../../Components/Sbar';

const AddToolStatus = () => {
    const [projectName, setProjectName] = useState('');
    const [reportPdf, setReportPdf] = useState(null);
    const [reportId, setReportId] = useState(null);

    const handleProjectNameChange = (e) => {
        setProjectName(e.target.value);
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
        formData.append('projectName', projectName);
        formData.append('reportPdf', reportPdf); // Ensure field name matches backend

        try {
            // Send POST request
            const response = await axios.post('http://localhost:8080/api/toolboxstatus', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            // Update state with response data
            setReportId(response.data.reportId);

            // Clear form fields
            setProjectName('');
            setReportPdf(null);
            alert('Report details added successfully!');
        } catch (error) {
            console.error('Error adding report details:', error);
            alert('An error occurred while adding report details.');
        }
    };

    return (
        <Container>
            <Sbar/>
            <Paper
                style={{
                    marginLeft:'300px',
                    backgroundSize: 'cover',
                    padding: '20px',
                    borderRadius: '8px',
                    marginTop: '20px'
                }}
            >
                <Typography variant="h4" gutterBottom>
                    Add Tool Status Reports
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Project Name"
                                id="projectName"
                                value={projectName}
                                onChange={handleProjectNameChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel htmlFor="reportPdf">Report PDF</InputLabel>
                                <Input
                                    type="file"
                                    id="reportPdf"
                                    onChange={handleReportPdfChange}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                            >
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
        <Link to="/ViewRequiredToolReports" style={{ textDecoration: 'none' }}>
          <Button
            variant="outlined"
            color="primary"
            sx={{ mt: 2 }}
          >
            View Required Tool Reports
          </Button>
        </Link>
            </Paper>
        </Container>
    );
};

export default AddToolStatus;

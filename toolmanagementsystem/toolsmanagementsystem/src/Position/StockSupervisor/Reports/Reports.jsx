import React, { useState, useEffect } from 'react';
import StockSidebar from '../../../Components/Sidebar/StockSidebar.jsx';
import NewNav from '../../../Components/Navbar/NewNav.jsx';
import axios from 'axios';
import { Grid, Table, TableHead, TableRow, TableCell, TableBody, Container, Typography, Box } from '@mui/material';

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [error, setError] = useState(null); // State to handle error

  useEffect(() => {
    // Function to load reports when component mounts
    loadReports();
  }, []);

  const loadReports = async () => {
    try {
      const result = await axios.get("http://localhost:8080/api/reports/getreports");
      setReports(result.data);
    } catch (error) {
      console.error("Error fetching reports:", error);
      setError("Failed to fetch reports. Please try again later."); // Set error state
    }
  };

  const handleCheckToggle = (reportId) => {
    setReports(reports.map(report => 
      report.report_id === reportId 
      ? { ...report, checked: !report.checked } 
      : report
    ));
  };

  return (
    <Grid container>
      <Grid item>
        <StockSidebar />
      </Grid>

      <Grid item xs>
        <NewNav />

        <Container maxWidth="lg">
          <Box mt={4}>
            <Typography variant="h4" align="center" gutterBottom>
              Welcome to Report Section!
            </Typography>
            
            {/* Render error message if error state is set */}
            {error && <Typography color="error" align="center">{error}</Typography>}

            <Table stickyHeader aria-label="Reports Table" sx={{ borderCollapse: 'separate', borderSpacing: 0, '& .MuiTableCell-root': { border: '1px solid rgba(224,224,224,1)' } }}>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', color: 'white', background: 'grey' }}>Report ID</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', color: 'white', background: 'grey' }}>Created Date</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', color: 'white', background: 'grey' }}>Project Name</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', color: 'white', background: 'grey' }}>Report Data</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', color: 'white', background: 'grey' }}>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {reports.map((report, index) => (
                  <TableRow 
                    key={index} 
                    onClick={() => handleCheckToggle(report.report_id)} 
                    sx={{
                      backgroundColor: report.checked ? '#d3ffd3' : '#ffd3d3', // Highlight based on checked status
                      cursor: 'pointer'
                    }}
                  >
                    <TableCell align="center">{report.report_id}</TableCell>
                    <TableCell align="center">{report.created_at}</TableCell>
                    <TableCell align="center">{report.project_name}</TableCell>
                    <TableCell align="center">
                      <a href={`data:application/pdf;base64,${report.report_data}`} download={`Report_${report.report_id}.pdf`}>
                        Download
                      </a>
                    </TableCell>
                    <TableCell align="center">
                      {report.checked ? 'Checked' : 'Unchecked'}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </Container>
      </Grid>
    </Grid>
  );
};

export default Reports;

import React, { useState, useEffect } from 'react';
import StockSidebar from '../../../Components/Sidebar/StockSidebar.jsx';
import StockSupervisorNavbar from '../../../Components/Navbar/StockSupervisorNavbar.jsx';
import axios from 'axios';
import {Grid , Table, TableHead, TableRow, TableCell, TableBody, Container, Typography, Box} from '@mui/material';

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

  return (
    
    <Grid container>
        <Grid item >
            <StockSidebar/>
        </Grid>

        <Grid item xs>
            <StockSupervisorNavbar/>

            <Container maxWidth="lg">
          <Box mt={4}>
            <Typography variant="h4" align="center" gutterBottom>
              Welcome to Report Section!
            </Typography>
            
            {/* Render error message if error state is set */}
            {error && <Typography color="error" align="center">{error}</Typography>}

            <Table stickyHeader aria-label="Reports Table" sx={{ borderCollapse: 'separate', borderSpacing: 0,'& .MuiTableCell-root':{border:'1px solid rgba(224,224,224,1)',} , }}>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', color: 'white', background:'grey' }}>Report ID</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', color: 'white', background:'grey' }}>Created Date</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', color: 'white', background:'grey' }}>Project Name</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', color: 'white' , background:'grey'}}>Report Data</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {reports.map((report, index) => (
                  <TableRow key={index}>
                    <TableCell align="center">{report.report_id}</TableCell>
                    <TableCell align="center">{report.created_at}</TableCell>
                    <TableCell align="center">{report.project_name}</TableCell>
                    <TableCell align="center">
                      {/* Assuming report_data is base64 encoded PDF data */}
                      <a href={`data:application/pdf;base64,${report.report_data}`} download={`Report_${report.report_id}.pdf`}>
                        Download
                      </a>
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

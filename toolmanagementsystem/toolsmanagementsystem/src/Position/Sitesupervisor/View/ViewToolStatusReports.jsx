import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    CssBaseline,
    Grid,
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    TextField,
    IconButton,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from '@mui/material';
import { Search as SearchIcon, Delete as DeleteIcon, Visibility as VisibilityIcon } from '@mui/icons-material';
import Sbar from '../../../Components/Sbar';
import NewNav from '../../../Components/Navbar/NewNav.jsx';

const ViewToolStatusReports = () => {
    const [reports, setReports] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedReportData, setSelectedReportData] = useState(null);

    useEffect(() => {
        loadReports();
    }, []);

    const loadReports = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/toolboxstatus/getToolstatus');
            setReports(response.data);
        } catch (error) {
            console.error("Error loading tool status reports:", error);
        }
    }

    const deleteReport = async (reportId) => {
        try {
            const confirmDelete = window.confirm("Do you surely want to delete this tool status report?");
            if (confirmDelete) {
                await axios.delete(`http://localhost:8080/api/toolboxstatus/${reportId}`);
                loadReports(); // Refresh the reports list
            }
        } catch (error) {
            console.error("Error deleting tool status report:", error);
        }
    }

    const filteredReports = reports.filter(report =>
        report.projectName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const base64ToPdfSrc = (base64) => {
        return `data:application/pdf;base64,${base64}`;
    };

    const handleViewPdfClick = (reportData) => {
        setSelectedReportData(reportData);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedReportData(null);
    };

    return (
    <Grid container>
        <CssBaseline />
        <Grid item>
            <Sbar/></Grid>
        <Grid item xs>
          <NewNav />

        <Box sx={{ padding: 2 ,marginLeft: '200px'}}>
            <Typography variant="h4" sx={{ marginBottom: 2 }}>View Tool Status Reports</Typography>
            
            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
                <SearchIcon sx={{ marginRight: 1 }} />
                <TextField
                    variant="outlined"
                    placeholder="Search by project name"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    fullWidth
                />
            </Box>
            <TableContainer component={Paper} style={{ maxHeight: 400 }}>
                <Table stickyHeader aria-label="View Tool Reports Table" sx={{ borderCollapse: 'separate', borderSpacing: 0 ,'& .MuiTableCell-root':{border:'1px solid rgba(224,224,224,1)',} ,}}>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', backgroundColor: 'grey', color: 'white'   }}>Report Id</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', backgroundColor: 'grey', color: 'white'   }}>Created At</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', backgroundColor: 'grey', color: 'white'   }}>Project Name</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', backgroundColor: 'grey', color: 'white'   }}>Report Data</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', backgroundColor: 'grey', color: 'white'   }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredReports.map((report) => (
                            <TableRow key={report.reportId}>
                                <TableCell>{report.reportId}</TableCell>
                                <TableCell>{report.created_at}</TableCell>
                                <TableCell>{report.projectName}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleViewPdfClick(report.statusPdf)}>
                                        <VisibilityIcon />
                                    </IconButton>
                                </TableCell>
                                <TableCell>
                                    <IconButton onClick={() => deleteReport(report.reportId)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
                maxWidth="lg"
                fullWidth
            >
                <DialogTitle>View PDF</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        You can view the PDF by clicking the button below.
                    </DialogContentText>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                            const src = base64ToPdfSrc(selectedReportData);
                            window.open(src, '_blank', 'noopener,noreferrer');
                            handleCloseDialog();
                        }}
                    >
                        Open PDF
                    </Button>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
        </Grid>
        
        </Grid>
    );
};

export default ViewToolStatusReports;

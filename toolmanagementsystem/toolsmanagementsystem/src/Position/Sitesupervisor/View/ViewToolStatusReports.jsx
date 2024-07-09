import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
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
        <div>
            <Sbar/>
        <Box sx={{ padding: 2 ,marginLeft: '350px'}}>
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
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Report Id</TableCell>
                            <TableCell>Created At</TableCell>
                            <TableCell>Project Name</TableCell>
                            <TableCell>Report Data</TableCell>
                            <TableCell>Actions</TableCell>
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
        </div>
    );
};

export default ViewToolStatusReports;

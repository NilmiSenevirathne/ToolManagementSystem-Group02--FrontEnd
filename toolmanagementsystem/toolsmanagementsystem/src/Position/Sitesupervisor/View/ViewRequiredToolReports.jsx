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

const ViewRequiredToolReports = () => {
    const [reports, setReports] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [editingReport, setEditingReport] = useState(null);
    const [updatedProjectName, setUpdatedProjectName] = useState('');
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedReportData, setSelectedReportData] = useState(null);

    useEffect(() => {
        loadReports();
    }, []);

    const loadReports = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/reports/getReqTool');
            setReports(response.data);
        } catch (error) {
            console.error("Error loading reports:", error);
        }
    }

    const deleteReport = async (reportId) => {
        try {
            const confirmDelete = window.confirm("Do you surely want to delete this report?");
            if (confirmDelete) {
                await axios.delete(`http://localhost:8080/api/reports/${reportId}`);
                loadReports(); // Refresh the reports list
            }
        } catch (error) {
            console.error("Error deleting report:", error);
        }
    }

    const filteredReports = reports.filter(report =>
        report.project_name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const base64ToImageSrc = (base64) => {
        const byteCharacters = atob(base64);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: 'application/pdf' });
        return URL.createObjectURL(blob);
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
        
        <Box sx={{ padding: 2  ,marginLeft: '350px'}}>
            <Typography variant="h4" sx={{ marginBottom: 2 }}>View Required Tool Reports</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
                <SearchIcon sx={{ marginRight: 1 }} />
                <TextField
                    variant="outlined"
                    placeholder="Search tools using project name"
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
                            <TableRow key={report.report_id}>
                                <TableCell>{report.report_id}</TableCell>
                                <TableCell>{report.created_at}</TableCell>
                                <TableCell>
                                    {editingReport && editingReport.report_id === report.report_id ? (
                                        <TextField
                                            value={updatedProjectName}
                                            onChange={(e) => setUpdatedProjectName(e.target.value)}
                                            fullWidth
                                        />
                                    ) : (
                                        report.project_name
                                    )}
                                </TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleViewPdfClick(report.report_data)}>
                                        <VisibilityIcon />
                                    </IconButton>
                                </TableCell>
                                <TableCell>
                                    <IconButton onClick={() => deleteReport(report.report_id)}>
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
                            const src = base64ToImageSrc(selectedReportData);
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

export default ViewRequiredToolReports;

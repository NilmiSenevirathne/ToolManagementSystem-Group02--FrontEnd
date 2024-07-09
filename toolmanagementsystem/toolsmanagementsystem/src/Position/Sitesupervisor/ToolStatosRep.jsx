import React, { useState, useEffect } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import {
    Box,
    Typography,
    TextField,
    Button,
    Grid,
    Card,
    CardContent,
    CardActions,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Divider
} from '@mui/material';
import { ArrowDownward as ArrowDownwardIcon } from '@mui/icons-material';
import Sbar from "../../Components/Sbar";

const ToolStatosRep = () => {
    const [toolboxtool, setTools] = useState([]);
    const [selectedTool, setSelectedTool] = useState({});
    const [toolStatus, setToolStatus] = useState('');
    const [currentDate, setCurrentDate] = useState('');
    const [currentTime, setCurrentTime] = useState('');
    const [reports, setReports] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        loadTools();
        setCurrentDate(new Date().toLocaleDateString());
        setCurrentTime(new Date().toLocaleTimeString());
    }, []);

    const loadTools = async () => {
        try {
            const result = await axios.get('http://localhost:8080/getToolboxTools');
            setTools(result.data);
        } catch (error) {
            console.error("Error loading tools:", error);
        }
    };

    const handleToolClick = (tool) => {
        setSelectedTool(tool);
    };

    const handleToolStatusChange = (e) => {
        setToolStatus(e.target.value);
    };

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredTools = toolboxtool.filter(tool =>
        tool.toolBoxId.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const generatePDF = async () => {
        if (!selectedTool || !toolStatus) {
            alert('Please select a tool and add tool status.');
            return;
        }

        const doc = new jsPDF();
        doc.setFontSize(12);
        const lineHeight = 10;

        doc.text(`Generated Date: ${currentDate}`, 10, 10);
        doc.text(`Generated Time: ${currentTime}`, 10, 20);

        doc.text(`Tool Box Id: ${selectedTool.toolBoxId}`, 10, 30);
        doc.text(`Tools:`, 10, 40);

        const tools = selectedTool.tools.split(',').map(tool => tool.trim());
        tools.forEach((tool, index) => {
            doc.text(tool, 30, 40 + (index * lineHeight));
        });

        doc.text(`Project Id: ${selectedTool.project_id}`, 10, 50 + (tools.length * lineHeight));
        doc.text(`Site Supervisor Id: ${selectedTool.site_supervisor_id}`, 10, 60 + (tools.length * lineHeight));
        doc.text(`Tool Status: ${toolStatus}`, 10, 70 + (tools.length * lineHeight));

        const pdfBlob = doc.output('blob');
        const formData = new FormData();
        formData.append('statusPdf', pdfBlob, `report_${selectedTool.toolBoxId}.pdf`);

        try {
            const response = await axios.post('http://localhost:8080/addToolstatus', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            const pdfUrl = URL.createObjectURL(pdfBlob);
            setReports([...reports, { url: pdfUrl, date: currentDate, time: currentTime }]);
            alert(response.data.message);
        } catch (error) {
            console.error('Error uploading PDF:', error);
            alert('Failed to upload the PDF report.');
        }
    };

    return (
      <div>
        <Sbar/>
        <Box sx={{ padding: 3 ,marginLeft:'310px'}}>
            <Typography variant="h4" gutterBottom>
                Tool Status Report
            </Typography>
            <Button
                variant="contained"
                color="primary"
                onClick={() => window.scrollTo(0, document.body.scrollHeight)}
                endIcon={<ArrowDownwardIcon />}
                sx={{ mb: 2 }}
            >
                Go to Report Generation
            </Button>
            

            <TextField
                label="Search by Tool Box ID"
                variant="outlined"
                fullWidth
                value={searchQuery}
                onChange={handleSearch}
                sx={{ mb: 2 }}
            />
             <Grid item xs={12}>
                    <Typography variant="h6" gutterBottom>
                        Tool List
                    </Typography>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Tool Box Id</TableCell>
                                    <TableCell>Tools</TableCell>
                                    <TableCell>Project Id</TableCell>
                                    <TableCell>Site Supervisor Id</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredTools.map((tool) => (
                                    <TableRow
                                        key={tool.toolBoxId}
                                        hover
                                        onClick={() => handleToolClick(tool)}
                                    >
                                        <TableCell>{tool.toolBoxId}</TableCell>
                                        <TableCell>{tool.tools}</TableCell>
                                        <TableCell>{tool.project_id}</TableCell>
                                        <TableCell>{tool.site_supervisor_id}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>

            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h6">Tool Box Details</Typography>
                            <TextField
                                fullWidth
                                margin="normal"
                                label="Tool Box Id"
                                value={selectedTool.toolBoxId || ''}
                                InputProps={{ readOnly: true }}
                            />
                            <TextField
                                fullWidth
                                margin="normal"
                                label="Tools"
                                multiline
                                rows={5}
                                value={selectedTool.tools || ''}
                                InputProps={{ readOnly: true }}
                            />
                            <TextField
                                fullWidth
                                margin="normal"
                                label="Project Id"
                                value={selectedTool.project_id || ''}
                                InputProps={{ readOnly: true }}
                            />
                            <TextField
                                fullWidth
                                margin="normal"
                                label="Site Supervisor Id"
                                value={selectedTool.site_supervisor_id || ''}
                                InputProps={{ readOnly: true }}
                            />
                            <TextField
                                fullWidth
                                margin="normal"
                                label="Tool Status"
                                multiline
                                rows={5}
                                value={toolStatus}
                                onChange={handleToolStatusChange}
                            />
                        </CardContent>
                        <CardActions>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={generatePDF}
                            >
                                Generate PDF
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>

               

                <Grid item xs={12}>
                    <Typography variant="h6" gutterBottom>
                        Report Table
                    </Typography>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Date</TableCell>
                                    <TableCell>Time</TableCell>
                                    <TableCell>Download</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {reports.map((report, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{report.date}</TableCell>
                                        <TableCell>{report.time}</TableCell>
                                        <TableCell>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                href={report.url}
                                                download={`report_${index}.pdf`}
                                            >
                                                Download Report
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </Box>
        </div>
    );
};

export default ToolStatosRep;

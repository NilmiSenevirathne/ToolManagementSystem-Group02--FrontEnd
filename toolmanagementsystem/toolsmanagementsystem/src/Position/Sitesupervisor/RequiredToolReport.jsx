import React, { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import {
  Box,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Checkbox,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Sbar from "../../Components/Sbar";

const RequiredToolReport = () => {
  const [tools, setTools] = useState([]);
  const [selectedTools, setSelectedTools] = useState([]);
  const [reportGenerated, setReportGenerated] = useState(false);
  const [reportData, setReportData] = useState([]);
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadTools();
    loadProjects();
  }, []);

  const loadTools = async () => {
    try {
      const response = await axios.get('http://localhost:8080/tool/gettools');
      setTools(response.data);
    } catch (error) {
      console.error("Error loading tools:", error);
    }
  };

  const loadProjects = async () => {
    try {
      const response = await axios.get('http://localhost:8080/Projects');
      setProjects(response.data);
    } catch (error) {
      console.error("Error loading projects:", error);
    }
  };

  const handleToolSelect = (tool) => {
    setSelectedTools((prevSelectedTools) =>
      prevSelectedTools.includes(tool)
        ? prevSelectedTools.filter((selectedTool) => selectedTool !== tool)
        : [...prevSelectedTools, tool]
    );
  };

  const generateReport = () => {
    if (!selectedProject) {
      alert("Please select a project!");
      return;
    }

    if (selectedTools.length === 0) {
      alert("Please select relevant tools for the project!");
      return;
    }

    const report = generatePDF(selectedTools);
    setReportData([...reportData, report]);
    setReportGenerated(true);
    setSelectedProject(''); // Clear selected project
    setSelectedTools([]); // Clear selected tools
    alert("Report generated successfully!");
  };

  const generatePDF = (selectedTools) => {
    const doc = new jsPDF();
    const currentTime = new Date().toLocaleString();

    // Set font styles
    doc.setFont('helvetica');
    doc.setFontSize(14);

    // Add report title
    doc.setTextColor(44, 62, 80); // Dark blue
    doc.text('Selected Tools Report', 105, 20, { align: 'center' });

    // Add project name
    doc.setTextColor(44, 62, 80); // Dark blue
    doc.setFontSize(12);
    doc.text(`Project Name: ${selectedProject}`, 105, 30, { align: 'center' });

    // Add date and time
    doc.setTextColor(44, 62, 80); // Dark blue
    doc.text(`Date and Time: ${currentTime}`, 105, 40, { align: 'center' });

    // Add selected tools
    doc.setTextColor(20, 62, 80); // Dark blue
    doc.setFontSize(12);

    // Add selected tools to the PDF
    doc.text('Required Tools:', 10, 60);

    selectedTools.forEach((tool, index) => {
      doc.text(`${index + 1}. Tool Id: ${tool.toolId}`, 20, 70 + index * 20);
      doc.text(`   Tool Name: ${tool.toolName}`, 20, 75 + index * 20);
    });

    // Save the PDF
    const pdfData = doc.output();
    const pdfBlob = new Blob([pdfData], { type: 'application/pdf' });
    const pdfUrl = URL.createObjectURL(pdfBlob);

    return { data: pdfUrl, date: currentTime, projectName: selectedProject };
  };

  const filteredTools = Array.isArray(tools)
    ? tools.filter((tool) =>
        tool.toolId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.toolName.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <div>
      <Sbar />
      <Box sx={{ padding: 3, marginLeft: '310px' }}>
        <Typography variant="h4" gutterBottom>
          Required Tool Reports
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <IconButton color="primary">
            <SearchIcon />
          </IconButton>
          <TextField
            label="Search tools using tool id or tool name"
            variant="outlined"
            fullWidth
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ ml: 1 }}
          />
        </Box>

        <TableContainer component={Paper} sx={{ mb: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Tool Id</TableCell>
                <TableCell>Tool Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Allocate Tool</TableCell>
                <TableCell>Available Tool</TableCell>
                <TableCell>Select</TableCell>
              </TableRow>
            </TableHead>
            <TableBody sx={{ maxHeight: 230, overflowY: 'auto' }}>
              {filteredTools.map((tool) => (
                <TableRow key={tool.toolId}>
                  <TableCell>{tool.toolId}</TableCell>
                  <TableCell>{tool.toolName}</TableCell>
                  <TableCell>{tool.description}</TableCell>
                  <TableCell>{tool.quantity}</TableCell>
                  <TableCell>{tool.allocatedTool}</TableCell>
                  <TableCell>{tool.availableTool}</TableCell>
                  <TableCell>
                    <Checkbox
                      checked={selectedTools.includes(tool)}
                      onChange={() => handleToolSelect(tool)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <FormControl variant="outlined" fullWidth sx={{ mb: 2 }}>
          <InputLabel>Select Project</InputLabel>
          <Select
            value={selectedProject}
            onChange={(e) => setSelectedProject(e.target.value)}
            label="Select Project"
          >
            {projects.map((project) => (
              <MenuItem key={project.projectId} value={project.projectName}>
                {project.projectName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button
          variant="contained"
          color="primary"
          onClick={generateReport}
        >
          Generate Report
        </Button>

        <Box sx={{ mt: 3 }}>
          <Typography variant="h6" gutterBottom>
            Report Table
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Date and Time</TableCell>
                  <TableCell>Project Name</TableCell>
                  <TableCell>Report</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {reportData.map((report, index) => (
                  <TableRow key={index}>
                    <TableCell>{report.date}</TableCell>
                    <TableCell>{report.projectName}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="primary"
                        href={report.data}
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
        </Box>
      </Box>
    </div>
  );
};

export default RequiredToolReport;

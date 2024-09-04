import React, { useState, useEffect } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import {
  CssBaseline,
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
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Checkbox,
  FormControlLabel,
  ListItemText, // Import ListItemText here
} from "@mui/material";
import { ArrowDownward as ArrowDownwardIcon } from "@mui/icons-material";
import Sbar from "../../Components/Sbar";
import NewNav from '../../Components/Navbar/NewNav.jsx';


const ToolStatosRep = () => {
  const [toolboxtool, setTools] = useState([]);
  const [selectedTools, setSelectedTools] = useState([]);
  const [toolStatuses, setToolStatuses] = useState({});
  const [currentDate, setCurrentDate] = useState("");
  const [currentTime, setCurrentTime] = useState("");
  const [reports, setReports] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    loadTools();
    const date = new Date();
    setCurrentDate(date.toLocaleDateString());
    setCurrentTime(date.toLocaleTimeString());
  }, []);

  const loadTools = async () => {
    try {
      const result = await axios.get("http://localhost:8080/toolbox/gettoolbox");
      setTools(result.data);
    } catch (error) {
      console.error("Error loading tools:", error);
    }
  };

  const handleToolSelect = (tool) => {
    setSelectedTools((prevSelectedTools) => {
      const isSelected = prevSelectedTools.some(t => t.toolbox_id === tool.toolbox_id);
      if (isSelected) {
        return prevSelectedTools.filter(t => t.toolbox_id !== tool.toolbox_id);
      } else {
        return [...prevSelectedTools, tool];
      }
    });
  };

  const handleToolStatusChange = (toolName, status) => {
    setToolStatuses((prevStatuses) => ({
      ...prevStatuses,
      [toolName]: status,
    }));
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredTools = toolboxtool.filter((tool) =>
    tool.toolbox_id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const generatePDF = () => {
    if (selectedTools.length === 0 || Object.values(toolStatuses).some(status => !status)) {
      alert("Please select tools and add status for all selected tools.");
      return;
    }

    if (!window.confirm("Do you want to generate the report?")) {
      return;
    }

    const doc = new jsPDF();
    doc.setFontSize(12);
    const lineHeight = 10;
    const pageWidth = doc.internal.pageSize.getWidth();
    let y = 10;

    doc.text(`Generated Date: ${currentDate}`, 10, y);
    y += lineHeight;
    doc.text(`Generated Time: ${currentTime}`, 10, y);
    y += lineHeight;

    selectedTools.forEach((tool) => {
      doc.text(`Tool Box Id: ${tool.toolbox_id}`, 10, y);
      y += lineHeight;
      doc.text(`Project Id: ${tool.project_id}`, 10, y);
      y += lineHeight;
      doc.text(`Site Supervisor Id: ${tool.site_supervisor_id}`, 10, y);
      y += lineHeight;
      doc.text(`Location Id: ${tool.location_id}`, 10, y);
      y += lineHeight;
      doc.text(
        `Created Date: ${new Date(tool.createdDate).toLocaleDateString()}`,
        10,
        y
      );
      y += lineHeight;
      doc.text("Selected Tools and Statuses:", 10, y);
      y += lineHeight;

      tool.selectedTools.forEach((toolName, index) => {
        doc.text(`${index + 1}. ${toolName} - Status: ${toolStatuses[toolName] || "Not provided"}`, 20, y);
        y += lineHeight;
        if (y > doc.internal.pageSize.getHeight() - 20) {
          doc.addPage();
          y = 10;
        }
      });
    });

    const pdfBlob = doc.output("blob");
    const pdfUrl = URL.createObjectURL(pdfBlob);

    const newReport = {
      date: currentDate,
      time: currentTime,
      url: pdfUrl,
    };

    setReports([...reports, newReport]);
  };

  return (
    <Grid container>
      <CssBaseline />

      <Grid item>  <Sbar /></Grid>

      <Grid item xs>
        <NewNav />  

      <div style={{ margin: '20px' }}>
      <Box sx={{ padding: 3, marginLeft: "200px" }}>
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
          <TableContainer component={Paper} style={{ maxHeight: 400 }}>
            <Table tickyHeader aria-label="Tools Table" sx={{ borderCollapse: 'separate', borderSpacing: 0 ,'& .MuiTableCell-root':{border:'1px solid rgba(224,224,224,1)',} ,}}>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', backgroundColor: 'grey', color: 'white'   }}>Select</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', backgroundColor: 'grey', color: 'white'   }}>Tool Box Id</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', backgroundColor: 'grey', color: 'white'   }}>Project Id</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', backgroundColor: 'grey', color: 'white'   }}>Site Supervisor Id</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', backgroundColor: 'grey', color: 'white'   }}>Location Id</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', backgroundColor: 'grey', color: 'white'   }}>Created Date</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', backgroundColor: 'grey', color: 'white'   }}>Selected Tools</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredTools.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7}>No tools found</TableCell>
                  </TableRow>
                ) : (
                  filteredTools.map((tool) => (
                    <TableRow
                      key={tool.toolbox_id}
                      hover
                      onClick={() => handleToolSelect(tool)}
                    >
                      <TableCell>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={selectedTools.some(t => t.toolbox_id === tool.toolbox_id)}
                              onChange={() => handleToolSelect(tool)}
                            />
                          }
                          label=""
                        />
                      </TableCell>
                      <TableCell>{tool.toolbox_id}</TableCell>
                      <TableCell>{tool.project_id}</TableCell>
                      <TableCell>{tool.site_supervisor_id}</TableCell>
                      <TableCell>{tool.location_id}</TableCell>
                      <TableCell>
                        {new Date(tool.createdDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell>{tool.selectedTools.join(", ")}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6">Tool Box Details</Typography>
                {selectedTools.length > 0 && (
                  <>
                    <TextField
                      fullWidth
                      margin="normal"
                      label="Tool Box Id"
                      value={selectedTools.map(tool => tool.toolbox_id).join(", ")}
                      InputProps={{ readOnly: true }}
                    />
                    <TextField
                      fullWidth
                      margin="normal"
                      label="Project Id"
                      value={selectedTools.map(tool => tool.project_id).join(", ")}
                      InputProps={{ readOnly: true }}
                    />
                    <TextField
                      fullWidth
                      margin="normal"
                      label="Site Supervisor Id"
                      value={selectedTools.map(tool => tool.site_supervisor_id).join(", ")}
                      InputProps={{ readOnly: true }}
                    />
                    <TextField
                      fullWidth
                      margin="normal"
                      label="Location Id"
                      value={selectedTools.map(tool => tool.location_id).join(", ")}
                      InputProps={{ readOnly: true }}
                    />
                    <TextField
                      fullWidth
                      margin="normal"
                      label="Created Date"
                      value={selectedTools.map(tool => new Date(tool.createdDate).toLocaleDateString()).join(", ")}
                      InputProps={{ readOnly: true }}
                    />
                    <FormControl fullWidth margin="normal">
                      <InputLabel>Select Damaged Tools</InputLabel>
                      <Select
                        multiple
                        value={Object.keys(toolStatuses)}
                        onChange={(e) => {
                          const selectedToolStatuses = e.target.value.reduce((acc, toolName) => {
                            acc[toolName] = toolStatuses[toolName] || "";
                            return acc;
                          }, {});
                          setToolStatuses(selectedToolStatuses);
                        }}
                        renderValue={(selected) => selected.join(", ")}
                      >
                        {selectedTools.flatMap(tool => tool.selectedTools).map((toolName, index) => (
                          <MenuItem key={index} value={toolName}>
                            <Checkbox checked={Object.keys(toolStatuses).includes(toolName)} />
                            <ListItemText primary={toolName} />
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    {Object.keys(toolStatuses).map((toolName) => (
                      <TextField
                        key={toolName}
                        fullWidth
                        margin="normal"
                        label={`Status for ${toolName}`}
                        value={toolStatuses[toolName] || ""}
                        onChange={(e) => handleToolStatusChange(toolName, e.target.value)}
                      />
                    ))}
                  </>
                )}
              </CardContent>
              <CardActions>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={generatePDF}
                >
                  Generate PDF Report
                </Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6">Generated Reports</Typography>
            <ul>
              {reports.map((report, index) => (
                <li key={index}>
                  <Typography variant="body2">
                    Date: {report.date}, Time: {report.time}
                  </Typography>
                  <Button
                    href={report.url}
                    target="_blank"
                    variant="contained"
                    color="primary"
                  >
                    Download PDF
                  </Button>
                </li>
              ))}
            </ul>
          </Grid>
        </Grid>
      </Box>
    </div>
    </Grid>
    </Grid>
  );
};

export default ToolStatosRep;

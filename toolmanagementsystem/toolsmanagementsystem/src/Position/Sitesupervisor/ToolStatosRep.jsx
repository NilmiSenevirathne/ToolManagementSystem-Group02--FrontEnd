import "./toolStatRep.css";
import axios from "axios";
import { useState, useEffect } from "react";
import SearchIcon from '@mui/icons-material/Search';
import jsPDF from 'jspdf';

const ToolStatosRep = () => {
  const [toolbox, setTools] = useState([]);
  const [selectedTool, setSelectedTool] = useState(null);
  const [status, setStatus] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [details, setDetails] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    loadTools();
    // Set current date and time when component mounts
    setCurrentDate(new Date().toLocaleDateString());
    setCurrentTime(new Date().toLocaleTimeString());
  }, []);

  const loadTools = async () => {
    const result = await axios.get('http://localhost:8080/gettoolbox');
    setTools(result.data);
  };
  

  const handleToolSelect = (tool) => {
    setSelectedTool(tool);
    setStatus(tool.status); // Assuming tool.status is the status of the tool
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedTool) {
      console.error("No tool selected");
      return;
    }

    try {
      // Create a new PDF document
      const doc = new jsPDF();

      // Set up the content of the PDF document
      doc.text(`Tool ID: ${selectedTool.toolId}`, 10, 10);
      doc.text(`Tool Name: ${selectedTool.toolName}`, 10, 20);
      doc.text(`Status: ${status}`, 10, 30);
      doc.text(`Additional Details: ${details}`, 10, 40);
      // Add other tool details as needed
      doc.text(`Report generated on: ${currentDate} ${currentTime}`, 10, 50);

      // Save the PDF document
      const filename = `tool_report_${currentDate.replace(/\//g, "_")}_${currentTime.replace(/:/g, "-")}.pdf`;
      doc.save(filename);

      console.log("PDF report generated successfully");
    } catch (error) {
      console.error("Error generating PDF report:", error);
    }
  };

  const filteredTools = toolbox.filter(toolbox=>
    toolbox.toolbox_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    toolbox.project_id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className='Createp'>
      <div className="topbarcontainer">
        <div className="topbartext">
          Tool Status Report
        </div>
      </div>

      <div className="searchbar">
        <SearchIcon className="searchIcon" />
        <input
          placeholder="Search tools using tool id or tool name"
          className="searchInput"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="table">
        <table className="table caption-top">
          {/* Table header */}
          <thead>
            <tr>
              <th scope="col">Tool Box Id</th>
              <th scope="col">Project Id</th>
              <th scope="col">Site Supervisor Id</th>
              <th scope="col">Location Id</th>
             
            </tr>
          </thead>
          {/* Table body */}
          <tbody style={{ maxHeight: "230px", overflowY: "auto" }}>
            {filteredTools.map((toolbox) => (
              <tr key={toolbox.toolbox_id} onClick={() => handleToolSelect(toolbox)}>
                <td>{toolbox.project_id}</td>
                <td>{toolbox.site_supervisor_id}</td>
                <td>{toolbox.location_id}</td>
                
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Display selected tool details and status update form */}
      {selectedTool && (
        <div className="tool-details">
          <h2>Selected Tool Details</h2>
          <p>Tool ID: {selectedTool.toolId}</p>
          <p>Tool Name: {selectedTool.toolName}</p>
          {/* Add other tool details as needed */}

          {/* Status update form */}
          <form onSubmit={handleSubmit} className="status-form">
            <fieldset>
              <legend>General Information</legend>
              <label>
                Status:
                <input
                  type="text"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                />
              </label>
            </fieldset>

            <fieldset>
              <legend>Additional Details</legend>
              <label>
                Additional Details:
                <input
                  type="text"
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                />
              </label>
            </fieldset>

            <button type="submit">Generate Report</button>
          </form>
        </div>
      )}

      {/* Download link for the generated report */}
      {selectedTool && (
        <div className="download-link">
          <p>Report generated on: {currentDate} {currentTime}</p>
          <button onClick={handleSubmit}>Download Report</button>
        </div>
      )}
    </div>
  );
};

export default ToolStatosRep;

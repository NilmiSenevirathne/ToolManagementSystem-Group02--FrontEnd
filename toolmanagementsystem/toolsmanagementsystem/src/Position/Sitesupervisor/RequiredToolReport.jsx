import jsPDF from 'jspdf';
import "./requiredToolReports.css"
import SearchIcon from '@mui/icons-material/Search';

import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";


const RequiredToolReport = () => {
  const [tools, setTools] = useState([]);
  const [selectedTools, setSelectedTools] = useState([]);
  const [reportGenerated, setReportGenerated] = useState(false);
  const [reportData, setReportData] = useState([]);
  const [projectName, setProjectName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadTools();
  }, []);

  const loadTools = async () => {
    const result = await axios.get('http://localhost:8080/gettools')
    setTools(result.data);
  }

  const handleToolSelect = (tool) => {
    setSelectedTools((prevSelectedTools) =>
      prevSelectedTools.includes(tool)
        ? prevSelectedTools.filter((selectedTool) => selectedTool !== tool)
        : [...prevSelectedTools, tool]
    );
  };

  const generateReport = () => {
    if (!projectName) {
      window.alert("Please enter the project name!");
      return;
    }

    if (selectedTools.length === 0) {
      window.alert("Please select relevant tools for the project!");
      return;
    }
    const report = generatePDF(selectedTools);
    setReportData([...reportData, report]);
    setReportGenerated(true);
    setProjectName(''); // Clear project name
    setSelectedTools([]); // Clear selected tools
    window.alert("Report generated successfully!");
  };

  function generatePDF(selectedTools) {
    const doc = new jsPDF();
    const currentTime = new Date().toLocaleString();

    // Set font styles
    doc.setFont('helvetica');
    doc.setFontSize(14);

    // Add report title
    doc.setTextColor(44, 62, 80); // Dark blue
    doc.text('Selected Tools Report', 105, 20, null, null, 'center');

    // Add project name
    doc.setTextColor(44, 62, 80); // Dark blue
    doc.setFontSize(12);
    doc.text(`Project Name: ${projectName}`, 105, 30, null, null, 'center');

    // Add date and time
    doc.setTextColor(44, 62, 80); // Dark blue
    doc.text(`Date and Time: ${currentTime}`, 105, 40, null, null, 'center');

    // Add selected tools
    doc.setTextColor(20, 62, 80); // Dark blue
    doc.setFontSize(12);

    // Add selected tools to the PDF
    doc.text('Required Tools:', 10, 60);

    // Calculate the total height required for the selected tools
    const totalHeight = selectedTools.length * 20;
    const maxSectionHeight = 230; // Maximum height for the section
    let currentHeight = 0;

    selectedTools.forEach((tool, index) => {
      if (currentHeight < maxSectionHeight) {
        doc.text(`${index + 1}. Tool Id: ${tool.toolId}`, 20, 70 + index * 20);
        doc.text(`   Tool Name: ${tool.toolName}`, 20, 75 + index * 20);
        currentHeight += 20;
      }
    });

    // If the selected tools exceed the maximum height, add a scroll bar
    if (totalHeight > maxSectionHeight) {
      doc.setDrawColor(0); // Sets the color of the lines to black
      doc.setLineWidth(0.5); // Sets the line width to 0.5mm
      doc.rect(10, 70, 185, maxSectionHeight); // Draw a rectangle for the scrollable area
    }

    // Save the PDF
    const pdfData = doc.output();
    const pdfBlob = new Blob([pdfData], { type: 'application/pdf' });
    const pdfUrl = URL.createObjectURL(pdfBlob);

    // window.open(pdfUrl);
    return { data: pdfUrl, date: currentTime, projectName: projectName };
  }

  const filteredTools = tools.filter(tool =>
    tool.toolId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tool.toolName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="rep">
      <div className='Createp'>
        <div className="topbarcontainer">
          <div className="topbartext">
            Required Tool Reports
          </div>
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
          <thead>
            <tr>
              <th scope="col">Tool Id</th>
              <th scope="col">Tool Name</th>
              <th scope="col">Description</th>
              <th scope="col">Quantity</th>
              <th scope="col">Allocate Tool</th>
              <th scope="col">Available Tool</th>
              <th scope="col">Select</th>
            </tr>
          </thead>
          <tbody style={{ maxHeight: "230px", overflowY: "auto" }}>
            {filteredTools.map((tool) => (
              <tr key={tool.toolId}>
                <td>{tool.toolId}</td>
                <td>{tool.toolName}</td>
                <td>{tool.description}</td>
                <td>{tool.quantity}</td>
                <td>{tool.allocatedTool}</td>
                <td>{tool.availableTool}</td>
                <td>
                  <input
                    type="checkbox"
                    onChange={() => handleToolSelect(tool)}
                    checked={selectedTools.includes(tool)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="projectNameInput">
        <input
          type="text"
          placeholder="Enter Project Name"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
        />
      </div>
<div className="btn">
      <div className="btns">
      <div className="cont"> <button onClick={generateReport}>Generate Report</button>
      </div>
      </div>
  </div>

      <div className="reportTable">
        <h2>Report Table</h2>
        <table>
          <thead>
            <tr>
              <th>Date and Time</th>
              <th>Project Name</th>
              <th>Report</th>
            </tr>
          </thead>
          <tbody>
            {reportData.map((report, index) => (
              <tr key={index}>
                <td>{report.date}</td>
                <td>{report.projectName}</td>
                <td>
                  <a href={report.data} download={`report_${index}.pdf`}>Download Report</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="btns">
        <button onClick={() => window.location.href = '/AddReportDetails'}>Add Required Report Details</button>
      </div>
    </div>
  );
}

export default RequiredToolReport;

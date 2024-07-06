import React, { useState, useEffect } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import "./toolStatRep.css";

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
    const lineHeight = 10; // Define a standard line height

    doc.text(`Generated Date: ${currentDate}`, 10, 10);
    doc.text(`Generated Time: ${currentTime}`, 10, 20);

    doc.text(`Tool Box Id: ${selectedTool.toolBoxId}`, 10, 30);
    doc.text(`Tools:`, 10, 40);
    
    // Split tools into multiple lines if necessary
    const tools = selectedTool.tools.split(',').map(tool => tool.trim());
    tools.forEach((tool, index) => {
      doc.text(tool, 30, 40 + (index * lineHeight));
    });

    doc.text(`Project Id: ${selectedTool.project_id}`, 10, 50 + (tools.length * lineHeight));
    doc.text(`Site Supervisor Id: ${selectedTool.site_supervisor_id}`, 10, 60 + (tools.length * lineHeight));
    doc.text(`Tool Status: ${toolStatus}`, 10, 70 + (tools.length * lineHeight));

    // Convert the PDF to a Blob
    const pdfBlob = doc.output('blob');

    // Create FormData and append the PDF
    const formData = new FormData();
    formData.append('statusPdf', pdfBlob, `report_${selectedTool.toolBoxId}.pdf`);

    try {
      // Upload the PDF to the backend
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
    <div className='create-report'>
      <div className="topbar-container">
        <div className="topbar-text">
          Tool Status Report
        </div>
      </div>
      <button className="scroll-btn" onClick={() => window.scrollTo(0, document.body.scrollHeight)}>Go to Report Generation</button>
      <div className="searchbar">
        <input
          type="text"
          placeholder="Search by Tool Box ID"
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>

      <div className="content">
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Tool Box Id</th>
                <th>Tools</th>
                <th>Project Id</th>
                <th>Site Supervisor Id</th>
              </tr>
            </thead>
            <tbody>
              {filteredTools.map((tool) => (
                <tr key={tool.toolBoxId} onClick={() => handleToolClick(tool)}>
                  <td>{tool.toolBoxId}</td>
                  <td>{tool.tools}</td>
                  <td>{tool.project_id}</td>
                  <td>{tool.site_supervisor_id}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="form-container">
          <div className="form">
            <h2>Tool Box Details</h2>
            <div className="form-group">
              <label htmlFor="toolBoxId">Tool Box Id:</label>
              <input type="text" id="toolBoxId" value={selectedTool.toolBoxId || ''} readOnly />
            </div>
            <div className="form-group">
              <label htmlFor="tools">Tools:</label>
              <textarea id="tools" rows="5" value={selectedTool.tools || ''} readOnly />
            </div>
            <div className="form-group">
              <label htmlFor="projectId">Project Id:</label>
              <input type="text" id="projectId" value={selectedTool.project_id || ''} readOnly />
            </div>
            <div className="form-group">
              <label htmlFor="siteSupervisorId">Site Supervisor Id:</label>
              <input type="text" id="siteSupervisorId" value={selectedTool.site_supervisor_id || ''} readOnly />
            </div>
            <div className="form-group">
              <label htmlFor="toolStatus">Tool Status:</label>
              <textarea id="toolStatus" rows="5" value={toolStatus} onChange={handleToolStatusChange} />
            </div>
            <button className="generate-btn" onClick={generatePDF}>Generate PDF</button>
            <button className="add-report-btn" onClick={() => window.location.href = '/AddToolStatus'}>Add Report </button>
          </div>
        </div>
      </div>

    
        <h2>Report Table</h2>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Time</th>
              <th>Download</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report, index) => (
              <tr key={index}>
                <td>{report.date}</td>
                <td>{report.time}</td>
                <td>
                  <a href={report.url} download={`report_${index}.pdf`}>Download Report</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  
  );
};

export default ToolStatosRep;

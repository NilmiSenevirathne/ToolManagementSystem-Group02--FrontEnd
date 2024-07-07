import React, { useState } from 'react';
import axios from 'axios';
import backgroundImage from '../../images/new.webp'; 
import "./addReport.css";

const AddReportDetails = () => {
    const [projectName, setProjectName] = useState('');
    const [reportPdf, setReportPdf] = useState(null);
    const [reportId, setReportId] = useState(null); // State to store generated Report ID
  
    const handleProjectNameChange = (e) => {
      setProjectName(e.target.value);
    };
  
    const handleReportPdfChange = (e) => {
      setReportPdf(e.target.files[0]);
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();

      //confirmation dialog
      const isConfirmed = window.confirm("Are you sure you want to submit?");
      if (!isConfirmed) {
        return; // If the user cancels, do not proceed with the form submission
      }
      
      // Create FormData object to send the file along with other form data
      const formData = new FormData();
      formData.append('projectName', projectName);
      formData.append('reportPdf', reportPdf);
  
      try {
        // Send POST request to backend API to add report details
        const response = await axios.post('http://localhost:8080/api/reports', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        // Extract and set the generated Report ID from the response
        setReportId(response.data.reportId);
        
        // Clear form fields after successful submission
        setProjectName('');
        setReportId('');
        setReportPdf('');
        setReportPdf(null);
        alert('Report details added successfully!');
      } catch (error) {
        console.error('Error adding report details:', error);
        alert('An error occurred while adding report details.');
      }
    };
  
    return (
        <div className="background-container">
          <img src={backgroundImage} alt="Background" className="background-image" />
          <div className="form-container">
            <div className="form-content">
              <h2>Add Required Report Details</h2>
              <form onSubmit={handleSubmit}>
             
                <div className="form-group">
                  <label htmlFor="reportId">Report ID:</label>
                  <input
                    type="text"
                    id="reportId"
                    value={reportId} 
                    readOnly
                  />
                </div>
               
                <div className="form-group">
                  <label htmlFor="projectName">Project Name:</label>
                  <input
                    type="text"
                    id="projectName"
                    value={projectName}
                    onChange={handleProjectNameChange}
                  />
                </div>
               
                <div className="form-group">
                  <label htmlFor="reportPdf">Report PDF:</label>
                  <input
                    type="file"
                    id="reportPdf"
                    onChange={handleReportPdfChange}
                  />
                </div>
               
                <button type="submit" className="submit-button" Link to="/ViewRequiredToolReports">Submit</button>
              </form>
            
              {reportId && <p>Generated Report ID: {reportId}</p>}
            </div>
          </div>
        </div>
    );
};

export default AddReportDetails;

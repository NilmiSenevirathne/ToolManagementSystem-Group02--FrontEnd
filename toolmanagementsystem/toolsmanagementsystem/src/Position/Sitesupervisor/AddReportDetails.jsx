import React, { useState } from 'react';
import axios from 'axios';
import backgroundImage from '../../images/new.webp'; // Import your background image
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
            <div style={{ maxWidth: '600px', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
              <h2>Add Required Report Details</h2>
              <form onSubmit={handleSubmit}>
                {/* Report ID field */}
                <div style={{ marginBottom: '20px' }}>
                  <label htmlFor="reportId" style={{ display: 'block', marginBottom: '5px' }}>Report ID:</label>
                  <input
                    type="text"
                    id="reportId"
                    value={reportId} // Display generated Report ID here
                    style={{ width: '100%', padding: '10px', fontSize: '16px' }}
                  />
                </div>
                {/* Project Name field */}
                <div style={{ marginBottom: '20px' }}>
                  <label htmlFor="projectName" style={{ display: 'block', marginBottom: '5px' }}>Project Name:</label>
                  <input
                    type="text"
                    id="projectName"
                    value={projectName}
                    onChange={handleProjectNameChange}
                    style={{ width: '100%', padding: '10px', fontSize: '16px' }}
                  />
                </div>
                {/* Report PDF field */}
                <div style={{ marginBottom: '20px' }}>
                  <label htmlFor="reportPdf" style={{ display: 'block', marginBottom: '5px' }}>Report PDF:</label>
                  <input
                    type="file"
                    id="reportPdf"
                    onChange={handleReportPdfChange}
                    style={{ width: '100%', padding: '10px', fontSize: '16px' }}
                  />
                </div>
                {/* Submit button */}
                <button type="submit" style={{ background: '#007bff', color: '#fff', padding: '10px 20px', fontSize: '16px', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Submit</button>
              </form>
              {/* Display the generated Report ID if available */}
              {reportId && <p>Generated Report ID: {reportId}</p>}
            </div>
          </div>
        </div>
    );
  };

export default AddReportDetails;

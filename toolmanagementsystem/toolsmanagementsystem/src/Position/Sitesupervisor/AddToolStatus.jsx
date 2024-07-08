import React, { useState } from 'react';
import axios from 'axios';
import backgroundImage from '../../images/new.webp'; 
import "./addReport.css";
import { Link } from 'react-router-dom';

const AddReportDetails = () => {
    const [projectName, setProjectName] = useState('');
    const [reportPdf, setReportPdf] = useState(null);
    const [reportId, setReportId] = useState(null);

    const handleProjectNameChange = (e) => {
        setProjectName(e.target.value);
    };

    const handleReportPdfChange = (e) => {
        setReportPdf(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const isConfirmed = window.confirm("Are you sure you want to submit?");
        if (!isConfirmed) {
            return;
        }

        const formData = new FormData();
        formData.append('projectName', projectName);
        formData.append('reportPdf', reportPdf);

        try {
            const response = await axios.post('http://localhost:8080/api/toolboxstatus', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setReportId(response.data.reportId);
            setProjectName('');
            setReportPdf(null);
            alert('Report details added successfully!');
        } catch (error) {
            console.error('Error adding report details:', error.response ? error.response.data : error.message);
            alert('An error occurred while adding report details.');
        }
    };

    return (
        <div className="background-container">
            <img src={backgroundImage} alt="Background" className="background-image" />
            <div className="form-container">
                <div className="form-content">
                    <h2>Add Tool Status Reports</h2>
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
                        <button type="submit" className="submit-button">Submit</button>
                    </form>
                    {reportId && <p>Generated Report ID: {reportId}</p>}
                    <Link to="/ViewToolStatusReports" className="view-reports-link">View Tool Status Reports</Link>
                </div>
            </div>
        </div>
    );
};

export default AddReportDetails;

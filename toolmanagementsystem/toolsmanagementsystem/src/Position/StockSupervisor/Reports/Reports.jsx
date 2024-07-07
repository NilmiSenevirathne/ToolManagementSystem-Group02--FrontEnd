import React, { useState, useEffect } from 'react';
import StockSidebar from '../../../Components/Sidebar/StockSidebar.jsx';
import axios from 'axios';

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [error, setError] = useState(null); // State to handle error

  useEffect(() => {
    // Function to load reports when component mounts
    loadReports();
  }, []);

  const loadReports = async () => {
    try {
      const result = await axios.get("http://localhost:8080/api/reports/getreports");
      setReports(result.data);
    } catch (error) {
      console.error("Error fetching reports:", error);
      setError("Failed to fetch reports. Please try again later."); // Set error state
    }
  };

  return (
    <StockSidebar>
      <div className='report-content'>
        <h2>Welcome to Report Section!</h2>

        {/* Render error message if error state is set */}
        {error && <p>{error}</p>}

        <div className='reporttable'>
          <table>
            <thead>
              <tr>
                <th scope='col'>Report ID</th>
                <th scope='col'>Created Date</th>
                <th scope='col'>Project Name</th>
                <th scope='col'>Report Data</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report, index) => (
                <tr key={index}>
                  <td>{report.report_id}</td>
                  <td>{report.created_at}</td>
                  <td>{report.project_name}</td>
                  <td>
                    {/* Assuming report_data is base64 encoded PDF data */}
                    <a href={`data:application/pdf;base64,${report.report_data}`} download={`Report_${report.report_id}.pdf`}>
                      Download 
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </StockSidebar>
  );
};

export default Reports;

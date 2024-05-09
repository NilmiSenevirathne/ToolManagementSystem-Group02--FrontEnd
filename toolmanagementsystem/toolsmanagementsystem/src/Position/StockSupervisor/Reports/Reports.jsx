import React, { useState, useEffect } from 'react';
import StockSidebar from '../../../Components/Sidebar/StockSidebar.jsx';
import axios from 'axios';

const Reports = () => {
  const [reports, setReports] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadReports();
  }, []);

  // Fetch reports details from the database
  const loadReports = async () => {
    try {
      const result = await axios.get("http://localhost:8080/reports/getreports");
      setReports(result.data);
    } catch (error) {
      console.error("Error fetching reports:", error);
      alert("Failed to fetch reports. Please try again later.");
    }
  };

  return (
    <StockSidebar>
      <div className='stock-content'>
        <h2>Welcome to Report Section!</h2>

        {error && <p>{error}</p>}

        <div className='reporttable'>
          <table>
            <thead>
              <tr>
                <th scope='col'>Report ID</th>
                <th scope='col'>Created Date</th>
                <th scope='col'>Project Name</th>
                <th scope='col'>Action</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report, index) => (
                <tr key={index}>
                  <td>{report.report_id}</td>
                  <td>{report.created_at}</td>
                  <td>{report.project_name}</td>
                  <td><button>Download</button></td>
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

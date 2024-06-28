<<<<<<< Updated upstream
import React, { useState, useEffect } from 'react';
import StockSidebar from '../../../Components/Sidebar/StockSidebar.jsx';
import DashNavbar from '../../../Components/Navbar/DashNavbar.jsx';
import axios from 'axios';
import './reports.css'

const Reports = () => {
  const [requiredtoolreports, setRequiredtoolreports] = useState([]);
  const [reports, setReports] = useState([]);
  const [error, setError] = useState(null);
=======
import React, { useState, useEffect } from 'react'
import StockSidebar from '../../../Components/Sidebar/StockSidebar.jsx';
import axios from 'axios';

const Reports = () => {
  const [requiredreport , setRequiredReport] = useState([]);
  const [reports , setReports]= useState([]);

  useEffect(() =>{
     loadReport();
  }, []);


   //fetch reports details from the backend
   const loadReport = async () =>{
    try{

      const result  = await axios.get("http://localhost:8080/api/reports/getreports");
      setReports(result.data);
      console.log(result.data);
    }catch (error){
      console.error(" Error fetching report details", error);
    }
   };

  return (
          <StockSidebar>
              <div className='report-content'>
                 <h1>Welcome to Tool Report Section !</h1>

                 <div className='tablesection'>
                 <table className='table'>
                 <thead>
                    <tr>
                       <th scope='col'>ReportID </th>
                       <th scope='col'>Created At</th>
                       <th scope='col'>Action</th>
                  

                    </tr>
                 </thead>
                 <tbody>
                
                  {/*Map over the tools array to render tool details*/}
                  {reports.map ((report,index) =>(
                  <tr key={report.report_id}>
                     
                     <td>{report.report_id}</td>
                     <td>{report.created_at}</td>
                    

                     <td><button>Download</button></td>

                  </tr>


                ))}
                
                 </tbody>
              </table>
                 </div>
              </div>
              </StockSidebar>
       
    
  )
}
>>>>>>> Stashed changes

  useEffect(() => {
    loadReports();
  }, []);

  // Fetch reports details from the database
  const loadReports = async () => {
    try {
      const result = await axios.get("http://localhost:8080/api/reports/getreports");
      setReports(result.data);
    } catch (error) {
      console.error("Error fetching reports:", error);
      alert("Failed to fetch reports. Please try again later.");
    }
  };

   
  return (
    <StockSidebar>
    <DashNavbar/>
      <div className='report-content'>
        <h2>Welcome to Report Section!</h2>

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
                    <a href={`data:image/png;base64,${report.report_data}`} download="ToolReport.pdf">
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

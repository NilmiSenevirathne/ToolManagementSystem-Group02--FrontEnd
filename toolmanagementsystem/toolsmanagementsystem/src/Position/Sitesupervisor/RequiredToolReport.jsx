import jsPDF from 'jspdf';
import "./requiredToolReports.css"
import SearchIcon from '@mui/icons-material/Search';
import GenerateReportReTools from "./GenerateReportReTools";
import axios from "axios";
import {Link} from "react-router-dom"
import { useEffect, useState } from "react";


const RequiredToolReport = () => {
  const [Tool, setTools] = useState([]);
  const [selectedTools, setSelectedTools] = useState([]);
  const [reportGenerated, setReportGenerated] = useState(false);
   
  useEffect(()=>{

  loadTools();
  }, []);
  const loadTools=async()=>{
   const result=await axios.get("http://localhost:8080/gettools")//get tools 
   setTools(result.data);
  };


  const handleToolSelect = (tools) => {
    setSelectedTools((prevSelectedTools) =>
      prevSelectedTools.includes(tools)
        ? prevSelectedTools.filter((selectedTools) => selectedTools !== tools)
        : [...prevSelectedTools, tools]
    );
  };


  const generateReport = () => {
    // Call your function to generate the report
    // You can use selectedTools here to generate the report
    setReportGenerated(true);
  };
  const generatePDF=(selectedTools)=> {
    if (selectedTools.length === 0) {
      alert("Please select at least one tool.");
      return;
    }
    const doc = new jsPDF();
    doc.text('Selected Tools Report', 10, 10);
  
    // Add selected tools to the PDF
    selectedTools.forEach((tools, index) => {
      doc.text(`${index + 1}. ${tools.tool_name}`, 10, 20 + index * 10);
    });
  
    // Save the PDF
    doc.save('selected_tools_report.pdf');
  }
  const generateAndSendReport = () => {
    generatePDF(selectedTools);
  
    // Convert the generated PDF to a blob
    const pdfBlob = new Blob([/* PDF data */], { type: 'application/pdf' });
  
    // Create FormData and append the blob
    const formData = new FormData();
    formData.append('file', pdfBlob, 'selected_tools_report.pdf');
  
    // Send the PDF to the backend
    axios.post('/reports', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(response => {
      console.log(response.data);
    })
    .catch(error => {
      console.error(error);
    });
  };
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
          placeholder="Search tools using tool id"
          className="searchInput"
        />
        </div>
       
     <div className="table">
     <table class="table caption-top">
  
  <thead>
    <tr>
      <th scope="col">Tool Id</th>
      
      <th scope="col">Allocated_quantity</th>
      <th scope="col">Description</th>
      <th scope="col">Saved Quantity</th>
      <th scope="col">Tool Name</th>
      <th scope="col">Tool Image</th>
      <th scope="col">Select</th>
    </tr>
  </thead>
  <tbody>
    {
      Tool.map((tools) =>(
       
     <tr > 
        <td>{tools.tool_id}</td>
        <td>{tools.allocated_quantity}</td>
        <td>{tools.description}</td>
        <td>{tools.saved_quantity}</td>
        <td>{tools.tool_name}</td>
        <td>{tools.image && (
          <img src={'data:image/jpeg;base64,${tools.image}'}
          alt=""
          style={{ width: "100px", height: "auto"}} />
        )}
        </td>
        <td>
                  <input 
                    type="checkbox"
                    onChange={() => handleToolSelect(tools)}
                    checked={selectedTools.includes(tools)}
                  />
                </td>
        
    </tr>
      ))
      }

  </tbody>
</table>
</div>
<div className="generateReportButton">
<Link  className="button" to="/GenerateReportReTools" > 
Generate Report 
       </Link>
      </div>

      {reportGenerated && (
        <div className="reportGeneratedMessage">
          Report generated successfully!
        </div>
      )}
     </div>
  )
}

export default RequiredToolReport

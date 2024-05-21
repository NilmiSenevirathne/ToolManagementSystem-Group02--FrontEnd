import React, { useEffect, useState } from 'react';
import './managestock.css'; 
import axios from "axios";
import { Link , useParams } from 'react-router-dom';
import StockSidebar from '../../../Components/Sidebar/StockSidebar';
import DashNavbar from '../../../Components/Navbar/DashNavbar.jsx';
import { TextField } from '@mui/material'; // Import TextField from Material UI


const ManageStock = () => {
  const [tools ,setTools] = useState([]);
  const [searchTools, setSearchTools] = useState('');
  const {toolId} = useParams();

  useEffect(()=>{
    loadTools();
  },[]);

  // fetch tools details from the backend
  const loadTools = async () => {
    const result = await axios.get("http://localhost:8080/tool/gettools");
    setTools(result.data);
  };

  // delete tool details from the database
  const deleteTool = async (toolId) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this tool?");
    if(!isConfirmed) {
      return;
    }
    try {
      await axios.delete(`http://localhost:8080/tool/delete/${toolId}`);
      loadTools();
      alert("Tool deleted Successfully!")
    } catch (error) {
      alert("Error occurred when deleting the tool!")
    }
  };

  // filter tools based on search query
  const filteredTools = tools.filter(tool =>
    tool.toolId.toLowerCase().includes(searchTools.toLowerCase()) ||
    tool.toolName.toLowerCase().includes(searchTools.toLowerCase())
  );

  return (
    <StockSidebar>
    <DashNavbar/>
      <div className='stock-content'>
        <h1>Welcome to Tool Details Section !</h1>
        
        {/* Add search input field with the search button */}
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
          <TextField
            label="Search Tools"
            variant="outlined"
            fullWidth
            value={searchTools}
            onChange={(e) => setSearchTools(e.target.value)}
            style={{ flex: 1 }}
          />

        </div>

        {/* Display filtered tools in a table */}
        <div className='table-container'>
          <table className='table'>
            <thead>
              <tr>
                <th scope='col'>Tool_ID</th>
                <th scope='col'>ToolName</th>
                <th scope='col'>Description</th>
                <th scope='col'>Quantity</th>
                <th scope='col'>AvailableQunatity</th>
                <th scope='col'>AllocatedQuantity</th>
                <th scope='col'>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* Map over the filtered tools array to render tool details */}
              {filteredTools.map((tool, index) => (
                <tr key={tool.toolId}>
                  <td>{tool.toolId}</td>
                  <td>{tool.toolName}</td>
                  <td>{tool.description}</td>
                  <td>{tool.quantity}</td>
                  <td>{tool.availableQuantity}</td>
                  <td>{tool.allocatedQuantity}</td>
                  <td>
                    <Link to={`/editTool/${tool.toolId}`}><button className='btn-edit'>Update</button></Link>
                    <button className='btn-delete' onClick={() => deleteTool(tool.toolId)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <br/>
        <div><Link to='/addtool'><button className='btn-add'>AddTool</button></Link></div>
      </div>
    </StockSidebar>
  );
};

export default ManageStock;

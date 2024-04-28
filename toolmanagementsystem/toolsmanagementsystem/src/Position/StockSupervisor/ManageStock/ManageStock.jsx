// ManageStock.js

import React, { useEffect, useState } from 'react';
import './managestock.css'; 
import axios from "axios";
import { Link , useParams } from 'react-router-dom';
import StockSidebar from '../../../Components/Sidebar/StockSidebar';


const ManageStock = () => {
  const [tools ,setTools] = useState([]);

  const {toolId} = useParams();

  useEffect(()=>{
    loadTools();
  },[]);

    //fetch tools details from the backend
    const loadTools = async () =>{
      const result = await axios.get("http://localhost:8080/tool/gettools");
      console.log(result.data);
      
      //allocatedQuantity and availableQuantity functionalities
      const updatedTools = result.data.map(tool =>({
        ...tool,
        allocatedQuantity: tool.quantity - tool.availableQuantity,
        availableQuantity: tool.quantity - tool.allocatedQuantity
      }));
      setTools(result.data)
    };
     
   //delete tool details from the database
   const deleteTool = async (toolId) =>{

      // Display confirmation popup
      const isConfirmed = window.confirm("Are you sure you want to delete this tool?");
      if(!isConfirmed){
        return;
      }

      try {
        await axios.delete(`http://localhost:8080/tool/delete/${toolId}`);
        loadTools();
        alert("Tool deleted Successfully!")
      } catch (error) {
        alert(" Error occurred when deleting the tools!")
      }
    };
  

  return (
      <StockSidebar>
        <div className='stock-content'>
          <h1>List of Tools</h1>
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
                
                {/*Map over the tools array to render tool details*/}
                {tools.map ((tool,index) =>(
                  <tr key={tool.toolId}> {/* Add key attribute */}
                     <td>{tool.toolId}</td>
                     <td>{tool.toolName}</td>
                     <td>{tool.description}</td>
                     <td>{tool.quantity}</td>
                     <td>{tool.availableQuantity}</td>
                     <td>{tool.allocatedQuantity }</td>

                     <td>
                      
                        <Link to ={`/editTool/${tool.toolId}`}><button className='btn-edit'>Update</button></Link>
                        <button className='btn-delete' onClick={() => deleteTool(tool.toolId)}>Delete</button> {/* Call deleteTool onClick */}
                        
                     </td>
  
                  </tr>


                ))}
                
              </tbody>
            </table>

           
          </div>
          <Link to ='/addtool'><button className='btn-add'>AddTool</button></Link>
        </div>
        </StockSidebar>
    );
};

export default ManageStock;

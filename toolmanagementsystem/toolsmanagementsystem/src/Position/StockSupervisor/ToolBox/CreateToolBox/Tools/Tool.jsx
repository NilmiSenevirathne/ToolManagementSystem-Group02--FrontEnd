import React, { useEffect, useState } from 'react'
import StockSidebar from '../../../../../Components/Sidebar/StockSidebar'
import axios from "axios";
import { Link , useParams } from 'react-router-dom';
import './tools.css';


const Tool = () => {
  const [tools, setTools] = useState([]);

  useEffect(() => {
    fetchTools();
  }, []);

  const fetchTools = async () => {
    try {
      // Fetch tools data from your API endpoint
      const response = await axios.get('http://localhost:8080/tool/gettools');
      // Set the tools state with the fetched data
      setTools(response.data);
    } catch (error) {
      console.error('Error fetching tools: ', error);
    }
  };

  return (
    <StockSidebar>
        <div className='toolsection'>
          <h1>Tools Section !</h1>

          
           <table className='table'>
              <thead>
                <tr>
                  <th scope='col'>Tool_ID</th>
                  <th scope='col'>ToolName</th>
                  <th scope='col'>Description</th>
                  <th scope='col'>Quantity</th>
                  <th scope='col'>Action</th>

                </tr>
              </thead>
              <tbody className='bodysection'>
                
                {/*Map over the tools array to render tool details*/}
                {tools.map ((tool,index) =>(
                  <tr key={tool.toolId}> {/* Add key attribute */}
                     <td>{tool.toolId}</td>
                     <td>{tool.toolName}</td>
                     <td>{tool.description}</td>
                     <td>{tool.quantity}</td>
                     <td>
                          <Link to= ""><button>AddTool</button></Link>
                          <Link to= ""><button>RemoveTool</button></Link>
                    </td>
  
                  </tr>


                ))}
                
              </tbody>
            </table>
            </div>
            

    </StockSidebar>

  );
};

export default Tool

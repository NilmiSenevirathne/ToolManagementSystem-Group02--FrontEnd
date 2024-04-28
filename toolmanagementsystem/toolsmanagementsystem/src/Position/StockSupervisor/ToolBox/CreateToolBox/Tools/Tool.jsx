import React, { useEffect, useState } from 'react'
import StockSidebar from '../../../../../Components/Sidebar/StockSidebar'
import axios from "axios";
import { Link , useParams } from 'react-router-dom';


const Tool = () => {
  const [tools, setTools] = useState

  return (
    <StockSidebar>
        <div className='toolsection'>
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
                      
                        
                     </td>
  
                  </tr>


                ))}
                
              </tbody>
            </table>
            </div>

    </StockSidebar>

  )
}

export default Tool

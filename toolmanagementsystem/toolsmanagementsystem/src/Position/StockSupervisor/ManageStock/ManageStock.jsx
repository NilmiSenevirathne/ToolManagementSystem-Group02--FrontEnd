import React, { useEffect, useState } from 'react';
import Sidebar from '../../../Components/Sidebar/Sidebar';
import './managestock.css'; 

const ManageStock = () => {
  const [tools ,setTools] = useState([]);

  useEffect(()=>{
    //fetch tools detals from the backend
    const fetchTools = async () =>{
      try{
         const response = await fetch('http://localhost:8080/tool/gettools');
         if(!response.ok){
            throw new Error("Failed to fetch tools");
         }
         const data = await response.json();
         setTools(data);
        }catch (error)
        {
          console.error("Error fetching tools: ",error);
        }
      };
     
  })

  return (
    <div>
      <Sidebar>
        <div className='stock-content'>
          <h1>ManageStock</h1>
          <div className='table-responsive'>
            <table className='table'>
              <thead>
                <tr>
                  <th>Tool_ID</th>
                  <th>ToolName</th>
                  <th>Description</th>
                  <th>SavedQunatity</th>
                  <th>AllocatedQuantity</th>

                </tr>
              </thead>
              <tbody>
                
                {/*Map over the tools array to render tool details*/}
                {tools.map ((tool,index) =>(
                  <tr key={index}>
                     <td>{index.id}</td>
                     <td>{tool.name}</td>
                     <td>{tool.description}</td>
                     <td>{tool.savedQ}</td>
                     <td>{tool.allowQ }</td>
                  </tr>
                ))}
                
              </tbody>
            </table>
          </div>
        </div>
      </Sidebar>
    </div>
  );
};

export default ManageStock;

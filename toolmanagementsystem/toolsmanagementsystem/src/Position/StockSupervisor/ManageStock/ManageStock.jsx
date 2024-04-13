import React, { useEffect, useState } from 'react';
import Sidebar from '../../../Components/Sidebar/Sidebar';
import './managestock.css'; 
import axios from "axios";
import { Link , useParams } from 'react-router-dom';


const ManageStock = () => {
  const [tools ,setTools] = useState([]);

  const {id} = useParams();

  useEffect(()=>{
    loadTools();
  },[]);

    //fetch tools detals from the backend
    const loadTools = async () =>{
      const result = await axios.get("http://localhost:8080/tool/gettools");
      setTools(result.data)
    };
     
  
    {/*delete tool details*/}
    const deleteTool = async (id) =>{
      await axios.delete('http://localhost:8080/tool/delete/{id}');
      loadTools();
    };
  

  return (
    <div>
      <Sidebar>
        <div className='stock-content'>
          <h1>List of Tools</h1>
          <div className='table-responsive'>
            <table className='table'>
              <thead>
                <tr>
                  <th scope='col'>Tool_ID</th>
                  <th scope='col'>ToolName</th>
                  <th scope='col'>Description</th>
                  <th scope='col'>SavedQunatity</th>
                  <th scope='col'>AllocatedQuantity</th>

                </tr>
              </thead>
              <tbody>
                
                {/*Map over the tools array to render tool details*/}
                {tools.map ((tool,index) =>(
                  <tr>
                    <th scope = "row" key={index}>
                      {index + 1}
                    </th>
                     <td>{tool.name}</td>
                     <td>{tool.description}</td>
                     <td>{tool.savedQ}</td>
                     <td>{tool.allowQ }</td>

                   
                     <td>
                        {/*view tools button*/}
                         <Link className='btn btn-primary mx-2' to={'/tool/gettools/${tool.id}'}> View </Link>

                         {/*Add tool button*/}
                         <Link className='btn btn-primary mx-2' to={'/tool/createtool'}> Add </Link>

                         {/*Edit button*/}
                         <Link className='btn btn-outline-primary mx-2' to={'/tool/gettools/${user.id}'}> Edit </Link>

                          {/*Delete button*/}
                          <button className='btn btn-danger mx-2' onClick={() =>deleteTool(tool.id)}>Delete</button>

                     </td>
                     
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

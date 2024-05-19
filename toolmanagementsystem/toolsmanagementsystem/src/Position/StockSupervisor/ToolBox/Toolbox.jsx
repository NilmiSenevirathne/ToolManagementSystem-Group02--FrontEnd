import React, { useEffect, useState } from 'react'
import StockSidebar from '../../../Components/Sidebar/StockSidebar.jsx'
import DashNavbar from '../../../Components/Navbar/DashNavbar.jsx';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import './maintoolbox.css'

const Toolbox = () => {
  const [toolbox , setToolbox] = useState([]);
  const [tools ,setTools] = useState([]);
  

  useEffect(() =>{
    loadToolbox();
  },[]);

  //fetch toolbox details from the backend
  const loadToolbox = async () =>{
    try {
      const result = await axios.get("http://localhost:8080/toolbox/gettoolbox");
      
      

      //allocatedQuantity and availableQuantity functionalities
      const updatedTools = result.data.map(tool =>({
        ...tool,
        allocatedQuantity: tool.quantity - tool.availableQuantity,
        availableQuantity: tool.quantity - tool.allocatedQuantity
      }));
      setTools(result.data)
      console.log(result.data);
    } catch (error) {
      console.error("Error fetching toolbox:", error);
    }
  };

  return (
    <StockSidebar>
    <DashNavbar/>
        <div className='toolbox'>

            <h1>Welcome to ToolBox Details Section!</h1>

            <div className='toolboxsection'>  
            <table className='table'>
              <thead>
                <tr>
                  <th scope='col'>ToolBox ID</th>
                  <th scope='col'>Project ID</th>
                  <th scope='col'>Location ID</th>
                  

                </tr>
              </thead>
              <tbody>
                
                {/*Map over the tools array to render tool details*/}
                {tools.map ((tool,index) =>(
                  <tr key={tool.toolbox_id}> {/* Add key attribute */}
                     
                     <td>{tool.toolbox_id}</td>
                     <td>{tool.project_id}</td>
                     <td>{tool.location_id}</td>

                  </tr>


                ))}
                
              </tbody>
            </table>

            <hr/><br/>
            <div><Link to ='/createtoolbox'><button className='btn-create'>CreateToolBox</button></Link>
            <Link to ='/Stracktoolbox'><button className='btn-track'>TrackToolBox</button></Link></div>
        </div>
        </div>
    </StockSidebar>
  )
}

export default Toolbox

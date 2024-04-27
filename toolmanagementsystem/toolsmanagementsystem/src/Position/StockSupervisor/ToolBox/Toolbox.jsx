import React, { useEffect, useState } from 'react'
import StockSidebar from '../../../Components/Sidebar/StockSidebar.jsx'
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import './maintoolbox.css'

const Toolbox = () => {
  const [toolbox , setToolbox] = useState([]);
  

  useEffect(() =>{
    loadToolbox();
  },[]);

  //fetch toolbox details from the backend
  const loadToolbox = async () =>{
    try {
      const result = await axios.get("http://localhost:8080/toolbox/gettoolbox");
      setToolbox(result.data);
    } catch (error) {
      console.error("Error fetching toolbox:", error);
    }
  };

  return (
    <StockSidebar>
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
                {toolbox.map ((toolboxItem,index) =>(
                  <tr key={toolboxItem.toolboxId}> {/* Add key attribute */}
                     
                     <td>{toolboxItem.toolboxId}</td>
                     <td>{toolboxItem.projectId}</td>
                     <td>{toolboxItem.locationId}</td>

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

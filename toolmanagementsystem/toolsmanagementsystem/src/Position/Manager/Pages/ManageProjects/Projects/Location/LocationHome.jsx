import React, { useEffect,useState } from 'react'
import axios from 'axios';
import {Link} from 'react-router-dom'
import Sidebar from '../../../../../../Components/ManagerSidebar.jsx';

export default function LocationHome() {

    const [location,setlocation]=useState([])
    useEffect (()=>{
      loadLocations();
    },[])
    
    const loadLocations=async()=>{
      const result=await axios.get("http://localhost:8080/locations")
      setlocation(result.data)
    }

  return (
    <div className="container-fluid">
      <div className='py-4'>
      <div className="col-lg-3">
          <Sidebar/>
        </div>
        <div className="col-lg-9">
          <div className="py-4">
              <table className="table border shadow" style={{ maxHeight: '80vh', overflowY: 'auto', maxWidth: '1000px' }} >
                 <thead>
                     <tr>
                          <th scope="col">#</th>
                          <th scope="col">location Name</th>  
                          <th scope="col">location Id</th> 
                          <Link className='btn btn-outline-danger mx-2'to="/AddLocation">Cancel</Link>
                      </tr>
                  </thead>
                  <tbody>
                        {
                          location.map((location,index)=>(
                          <tr>
                          <th scope="row"key={index}>{index+1}</th>
                          <td>{location.locationName}</td>
                          <td>{location.locationId} </td>

                          <td>
                              <button className='btn btn-outline-primary mx-2'>Edit</button>
                              <button className='btn btn-danger mx-2'>Delete</button>
                          </td>
                          </tr>
                          ))
                        } 
                  </tbody>
               </table>
           </div>
      </div>
      </div>
      </div>
    
  )
}

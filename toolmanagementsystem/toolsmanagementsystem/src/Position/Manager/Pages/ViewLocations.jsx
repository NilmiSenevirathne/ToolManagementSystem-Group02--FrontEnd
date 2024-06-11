import React, { useEffect, useState } from 'react';// Import React Router components for navigation and parameter handling
import axios from 'axios';// Import React and hooks
import { Link, useParams } from 'react-router-dom';// Import axios for making HTTP requests
import Sidebar from '../../../Components/ManagerSidebar.jsx';// Import Sidebar component
// import './LocationHome.css';
export default function ViewLocations() {

  const [locations, setLocations] = useState([]);
  
  useEffect (()=>{
    loadLocations();
  },[]);
  
  const { locationId } = useParams();  

  const loadLocations = async () => {
    try {
      const response = await axios.get("http://localhost:8080/locations");
      setLocations(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const deleteLocations = async (locationId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this location?");
    if (confirmDelete) {
      await axios.delete(`http://localhost:8080/location/${locationId}`);
      loadLocations();
    }
  };

  return (
    <Sidebar> 
               <div className='container-fluid'>
               <h2>Location Details</h2>
               <Link className="btn btn-outline-primary mt-2" to="/AddLocation" style={{ 
                    color: "#ffc107", /* Yellow color */
                    borderColor: "#ffc107" /* Yellow color */}}>Add Locations</Link>

               <div className='col-md-10 offset-md-1 border rounded p-4 mt-2 shadow' >

               <div className="py-4" style={{ maxHeight: '70vh', overflowY: 'auto', maxWidth: '1100px' }}>

            <table className="table border shadow">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Location Id</th>
                  <th scope="col">Location Name</th>   
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {locations.map((location, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{location.locationId}</td>
                    <td>{location.locationName}</td>
                    <td>
                      <Link className='btn btn-outline-primary mx-2' to={`/UpdateLocation/${location.locationId}`}>Edit</Link>
                      <button className='btn btn-danger mx-2' onClick={()=>deleteLocations(location.locationId)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
        </div>

    </Sidebar> 
  );
}

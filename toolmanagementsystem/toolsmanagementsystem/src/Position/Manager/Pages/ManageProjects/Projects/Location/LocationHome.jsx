import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import Sidebar from '../../../../../../Components/ManagerSidebar.jsx';

export default function LocationHome() {

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

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-3">
          <Sidebar />
        </div>
        <div className="col-lg-9">
          <br />
          <h2>Location Details</h2>
          <div className="py-4" style={{ maxHeight: '80vh', overflowY: 'auto', maxWidth: '1100px' }}>
            <table className="table border shadow">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Location Name</th>
                  <th scope="col">Location Id</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {locations.map((location, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{location.locationName}</td>
                    <td>{location.locationId}</td>
                    <td>
                      <Link className='btn btn-outline-primary mx-2' to={`/UpdateLocation/${location.locationId}`}>Edit</Link>
                      <button className='btn btn-danger mx-2'>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Link className='btn btn-outline-danger mx-2' to="/AddLocation">Back</Link>

        </div>
      </div>
    </div>
  );
}

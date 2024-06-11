import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import axios from 'axios';
import Sidebar from '../../../../../../Components/ManagerSidebar.jsx';

export default function AddLocation() {
  let navigate = useNavigate();

  const [locations, setLocation] = useState({
    locationId: "",
    locationName: ""
  });

  const { locationId, locationName } = locations;

  const onInputChange = (e) => {
    setLocation({ ...locations, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    // Location Form validation
    if (!locationId || !locationName) {
      alert("Please fill in all fields.");
      return;
    }

    await axios.post("http://localhost:8080/location", locations);
    navigate("/ViewLocations");
  };

  const resetForm = () => {
    setLocation({
      locationId: "",
      locationName: ""
    });
  };

  return (
    <Sidebar>
      <div className='container-fluid'>
        <div className="py-2" style={{ maxHeight: '70vh', maxWidth: '800px' }}>
          <div className='col-md-12 offset-md-3 border rounded p-4 mt-3 shadow'>
            <h2 className='text-center m-4'>Add a New Location</h2>
            <form onSubmit={(e) => onSubmit(e)}>
              <div className='mb-3'>
                <label htmlFor="locationId" className="form-label">Location Id</label>
                <input
                  type="text"
                  className='form-control'
                  placeholder='Enter Location Id'
                  name="locationId"
                  value={locationId}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
              <div className='mb-3'>
                <label htmlFor="locationName" className="form-label">Location Name</label>
                <input
                  type="text"
                  className='form-control'
                  placeholder='Enter Location Name'
                  name="locationName"
                  value={locationName}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
              <div className='d-flex justify-content-between'>
                <Link className='btn btn-outline-danger' to="/addprojects">Back</Link>
                <div>
                  <button type="button" className='btn btn-outline-secondary mx-2' onClick={resetForm}>Clear</button>
                  <button type="submit" className='btn btn-outline-primary'>Submit</button>
                </div>
              </div>
              <br />
            </form>
          </div>
        </div>
      </div>
    </Sidebar>
  );
}

import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from '../../../../../Components/ManagerSidebar.jsx';
import AddProjectsNavbar from './AddProjectNavbar.jsx';

export default function AddProjects() {
  // Get location ids to the dropdown box
  const [locations, setLocations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    try {
      const response = await axios.get("http://localhost:8080/locations");
      setLocations(response.data);
    } catch (error) {
      console.error('Error fetching locations:', error);
    }
  };

  // State to store project details
  const [projects, setProjects] = useState({
    projectId: "",
    projectName: "",
    description: "",
    siteSupervisorID: "",
    siteSupervisorName: "",
    locationId: ""
  });

  const { projectId, projectName, description, siteSupervisorID, siteSupervisorName, locationId } = projects;

  // Function to handle input changes
  const onInputChange = (e) => {
    setProjects({ ...projects, [e.target.name]: e.target.value });
  };

  // Function to handle form submission
  const onSubmit = async (e) => {
    e.preventDefault();
    //Projects form validation- all fields should filled
    if (!projectId || !projectName || !description || !siteSupervisorID || !siteSupervisorName || !locationId) {
      alert("Please fill in all fields.");
      return;
    }
    
    
      await axios.post("http://localhost:8080/project", projects);
      navigate("/manageprojects");
    
  };

  return (
    <div className='container-fluid'>

      <div className="col-lg-3">
      <Sidebar/> 
      </div>
         

      <div className='row'> 
        <div className="col-lg-3">
          <Sidebar/>
        </div>

        <div className="col-lg-9">
        <h2 className='text-center m-4'>Create a New Project</h2>
        <div className='col-md-11 offset-md-1 border rounded p-4 mt-4 shadow' style={{ maxHeight: '80vh', overflowY: 'auto', maxWidth: '800px' }}>
          <form onSubmit={(e) => onSubmit(e)}>
            <div className='mb-3'>
              <label htmlFor="projectId" className="form-label">Project Id</label>
              <input type="text" className='form-control'
                placeholder='Enter Project id'
                name="projectId"
                value={projectId}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className='mb-3'>
              <label htmlFor="Name" className="form-label">Project name</label>
              <input type="text" className='form-control' 
                placeholder='Enter Project Name' 
                name="projectName"
                value={projectName}
                onChange={(e)=>onInputChange(e)}
              />
            </div>
            <div className='mb-3'>
              <label htmlFor="Name" className="form-label">Description</label>
              <input type="text" className='form-control' 
                placeholder='Enter Description' 
                name="description"
                value={description}
                onChange={(e)=>onInputChange(e)}
              />
            </div>
            <div className='mb-3'>
              <label htmlFor="Name" className="form-label">Site Supervisor ID</label>
              <input type="text" className='form-control' 
                placeholder='Enter Site Supervisor ID' 
                name="siteSupervisorID"
                value={siteSupervisorID}
                onChange={(e)=>onInputChange(e)}
              />
            </div>
            <div className='mb-3'>
              <label htmlFor="Name" className="form-label">Site Supervisor name</label>
              <input type="text" className='form-control' 
                placeholder='Enter Supervisor name' 
                name="siteSupervisorName"
                value={siteSupervisorName}
                onChange={(e)=>onInputChange(e)}
              />
            </div>
            <div className='mb-3'>
              <label htmlFor="locationId" className="form-label">Location ID</label>
              <select className='form-control' name="locationId" value={locationId} onChange={onInputChange}>
                <option value="">Select Location ID</option>
                {locations.map(location => (
                  <option key={location.id} value={location.locationId}>{location.locationId}</option>
                ))}
              </select>
              <br/>
              <Link className="btn btn-outline-primary" to="/AddLocation" style={{ 
                color: "#ffc107", borderColor: "#ffc107" }}>Add New Locations</Link>
                <pre/>
                <button type="submit" className='btn btn-outline-primary'>Submit</button>
            </div>
          </form>
        </div>
        <div className='mt-3' style={{ marginLeft: '70px' }}>
        <Link className='btn btn-outline-danger mx-2' to="/manageprojects">Back</Link>
        </div>
      </div>
      
    </div>
    
  )
}

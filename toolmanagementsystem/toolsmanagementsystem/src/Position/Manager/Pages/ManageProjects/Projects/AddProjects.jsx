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
    <Sidebar> 
      <div className='container-fluid'>
        <div className='row justify-content-center'>
          <div className='col-md-12 border rounded p-4 mt-2 shadow' style={{ maxHeight: '80vh', overflowY: 'auto', maxWidth: '1000px' }}>
            <h2 className='text-center m-4'>Create a Project for assign to site supervisor</h2>
            <form onSubmit={(e) => onSubmit(e)}>
              <div className='row mb-3'>
                <div className='col'>
                  <label htmlFor="projectId" className="form-label">Project Id</label>
                  <input type="text" className='form-control'
                    placeholder='Enter Project id'
                    name="projectId"
                    value={projectId}
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
                <div className='col'>
                  <label htmlFor="projectName" className="form-label">Project name</label>
                  <input type={"text"} className='form-control' 
                    placeholder='Enter Project Name' 
                    name="projectName"
                    value={projectName}
                    onChange={(e)=>onInputChange(e)}
                  />
                </div>
              </div>
              <div className='row mb-3'>
                <div className='col'>
                  <label htmlFor="description" className="form-label">Description</label>
                  <input type={"text"} className='form-control' 
                    placeholder='Enter Description' 
                    name="description"
                    value={description}
                    onChange={(e)=>onInputChange(e)}
                  />
                </div>
                <div className='col'>
                  <label htmlFor="siteSupervisorID" className="form-label">Site Supervisor ID</label>
                  <input type={"text"} className='form-control' 
                    placeholder='Enter Site Supervisor ID' 
                    name="siteSupervisorID"
                    value={siteSupervisorID}
                    onChange={(e)=>onInputChange(e)}
                  />
                </div>
              </div>
              <div className='row mb-3'>
                <div className='col'>
                  <label htmlFor="siteSupervisorName" className="form-label">Site Supervisor name</label>
                  <input type={"text"} className='form-control' 
                    placeholder='Enter Supervisor name' 
                    name="siteSupervisorName"
                    value={siteSupervisorName}
                    onChange={(e)=>onInputChange(e)}
                  />
                </div>
                <div className='col'>
                  <label htmlFor="locationId" className="form-label">Location ID</label>
                  <select className='form-control' name="locationId" value={locationId} onChange={onInputChange}>
                    <option value="">Select Location ID</option>
                    {locations.map(location => (
                      <option key={location.id} value={location.locationId}>{location.locationId}</option>
                    ))}
                  </select>
                  <Link className="btn btn-outline-primary mt-2" to="/AddLocation" style={{ 
                    color: "#ffc107", /* Yellow color */
                    borderColor: "#ffc107" /* Yellow color */
                  }}>Add Locations</Link>
                </div>
              </div>
              <div className='row'>
                <div className='col'>
                  <button type="submit" className='btn btn-outline-primary'>Submit</button>
                  <Link className='btn btn-outline-danger mx-2' to="/manageprojects">Back</Link>
                </div>
              </div>
            </form>
          </div>

        </div>

      </div>

    </Sidebar> 
  )
}

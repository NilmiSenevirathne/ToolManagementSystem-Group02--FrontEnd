import axios from 'axios'; // Import axios for making HTTP requests
import React, { useState, useEffect } from 'react'; // Import React and hooks
import { Link, useNavigate } from 'react-router-dom';// Import React Router components
import Sidebar from '../../../../../Components/ManagerSidebar.jsx';// Import Sidebar component

export default function AddProjects() {
  const navigate = useNavigate();// Initialize navigation

  // State for storing locations and existing project IDs
  const [locations, setLocations] = useState([]);
  const [existingProjectIds, setExistingProjectIds] = useState([]); 

  // Fetch locations and existing project IDs when the component mounts
  useEffect(() => {
    fetchLocations();
    fetchExistingProjectIds();
  }, []);

  // Function to fetch locations from the backend
  const fetchLocations = async () => {
    try {
      const response = await axios.get("http://localhost:8080/locations");
      setLocations(response.data);
    } catch (error) {
      console.error('Error fetching locations:', error);
    }
  };

  // Function to fetch existing project IDs from the backend
  const fetchExistingProjectIds = async () => {
    try {
      const response = await axios.get("http://localhost:8080/projects");
      setExistingProjectIds(response.data.map(project => project.projectId));
    } catch (error) {
      console.error('Error fetching existing project IDs:', error);
    }
  };

  // State for storing form data
  const [projects, setProjects] = useState({
    projectId: "",
    projectName: "",
    description: "",
    siteSupervisorID: "",
    siteSupervisorName: "",
    locationId: "",
    locationName: "",
    date: ""
  });

  // Function to reset the form
  const resetForm = () => {
    setProjects({
      projectId: "",
    projectName: "",
    description: "",
    siteSupervisorID: "",
    siteSupervisorName: "",
    locationId: "",
    locationName: "",
    date: ""
    });
  };

  // Destructure form data from projects state
  const { projectId, projectName, description, siteSupervisorID, siteSupervisorName, locationId, locationName, date } = projects;

  // Handle input changes
  const onInputChange = (e) => {
    const { name, value } = e.target;

// If the location ID is changed, update the location name
    if (name === "locationId") {
      const selectedLocation = locations.find(location => location.locationId === value);
      setProjects({ ...projects, locationId: value, locationName: selectedLocation ? selectedLocation.locationName : "" });
    } else {
      setProjects({ ...projects, [name]: value });
    }
  };

  // Handle form submission
  const onSubmit = async (e) => {
    e.preventDefault();

    // Check if project ID already exists
    if (existingProjectIds.includes(projectId)) {
      alert("Project ID already exists. Please enter a different ID.");
      return;
    }

    // Check if all fields are filled
    if (!projectId || !projectName || !description || !siteSupervisorID || !siteSupervisorName || !locationId || !date) {
      alert("Please fill in all fields.");
      return;
    }

    // Try to add the new project to the backend
    try {
      await axios.post("http://localhost:8080/project", projects);
      navigate("/manageprojects");// Navigate to manage projects page
    } catch (error) {
      console.error('Error adding project:', error);
    }
  };

  return (
    <Sidebar> 
      <div className='container-fluid'>
        <div className=' justify-content-center'>
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
                    onChange={(e) => onInputChange(e)}
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
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
                <div className='col'>
                  <label htmlFor="date" className="form-label">Date</label>
                  <input type={"date"} className='form-control' 
                    name="date"
                    value={date}
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
                
              </div>
              <div className='row mb-3'>
              <div className='col'>
                  <label htmlFor="siteSupervisorID" className="form-label">Site Supervisor ID</label>
                  <input type={"text"} className='form-control' 
                    placeholder='Enter Site Supervisor ID' 
                    name="siteSupervisorID"
                    value={siteSupervisorID}
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
                <div className='col'>
                  <label htmlFor="siteSupervisorName" className="form-label">Site Supervisor name</label>
                  <input type={"text"} className='form-control' 
                    placeholder='Enter Supervisor name' 
                    name="siteSupervisorName"
                    value={siteSupervisorName}
                    onChange={(e) => onInputChange(e)}
                  />
                </div>
                
                
              </div>
              <div className='row mb-3'>
              <div className='col'>
                  <label htmlFor="locationId" className="form-label">Location ID</label>
                  <select className='form-control' name="locationId" value={locationId} onChange={onInputChange}>
                    <option value="">Select Location ID</option>
                    {locations.map(location => (
                      <option key={location.id} value={location.locationId}>{location.locationId}</option>
                    ))}
                  </select>
                </div>
              <div className='col'>
                  <label htmlFor="locationName" className="form-label">Location Name</label>
                  <input type={"text"} className='form-control' 
                    placeholder='Location Name' 
                    name="locationName"
                    value={locationName}
                    readOnly
                  />
                </div>
             
                </div>
                <div>
                  <button type="button" className='btn btn-outline-secondary mx-2' onClick={resetForm}>Clear</button>
                  <button type="submit" className='btn btn-outline-primary'>Submit</button>
                </div>
              
            </form>
          </div>
          <br/>
          <Link className='btn btn-outline-dark mx-2' to="/manageprojects">Back</Link>
        </div>
      </div>
    </Sidebar> 
  )
}

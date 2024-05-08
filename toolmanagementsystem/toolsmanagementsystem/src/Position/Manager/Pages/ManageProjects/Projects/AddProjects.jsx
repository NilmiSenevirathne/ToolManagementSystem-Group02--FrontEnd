import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from '../../../../../Components/ManagerSidebar.jsx';

export default function AddProjects() {
  // Get location ids to the dropdown box
  const navigate = useNavigate();

  const [locations, setLocations] = useState([]);
  const [existingProjectIds, setExistingProjectIds] = useState([]); // State to store existing project IDs


  useEffect(() => {
    fetchLocations();
    fetchExistingProjectIds(); // Fetch existing project IDs when component mounts

  }, []);

  //get location method
  const fetchLocations = async () => {
    try {
      const response = await axios.get("http://localhost:8080/locations");
      setLocations(response.data);
    } catch (error) {
      console.error('Error fetching locations:', error);
    }
  };

    // Function to fetch existing project IDs
    const fetchExistingProjectIds = async () => {
      try {
        const response = await axios.get("http://localhost:8080/projects"); // Assuming this endpoint returns existing projects
        setExistingProjectIds(response.data.map(project => project.projectId));
      } catch (error) {
        console.error('Error fetching existing project IDs:', error);
      }
    };
  

  // State to store project details
  const [projects, setProjects] = useState({
    projectId: "",
    projectName: "",
    description: "",
    siteSupervisorID: "",
    siteSupervisorName: "",
    locationId: "",
    date:""

  });

  const { projectId, projectName, description, siteSupervisorID, siteSupervisorName, locationId,date } = projects;

  // Function to handle input changes
  const onInputChange = (e) => {
    setProjects({ ...projects, [e.target.name]: e.target.value });
  };

  // Function to handle form submission
  const onSubmit = async (e) => {
    e.preventDefault();

    // Check if the entered project ID already exists
    if (existingProjectIds.includes(projectId)) {
      alert("Project ID already exists. Please enter a different ID.");
      return;
    }

    if (!projectId || !projectName || !description || !siteSupervisorID || !siteSupervisorName || !locationId || !date) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      await axios.post("http://localhost:8080/project", projects);
      navigate("/manageprojects");
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
              {/* <div className='row mb-3'> */}
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
              {/* </div> */}
              {/* <div className='row mb-3'> */}
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
              {/* </div> */}
              {/* <div className='row mb-3'> */}
                <div className='col'>
                  <label htmlFor="siteSupervisorName" className="form-label">Site Supervisor name</label>
                  <input type={"text"} className='form-control' 
                    placeholder='Enter Supervisor name' 
                    name="siteSupervisorName"
                    value={siteSupervisorName}
                    onChange={(e)=>onInputChange(e)}
                  />
                </div>
                {/* location drop down */}
                <div className='col'>
                  <label htmlFor="locationId" className="form-label">Location ID</label>
                  <select className='form-control' name="locationId" value={locationId} onChange={onInputChange}>
                    <option value="">Select Location ID</option>
                    {locations.map(location => (
                      <option key={location.id} value={location.locationId}>{location.locationId}</option>
                    ))}
                  </select>

                  <div className='col'>
                  <label htmlFor="siteSupervisorName" className="form-label">Date </label>
                  <input type={"date"} className='form-control' 
                    placeholder='Enter project date' 
                    name="date"
                    value={date}
                    onChange={(e)=>onInputChange(e)}
                  />
                </div>


                  <Link className="btn btn-outline-primary mt-2" to="/AddLocation" style={{ 
                    color: "#ffc107", /* Yellow color */
                    borderColor: "#ffc107" /* Yellow color */}}>Add Locations</Link>
                    <button type="submit" className='btn btn-outline-primary'>Submit</button>

                </div>
              {/* </div> */}
              {/* <div className='row'> */}
               
                
              {/* </div> */}
            </form>

          </div>
          <br/>
          <Link className='btn btn-outline-danger mx-2' to="/manageprojects">Back</Link>

        </div>

      </div>

    </Sidebar> 
  )
}

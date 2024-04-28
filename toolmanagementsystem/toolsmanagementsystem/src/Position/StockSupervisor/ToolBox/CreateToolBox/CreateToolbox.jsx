import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import StockSidebar from '../../../../Components/Sidebar/StockSidebar.jsx';
import './toolbox.css';

export default function AddToolbox() {
  let navigate = useNavigate();
  const [locations , setLocations] = useState([]);
  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState ([]);

  useEffect(() =>{
     fetchLocations();
     fetchUsers();
     fetchProjects();
  },[]);

  //function to the fetch projects
  const fetchProjects = async () =>{
    try{
        const response  = await axios.get("http://localhost:8080/Projects");
        setProjects(response.data);
    }catch(error){
      console.error("Error fetching projects: ", error);
    }
  };

  //function to the fetch locations
  const fetchLocations = async () =>{
      try{
        const response  = await axios.get("http://localhost:8080/locations");
        setLocations(response.data);
      } catch(error) {
        console.error("Error fetching locations: ", error);
      }
  };

// Function to fetch users
  const fetchUsers = async () => { 
        try {
      const response = await axios.get("http://localhost:8080/authentication/getUsertoolbox");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users: ", error);
    }
  };

  const [toolbox, setToolbox] = useState({
    toolboxId: "",
    projectId: "",
    sitesupervisorId: "",
    locationId: "", 
    Tool: "",
  });
  

  const { toolboxId, projectId, projectName, sitesupervisorId, sitesupervisorName, Location, Tool } = toolbox;

  const onInputChange = (e) => {
    setToolbox({ ...toolbox, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try{
        const response = await axios.post("http://localhost:8080/toolbox/create", toolbox);
        console.log("Response from server:", response);
        alert("New Toolbox Successfully Added!");
        navigate("/managestock");
    } catch(error) {
        console.error("Error occurred while adding toolbox:", error);
        if(error.response){
            console.error("Server responded with:", error.response.data);
            alert("Unsuccessfully Added New Toolbox!");
        }
    }
  };

  return (
    <StockSidebar>
      <div className="form-container">
        <form onSubmit={(e) => onSubmit(e)} className="form-content">
          <h2 className="text-center my-4">New Toolbox Details Form</h2>

          <div className="mb-3">
            <label htmlFor="toolboxId" className="form-label">
              Toolbox ID
            </label>
            <input
              type={"text"}
              className="form-control"
              placeholder="Enter new toolbox id"
              name="toolboxId"
              value={toolboxId}
              onChange={(e) => onInputChange(e)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="projectId" className="form-label">
              Project
            </label>
             <select
                 className="form-control"
                 name="projectId"
                 value={toolbox.projectId}
                 onChange={(e) => onInputChange(e)}
            >
                <option value="">Select project</option>
                    {projects.map((project) => (
                   <option key={project.projectId} value={project.projectId}>
                      {project.projectName}
                  </option>
               ))}
             </select>
          </div>

          <div className="mb-3">
            <label htmlFor="sitesupervisorId" className="form-label">
              Site Supervisor
            </label>
            <select
                 className="form-control"
                 name="sitesupervisorId"
                 value={toolbox.sitesupervisorId}
                 onChange={(e) => onInputChange(e)}
            >
                <option value="">Select Name</option>
                    {users.map((user) => (
                   <option key={user.userid} value={user.userid}>
                      {user.firstname} {user.lastname}
                  </option>
               ))}
            </select>
          </div>

  
        <div>
            <label htmlFor="location" className="form-label">
              Location
            </label>
          <select
               className="form-control"
               name="locationId"
               value={toolbox.locationId} 
               onChange={(e) => onInputChange(e)}
          >
               <option value="">Select Location</option>
              {locations.map((loc) => (
              <option key={loc.locationId} value={loc.locationId}>
              {loc.locationName}
             </option>
               ))}
         </select>
         </div>
         
         <div><Link to ='/tool'><button className='selecttool'>SelectTools</button></Link></div>
         
         

          <button type="submit" className="submit">
            Submit
          </button>
          <button type="submit" className="cancel">
            Cancel
          </button>
            
        </form>
      </div>
  </StockSidebar>
  );
}

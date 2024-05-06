import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import StockSidebar from '../../../../Components/Sidebar/StockSidebar.jsx';
import axios from "axios";
import './toolbox.css';

function CreateToolbox({ location }) {
  const navigate = useNavigate();
  const [locations , setLocations] = useState([]);
  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [selectedTools, setSelectedTools] = useState([]);
  
  useEffect(() => {
    fetchLocations();
    fetchUsers();
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get("http://localhost:8080/Projects");
      setProjects(response.data);
    } catch(error) {
      console.error("Error fetching projects: ", error);
    }
  };

  const fetchLocations = async () => {
    try {
      const response = await axios.get("http://localhost:8080/locations");
      setLocations(response.data);
    } catch(error) {
      console.error("Error fetching locations: ", error);
    }
  };

  const fetchUsers = async () => { 
    try {
      const response = await axios.get("http://localhost:8080/authentication/getUsertoolbox");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users: ", error);
    }
  };

  // Initialize the state with initial values from location state
  const initialValues = location?.state || {};
  const [toolbox, setToolbox] = useState({
    toolbox_id: initialValues.toolboxId || "",
    project_id: initialValues.projectId || "",
    site_supervisor_id: initialValues.sitesupervisorId || "",
    Location_id: initialValues.locationId || "",
    tools: "",
  });
  
  const { toolboxId, projectId, sitesupervisorId } = toolbox;

  const onInputChange = (e) => {
    setToolbox({ ...toolbox, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/toolbox//createtoolbox", {
        ...toolbox,
        selectedTools: selectedTools
      });
      console.log("Response from server:", response);
      alert("New Toolbox Successfully Added!");
      navigate("/maintoolbox");
    } catch(error) {
      console.error("Error occurred while adding toolbox:", error);
      if(error.response){
        console.error("Server responded with:", error.response.data);
        alert("Unsuccessfully Added New Toolbox!");
      }
    }
  };

  const handleToolSelection = (selectedTool) => {
    setSelectedTools(prevSelectedTools => [...prevSelectedTools, selectedTool]);
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
              type="text"
              className="form-control"
              placeholder="Enter new toolbox id"
              name="toolboxId"
              value={toolboxId}
              onChange={onInputChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="projectId" className="form-label">
              Project
            </label>
            <select
              className="form-control"
              name="projectId"
              value={projectId}
              onChange={onInputChange}
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
              value={sitesupervisorId}
              onChange={onInputChange}
            >
              <option value="">Select Name</option>
              {users.map((user) => (
                <option key={user.userid} value={user.userid}>
                  {user.firstname} {user.lastname}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="locationId" className="form-label">
              Location
            </label>
            <select
              className="form-control"
              name="locationId"
              value={toolbox.locationId}
              onChange={onInputChange}
            >
              <option value="">Select Location</option>
              {locations.map((loc) => (
                <option key={loc.locationId} value={loc.locationId}>
                  {loc.locationName}
                </option>
              ))}
            </select>
          </div>

          <div>
            <Link to='/tool'>
              <button type="button" className='selecttool'>Select Tools</button>
            </Link>
          </div>

          <button type="submit" className="submit">
            Submit
          </button>
          <button type="button" className="cancel" onClick={() => navigate("/managestock")}>
            Cancel
          </button>
        </form>
      </div>
    </StockSidebar>
  );
}

export default CreateToolbox;

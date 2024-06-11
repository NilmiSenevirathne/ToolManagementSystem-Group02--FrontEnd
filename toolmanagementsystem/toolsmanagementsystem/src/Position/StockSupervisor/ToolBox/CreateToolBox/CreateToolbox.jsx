import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import StockSidebar from '../../../../Components/Sidebar/StockSidebar.jsx';
import DashNavbar from '../../../../Components/Navbar/DashNavbar.jsx';
import axios from "axios";
import './toolbox.css';

function CreateToolbox() {
  const navigate = useNavigate();
  const location = useLocation();
  const initialState = location.state || {};

  const [locations, setLocations] = useState([]);
  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [selectedTools, setSelectedTools] = useState(initialState.selectedTools || []);
  
  const [toolbox, setToolbox] = useState({
    toolbox_id: initialState.toolbox_id || "",
    project_id: initialState.project_id || "",
    site_supervisor_id: initialState.site_supervisor_id || "",
    Location_id: initialState.Location_id || "",
    selectedTools: initialState.selectedTools || [],
  });

  useEffect(() => {
    fetchLocations();
    fetchUsers();
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get("http://localhost:8080/Projects");
      setProjects(response.data);
    } catch (error) {
      console.error("Error fetching projects: ", error);
    }
  };

  const fetchLocations = async () => {
    try {
      const response = await axios.get("http://localhost:8080/locations");
      setLocations(response.data);
    } catch (error) {
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

  const onInputChange = (e) => {
    setToolbox({ ...toolbox, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
        const requestData = {
            ...toolbox,
            selectedTools: selectedTools,
        };
        console.log("Submitting data:", requestData);
        
        const response = await axios.post("http://localhost:8080/toolbox/createToolbox", requestData);
        console.log("Response from server:", response);
        alert("New Toolbox Successfully Added!");
        navigate("/maintoolbox");
    } catch (error) {
        console.error("Error occurred while adding toolbox:", error);
        if (error.response) {
            console.error("Server responded with:", error.response.data);
            alert("Failed to add new toolbox: " + JSON.stringify(error.response.data));
        } else {
            alert("An error occurred. Please try again.");
        }
    }
};

 
  return (
    <StockSidebar>
     
      <div className="form-container">
        <form onSubmit={onSubmit} className="form-content">
          <h2 className="text-center my-4">New Toolbox Details Form</h2>

          <div className="mb-3">
            <label htmlFor="toolboxId" className="form-label">
              Toolbox ID
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter new toolbox id"
              name="toolbox_id"
              value={toolbox.toolbox_id}
              onChange={onInputChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="projectId" className="form-label">
              Project
            </label>
            <select
              className="form-control"
              name="project_id"
              value={toolbox.project_id}
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
              name="site_supervisor_id"
              value={toolbox.site_supervisor_id}
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
              name="Location_id"
              value={toolbox.Location_id}
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
            <Link to="/tool" state={{ toolbox }}> {/* Pass the current form state */}
              <button type="button" className="selecttool">Select Tools</button>
            </Link>
          </div>

          {/* selectedtool textarea */}
          <div className="mb-3">
          <label htmlFor="selectedTools" className="form-label">
          Selected Tools
          </label>
          <textarea 
           id="selectedTools" 
           className="form-control" 
           rows="5"
           readOnly
           value={selectedTools.map(tool => tool.toolName).join(', ')}
      />
      </div>


          <button type="submit" className="submit">Submit</button>
          <button type="button" className="cancel" onClick={() => navigate("/managestock")}>Cancel</button>
        </form>
      </div>
    </StockSidebar>
  );
}

export default CreateToolbox;

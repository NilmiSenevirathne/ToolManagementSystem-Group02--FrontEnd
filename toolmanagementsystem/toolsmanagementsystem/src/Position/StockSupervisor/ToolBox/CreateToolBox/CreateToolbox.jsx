import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import StockSidebar from '../../../../Components/Sidebar/StockSidebar.jsx';
import './toolbox.css';

export default function AddToolbox() {
  let navigate = useNavigate();

  const [toolbox, setToolbox] = useState({
    toolboxId:"",
    projectId:"",
    projectName:"",
    sitesupervisorId:"",
    sitesupervisorName:"",
    Location:"",
    Tool:"",
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
              Project ID
            </label>
            <input
              type={"text"}
              className="form-control"
              placeholder="Enter project id"
              name="projectId"
              value={projectId}
              onChange={(e) => onInputChange(e)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="projectName" className="form-label">
              Project Name
            </label>
            <input
              type={"text"}
              className="form-control"
              placeholder="Enter project name"
              name="projectName"
              value={projectName}
              onChange={(e) => onInputChange(e)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="sitesupervisorId" className="form-label">
              Site Supervisor ID
            </label>
            <input
              type={"text"}
              className="form-control"
              placeholder="Enter site supervisor id"
              name="sitesupervisorId"
              value={sitesupervisorId}
              onChange={(e) => onInputChange(e)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="sitesupervisorName" className="form-label">
              Site Supervisor Name
            </label>
            <input
              type={"text"}
              className="form-control"
              placeholder="Enter site supervisor name"
              name="sitesupervisorName"
              value={sitesupervisorName}
              onChange={(e) => onInputChange(e)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="Location" className="form-label">
              Location
            </label>
            <input
              type={"text"}
              className="form-control"
              placeholder="Enter location"
              name="Location"
              value={Location}
              onChange={(e) => onInputChange(e)}
            />
          </div>

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

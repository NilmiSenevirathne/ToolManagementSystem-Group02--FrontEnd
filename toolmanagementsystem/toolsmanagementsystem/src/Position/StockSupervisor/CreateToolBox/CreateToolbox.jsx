import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from '../../../Components/Sidebar/Sidebar';
import './toolbox.css'

export default function CreateToolBox() {
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

  const { toolboxId,projectId , projectName,sitesupervisorId,sitesupervisorName, Location, tool} = toolbox;

  const onInputChange = (e) => {
    setToolbox({ ...toolbox, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try{
        const response = await axios.post("http://localhost:8080/tool/create",toolbox);
        console.log(" Response from server: ",response);
        alert(" New Tool Successfully Added!");
        navigate("/managestock");
    }catch(error)
    {
        console.error(" Error occured while adding tool: ",error);
        if(error.response){
            console.error("Server respond with:",error.response.data);
            alert(" Unsuccessfully Added NewTool!")
        }
    }

  };

  return (
    <div>
      <Sidebar>
      <div className="toolbox-container">
          <form onSubmit={(e) => onSubmit(e)}>
          <h2 className="text-center m-4">New Toolbox Details Form</h2>
            <div className="mb-3">
              <label htmlFor="toolboxId" className="form-label">
                ToolBoxID
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter new toolbox id "
                name="toolboxId"
                value={toolboxId}
                onChange={(e) => onInputChange(e)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="projectId" className="form-label">
                ProjectId
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter  projectid "
                name="ProjectId"
                value={projectId}
                onChange={(e) => onInputChange(e)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="projectIName" className="form-label">
                ProjectName
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter  projectname "
                name="ProjectName"
                value={projectName}
                onChange={(e) => onInputChange(e)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="SitesupervisorId" className="form-label">
                Site_SupervisorId
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter sitesupervisor Id "
                name="SitesupervisorId"
                value={sitesupervisorId}
                onChange={(e) => onInputChange(e)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="sitesupervisorName" className="form-label">
                Site_SupervisorName
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter sitesupervisor name "
                name="sitesupervisorName"
                value={sitesupervisorName}
                onChange={(e) => onInputChange(e)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="location" className="form-label">
                Location
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter location "
                name="location"
                value={Location}
                onChange={(e) => onInputChange(e)}
              />
            </div>

            <button type="submit" className="btn btn-outline-primary">
              Create
            </button>
            <Link className="btn btn-outline-danger mx-2" to="/managestock">
              Cancel
            </Link>
          </form>
        </div>
      
      </Sidebar>  
      </div>
      );
}
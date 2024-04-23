import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from '../../../Components/Sidebar/Sidebar';
import './addtool.css'

export default function AddTool() {
  let navigate = useNavigate();

  const [tool, setTool] = useState({
    toolId: "",
    toolName: "",
    description: "",
    quantity:0,
  });

  const { toolId, toolName, description,quantity} = tool;
  const [errors, setErrors] = useState({});

  const onInputChange = (e) => {
    setTool({ ...tool, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if(validate()){
    try{
        const response = await axios.post("http://localhost:8080/tool/create",tool);
        alert(" Response from server: ",response);
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
    }

  };

  const validate  = () =>{
    let errors = {};
    let isValid =true;

    if (!toolId) {
      isValid = false;
      errors["toolId"] = "Please enter the tool ID.";
    }

    if (!toolName) {
      isValid = false;
      errors["toolName"] = "Please enter the tool name.";
    }

    if (!description) {
      isValid = false;
      errors["description"] = "Please enter the tool description.";
    }

    if (!quantity || quantity <= 0) {
      isValid = false;
      errors["quantity"] = "Please enter a valid quantity.";
    }

    setErrors(errors);
    return isValid;

  };

  return (
    <div className="container">
    <Sidebar>
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">New Tool Details Form</h2>

          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="toolId" className="form-label">
                ToolID
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter new toolid"
                name="toolId"
                value={toolId}
                onChange={(e) => onInputChange(e)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="toolName" className="form-label">
                ToolName
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter tool name"
                name="toolName"
                value={toolName}
                onChange={(e) => onInputChange(e)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter the tool description"
                name="description"
                value={description}
                onChange={(e) => onInputChange(e)}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="quantity" className="form-label">
                Quantity
              </label>
              <input
                type={'number'}
                className="form-control"
                placeholder="Enter the quantity"
                name="quantity"
                value={quantity}
                onChange={(e) => onInputChange(e)}
              />
            </div>

            <button type="submit" className="btn btn-outline-primary">
              Submit
            </button>
            <Link className="btn btn-outline-danger mx-2" to="/managestock">
              Cancel
            </Link>
          </form>
        </div>
      </div>
      </Sidebar>
    </div>
  );
}
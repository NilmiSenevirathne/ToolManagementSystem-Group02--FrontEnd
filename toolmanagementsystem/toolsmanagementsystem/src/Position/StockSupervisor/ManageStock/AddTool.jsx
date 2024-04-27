import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import StockSidebar from "../../../Components/Sidebar/StockSidebar";
import './addtool.css';

export default function AddTool() {
  let navigate = useNavigate();

  const [tool, setTool] = useState({
    toolId: "",
    toolName: "",
    description: "",
    quantity: 0,
  });

  const [errors, setErrors] = useState({});
  const [duplicateError, setDuplicateError] = useState("");

  const { toolId, toolName, description, quantity } = tool;

  const onInputChange = (e) => {
    setTool({ ...tool, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
    setDuplicateError("");
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const response = await axios.get(`http://localhost:8080/tool/check/${toolId}`);
        if (response.data.exists) {
          setDuplicateError("Tool Id already exists, enter new toolId!");
        } else {
          const response = await axios.post("http://localhost:8080/tool/create", tool);
          console.log("Response from server:", response);
          alert("New Tool Successfully Added!");
          navigate("/managestock");
        }
      } catch (error) {
        console.error("Error occurred while adding tool:", error);
        if (error.response) {
          console.error("Server responded with:", error.response.data);
          alert("Unsuccessfully Added NewTool!");
        }
      }
    }
  };

  const validate = () => {
    let errors = {};
    let isValid = true;

    if (!toolId.trim()) {
      isValid = false;
      errors["toolId"] = "Please enter the tool ID.";
    }

    if (!toolName.trim()) {
      isValid = false;
      errors["toolName"] = "Please enter the tool name.";
    }

    if (!description.trim()) {
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
    <StockSidebar>
      <div className="form-container">
        <form onSubmit={(e) => onSubmit(e)} className="form-content">
          <h2 className="text-center my-4">New Tool Details Form</h2>

          <div className="mb-3">
            <label htmlFor="toolId" className="form-label">
              ToolID
            </label>
            <input
              type={"text"}
              className={`form-control ${errors.toolId || duplicateError ? "is-invalid" : ""}`}
              placeholder="Enter new toolid"
              name="toolId"
              value={toolId}
              onChange={(e) => onInputChange(e)}
            />
            {errors.toolId && <div className="invalid-feedback">{errors.toolId}</div>}
            {duplicateError && <div className="invalid-feedback">{duplicateError}</div>}
          </div>

          <div className="mb-3">
            <label htmlFor="toolName" className="form-label">
              ToolName
            </label>
            <input
              type={"text"}
              className={`form-control ${errors.toolName && "is-invalid"}`}
              placeholder="Enter tool name"
              name="toolName"
              value={toolName}
              onChange={(e) => onInputChange(e)}
            />
            {errors.toolName && <div className="invalid-feedback">{errors.toolName}</div>}
          </div>

          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <input
              type={"text"}
              className={`form-control ${errors.description && "is-invalid"}`}
              placeholder="Enter the tool description"
              name="description"
              value={description}
              onChange={(e) => onInputChange(e)}
            />
            {errors.description && <div className="invalid-feedback">{errors.description}</div>}
          </div>

          <div className="mb-3">
            <label htmlFor="quantity" className="form-label">
              Quantity
            </label>
            <input
              type={'number'}
              className={`form-control ${errors.quantity && "is-invalid"}`}
              placeholder="Enter the quantity"
              name="quantity"
              value={quantity}
              onChange={(e) => onInputChange(e)}
            />
            {errors.quantity && <div className="invalid-feedback">{errors.quantity}</div>}
          </div>

          <button type="submit" className="btn btn-outline-primary">
            Submit
          </button>
          <Link className="btn btn-outline-danger mx-2" to="/managestock">
            Cancel
          </Link>
        </form>
      </div>
  </StockSidebar>
  );
}

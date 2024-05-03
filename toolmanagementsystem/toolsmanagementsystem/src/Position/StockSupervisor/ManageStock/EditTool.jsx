import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import './edittool.css';
import StockSidebar from "../../../Components/Sidebar/StockSidebar";

export default function EditTool() {
  const navigate = useNavigate();
  const { toolId } = useParams();

  const [values, setTool] = useState({
    toolId: toolId,
    toolName: "",
    description: "",
    quantity: "",
  });

  useEffect(() => {
    const fetchTool = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/tool/gettool/${toolId}`);
        const { toolName, description, quantity } = response.data;
        setTool({ ...values, toolName, description, quantity });
        
      } catch (error) {
        console.error("Error fetching tool:", error);
      }
    };

    fetchTool();
  }, [toolId]);

  const onInputChange = (e) => {
    setTool({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:8080/tool/update/${toolId}`, values);
      console.log("Response from server: ", response);
            navigate("/managestock");
            alert("Tool Successfully Updated!");
    } catch (error) {
      alert.error("Error occurred while updating tool: ", error);
      if (error.response) {
        alert.error("Server respond with:", error.response.data);
      }
    }
  };

  return (
      <StockSidebar>
        
          <div className="updateform">
            
            <form onSubmit={(e) => onSubmit(e)}>
            <h2 className="text-center m-4">Update Tool Details</h2>
              <div className="mb-3">
                <label htmlFor="toolId" className="form-label">
                  ToolID
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter new tool id"
                  name="toolId"
                  value={values.toolId}
                  onChange={(e) => onInputChange(e)}
                  readOnly // Make the ID field read-only
                />
              </div>
              <div className="mb-3">
                <label htmlFor="toolName" className="form-label">
                  ToolName
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter tool name"
                  name="toolName"
                  value={values.toolName}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  Description
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter the tool description"
                  name="description"
                  value={values.description}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="quantity" className="form-label">
                  Quantity
                </label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Enter the quantity"
                  name="quantity"
                  value={values.quantity}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
              <button type="submit" className="update-btn">
                Update
              </button>

              <br/>
              <Link  to="/managestock"><button className="btn-cancel">Cancel</button></Link>
            </form>
          </div>
        
    </StockSidebar>
  );
}

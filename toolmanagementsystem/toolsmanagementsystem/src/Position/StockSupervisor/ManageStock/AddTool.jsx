import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import StockSidebar from "../../../Components/Sidebar/StockSidebar";
import NewNav from "../../../Components/Navbar/NewNav.jsx";
import { CssBaseline, Grid, Box, Typography, TextField, Button, Container } from "@mui/material";

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

  useEffect(() => {
    fetchLatestToolId();
  }, []);

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
          alert("Unsuccessfully Added New Tool!");
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

  const fetchLatestToolId = async () => {
    try {
      const response = await axios.get("http://localhost:8080/tool/gettools");
      const latestTool = response.data.reduce((maxId, tool) => {
        const currentId = parseInt(tool.toolId.substring(1)); // Assuming your ID format is like "T001", extract and convert to integer
        return currentId > maxId ? currentId : maxId;
      }, 0);
      const newToolId = `T${(latestTool + 1).toString().padStart(3, '0')}`; // Increment and format to "TXXX"
      setTool((prev) => ({ ...prev, toolId: newToolId }));
    } catch (error) {
      console.error("Error fetching latest Tool ID: ", error);
    }
  };

  return (
    <Grid container>
      <CssBaseline />
      <Grid item>
        <StockSidebar />
      </Grid>
      <Grid item xs>
        <NewNav />
        <Container maxWidth="sm">
          <Box mt={4}>
            <Box 
              p={4} 
              border={1} 
              borderRadius={8} 
              borderColor="grey.300"
              boxShadow={3}
            >
              <Typography variant="h4" align="center" gutterBottom>
                New Tool Details Form
              </Typography>
              <form onSubmit={onSubmit}>
                <TextField
                  variant="outlined"
                  fullWidth
                  label="Tool ID"
                  name="toolId"
                  value={toolId}
                  onChange={onInputChange}
                  error={!!errors.toolId || !!duplicateError}
                  helperText={errors.toolId || duplicateError}
                  margin="normal"
                  disabled
                />
                <TextField
                  variant="outlined"
                  fullWidth
                  label="Tool Name"
                  name="toolName"
                  value={toolName}
                  onChange={onInputChange}
                  error={!!errors.toolName}
                  helperText={errors.toolName}
                  margin="normal"
                />
                <TextField
                  variant="outlined"
                  fullWidth
                  label="Description"
                  name="description"
                  value={description}
                  onChange={onInputChange}
                  error={!!errors.description}
                  helperText={errors.description}
                  margin="normal"
                />
                <TextField
                  variant="outlined"
                  fullWidth
                  type="number"
                  label="Quantity"
                  name="quantity"
                  value={quantity}
                  onChange={onInputChange}
                  error={!!errors.quantity}
                  helperText={errors.quantity}
                  margin="normal"
                />
                {/* submit button */}
                <Box mt={2} display="flex" justifyContent="center" gap={2}>
                  <Box flexGrow={1}>
                    <Button
                      variant="contained"
                      sx={{ bgcolor: 'green', width: '100%', fontSize: '1.25rem' }}
                      type="submit"
                    >
                      Submit
                    </Button>
                  </Box>
                  {/* cancel button */}
                  <Box flexGrow={1}>
                    <Link to="/managestock" style={{ textDecoration: 'none' }}>
                      <Button
                        variant="contained"
                        sx={{ bgcolor: 'red', width: '100%', fontSize: '1.25rem' }}
                      >
                        Cancel
                      </Button>
                    </Link>
                  </Box>
                </Box>
              </form>
            </Box>
          </Box>
        </Container>
      </Grid>
    </Grid>
  );
}

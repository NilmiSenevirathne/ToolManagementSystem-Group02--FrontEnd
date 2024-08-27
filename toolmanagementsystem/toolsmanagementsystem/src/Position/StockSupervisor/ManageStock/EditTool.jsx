import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import StockSidebar from "../../../Components/Sidebar/StockSidebar";
import NewNav from "../../../Components/Navbar/NewNav.jsx";
import { CssBaseline, Grid, Box, Typography,TextField,Button,Container } from "@mui/material";

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
    
    <Grid container>
       <CssBaseline/>
       <Grid item>
          <StockSidebar/>
       </Grid>

       <Grid item xs>
          <NewNav/>

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
                Update Tool Details
              </Typography>
              <form onSubmit={onSubmit}>
                <TextField
                  variant="outlined"
                  fullWidth
                  label="Tool ID"
                  name="toolId"
                  value={values.toolId}
                  onChange={onInputChange}
                  margin="normal"
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <TextField
                  variant="outlined"
                  fullWidth
                  label="Tool Name"
                  name="toolName"
                  value={values.toolName}
                  onChange={onInputChange}
                  margin="normal"
                />
                <TextField
                  variant="outlined"
                  fullWidth
                  label="Description"
                  name="description"
                  value={values.description}
                  onChange={onInputChange}
                  margin="normal"
                />
                <TextField
                  variant="outlined"
                  fullWidth
                  type="number"
                  label="Quantity"
                  name="quantity"
                  value={values.quantity}
                  onChange={onInputChange}
                  margin="normal"
                  inputProps={{ min: 0 }}
                />
                <Box mt={2} display="flex" justifyContent="center" gap={2}>
                  <Box flexGrow={1}>
                    <Button
                      variant="contained"
                      sx={{ bgcolor: 'green', width: '100%', fontSize: '1.25rem' }}
                      type="submit"
                    >
                      Update
                    </Button>
                  </Box>
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

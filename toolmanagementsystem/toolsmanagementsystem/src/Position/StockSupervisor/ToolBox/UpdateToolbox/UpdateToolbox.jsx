import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import StockSidebar from "../../../../Components/Sidebar/StockSidebar";
import NewNav from "../../../../Components/Navbar/NewNav.jsx";
import { CssBaseline, Grid, Box, Typography, TextField, Button, Container } from "@mui/material";

export default function UpdateToolbox() {
  const navigate = useNavigate();
  const { toolbox_id } = useParams();
  const [values, setToolbox] = useState({
    toolbox_id: toolbox_id,
    project_id: "",
    site_supervisor_id: "",
    location_id: "",
    selectedTools: [], // Ensure this is initialized as an array
  });

  useEffect(() => {
    const fetchToolbox = async () => {
      if (!toolbox_id) {
        console.error("Toolbox ID is missing in URL parameters.");
        return;
      }
      try {
        const response = await axios.get(`http://localhost:8080/toolbox/search/${toolbox_id}`);
        const { project_id, site_supervisor_id, location_id, selectedTools } = response.data;
        setToolbox({ 
          toolbox_id, // Keep the toolbox_id unchanged
          project_id: project_id || "", // Ensure values are set correctly
          site_supervisor_id: site_supervisor_id || "",
          location_id: location_id || "",
          selectedTools: selectedTools || [], // Default to empty array
        });
      } catch (error) {
        console.error("Error fetching toolbox:", error);
      }
    };

    fetchToolbox();
  }, [toolbox_id]);

  const onInputChange = (e) => {
    setToolbox({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:8080/toolbox/update/${toolbox_id}`, values);
      console.log("Response from server: ", response);
      navigate("/maintoolbox");
      alert("Toolbox Successfully Updated!");
    } catch (error) {
      console.error("Error occurred while updating toolbox:", error);
      if (error.response) {
        alert("Server responded with: " + error.response.data);
      } else {
        alert("Error occurred while updating toolbox: " + error.message);
      }
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
            <Box p={4} border={1} borderRadius={8} borderColor="grey.300" boxShadow={3}>
              <Typography variant="h4" align="center" gutterBottom>
                Update Toolbox Details Form
              </Typography>
              <form onSubmit={onSubmit}>
                <TextField
                  variant="outlined"
                  fullWidth
                  label="Toolbox ID"
                  name="toolbox_id"
                  value={values.toolbox_id}
                  onChange={onInputChange}
                  margin="normal"
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <TextField
                  variant="outlined"
                  fullWidth
                  label="Project ID"
                  name="project_id"
                  value={values.project_id}
                  onChange={onInputChange}
                  margin="normal"
                />
                <TextField
                  variant="outlined"
                  fullWidth
                  label="Site Supervisor ID"
                  name="site_supervisor_id"
                  value={values.site_supervisor_id}
                  onChange={onInputChange}
                  margin="normal"
                />

                <TextField
                  variant="outlined"
                  fullWidth
                  label="Location ID"
                  name="location_id"
                  value={values.location_id}
                  onChange={onInputChange}
                  margin="normal"
                />

                <TextField
                  variant="outlined"
                  fullWidth
                  label="Selected Tools"
                  name="selectedTools"
                  value={values.selectedTools.join(', ')} // This will work now as selectedTools is initialized as an array
                  onChange={onInputChange}
                  margin="normal"
                  InputProps={{
                    readOnly: true,
                  }}
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
                    <Link to="/maintoolbox" style={{ textDecoration: 'none' }}>
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

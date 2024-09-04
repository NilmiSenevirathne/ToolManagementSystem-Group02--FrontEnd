import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Link, useParams } from 'react-router-dom';
import ManagerSidebar from '../../../Components/ManagerSidebar.jsx';
import NewNav from '../../../Components/Navbar/NewNav.jsx';
import { CssBaseline, Grid, TextField, Button, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box } from '@mui/material';

const ManageStock = () => {
  const [tools, setTools] = useState([]);
  const [searchTools, setSearchTools] = useState('');
  const { toolId } = useParams();

  useEffect(() => {
    loadTools();
  }, []);

  // fetch tools details from the backend
  const loadTools = async () => {
    const result = await axios.get("http://localhost:8080/tool/gettools");
    setTools(result.data);
  };

  // delete tool details from the database
  const deleteTool = async (toolId) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this tool?");
    if (!isConfirmed) {
      return;
    }
    try {
      await axios.delete(`http://localhost:8080/tool/delete/${toolId}`);
      loadTools();
      alert("Tool deleted Successfully!")
    } catch (error) {
      alert("Error occurred when deleting the tool!")
    }
  };

  // filter tools based on search query
  const filteredTools = tools.filter(tool =>
    tool.toolId.toLowerCase().includes(searchTools.toLowerCase()) ||
    tool.toolName.toLowerCase().includes(searchTools.toLowerCase())
  );

  return (
    <Grid container>
      <CssBaseline />

      <Grid item>
      <ManagerSidebar />
      </Grid>

      <Grid item xs>
      <NewNav />

        <div style={{ margin: '20px' }}>
          <Typography variant="h4" gutterBottom>Welcome to Tool Details Section!</Typography>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
            <TextField
              label="Search Tools"
              variant="outlined"
              fullWidth
              value={searchTools}
              onChange={(e) => setSearchTools(e.target.value)}
              style={{ flex: 1, marginRight: '10px' }}
            />
            <Button variant="contained" color="primary" onClick={() => setSearchTools('')}>
              Clear
            </Button>
          </div>

          <TableContainer component={Paper} style={{ maxHeight: 400 }}>
            <Table stickyHeader aria-label="Tools Table" sx={{ borderCollapse: 'separate', borderSpacing: 0 ,'& .MuiTableCell-root':{border:'1px solid rgba(224,224,224,1)',} ,}}>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', backgroundColor: 'grey', color: 'white'   }}>Tool_ID</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', backgroundColor: 'grey', color: 'white'   }}>ToolName</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', backgroundColor: 'grey', color: 'white'   }}>Description</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', backgroundColor: 'grey', color: 'white'  }}>Quantity</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredTools.map((tool) => (
                  <TableRow key={tool.toolId}>
                    <TableCell component="th" scope="row">
                      {tool.toolId}
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>{tool.toolName}</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>{tool.description}</TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>{tool.quantity}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <br />
          <Box display="flex" justifyContent="center">
          
          </Box>
        </div>
      </Grid>
    </Grid>
  );
};

export default ManageStock;

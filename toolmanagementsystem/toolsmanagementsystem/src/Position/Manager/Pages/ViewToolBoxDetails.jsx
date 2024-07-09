import React, { useEffect, useState } from 'react'
import StockSidebar from '../../../Components/Sidebar/StockSidebar.jsx'
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import StockSuperviorNavbar from '../../../Components/Navbar/StockSupervisorNavbar.jsx';
import { Grid , Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Container} from '@mui/material';
import ManagerSidebar from '../../../Components/ManagerSidebar.jsx';
import ManagerNavbar from '../../../Components/Navbar/ManagerNavbar.jsx';

const Toolbox = () => {
  const [toolbox , setToolbox] = useState([]);
  const [tools ,setTools] = useState([]);
  

  useEffect(() =>{
    loadToolbox();
  },[]);

  //fetch toolbox details from the backend
  const loadToolbox = async () =>{
    try {
      const result = await axios.get("http://localhost:8080/toolbox/gettoolbox");
      
      

      //allocatedQuantity and availableQuantity functionalities
      const updatedTools = result.data.map(tool =>({
        ...tool,
        allocatedQuantity: tool.quantity - tool.availableQuantity,
        availableQuantity: tool.quantity - tool.allocatedQuantity
      }));
      setTools(result.data)
      console.log(result.data);
    } catch (error) {
      console.error("Error fetching toolbox:", error);
    }
  };

  return (
   
    <Grid container>
         <Grid item>
         <ManagerSidebar />
         </Grid>

         <Grid item xs>
         <ManagerNavbar />

          <Container maxWidth="md">
          <Box mt={4}>
            <Typography variant="h4" align="center" gutterBottom>
              Welcome to ToolBox Details Section!
            </Typography>
            <TableContainer component={Paper}>
              <Table stickyHeader aria-label="Toolbox Table" sx={{ borderCollapse: 'separate', borderSpacing: 0,'& .MuiTableCell-root':{border:'1px solid rgba(224,224,224,1)',} , }}>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', backgroundColor: 'grey', color: 'white'   }}>ToolBox ID</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', textAlign: 'center',  backgroundColor: 'grey', color: 'white'  }}>Project ID</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', backgroundColor: 'grey', color: 'white'  }}>Location ID</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tools.map((tool, index) => (
                    <TableRow key={tool.toolbox_id}>
                      <TableCell sx={{textAlign: 'center' }}>{tool.toolbox_id}</TableCell>
                      <TableCell sx={{textAlign: 'center' }}>{tool.project_id}</TableCell>
                      <TableCell sx={{textAlign: 'center' }}>{tool.location_id}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Box mt={2} display="flex" justifyContent="center" gap={2}>
             
              
              <Link to='/Stracktoolbox' style={{ textDecoration: 'none' }}>
                <Button variant="contained" color="secondary" sx={{ fontSize: '1rem' }}>
                  Track ToolBox
                </Button>
              </Link>
            </Box>
          </Box>
        </Container>

         </Grid>
    </Grid>
  )
}

export default Toolbox

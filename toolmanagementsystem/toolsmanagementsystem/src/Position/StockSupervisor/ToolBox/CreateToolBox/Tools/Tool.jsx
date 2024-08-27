import React, { useEffect, useState } from 'react';
import { Grid, Container, Box, Typography, Table, TableHead, TableRow, TableCell, TableBody, TextField, Badge, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import axios from 'axios';
import StockSidebar from '../../../../../Components/Sidebar/StockSidebar.jsx';
import { FaCartArrowDown } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';
import NewNav from '../../../../../Components/Navbar/NewNav.jsx';


const Tool = () => {
  const [tools, setTools] = useState([]);
  const [searchTools, setSearchTools] = useState('');
  const [cartItems, setCartItems] = useState([]);
  const [showCartDetails, setShowCartDetails] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { toolbox } = location.state || {}; // Retrieve the passed toolbox state

  useEffect(() => {
    fetchTools();
  }, []);

  //retrive tools from database
  const fetchTools = async () => {
    try {
      const response = await axios.get('http://localhost:8080/tool/gettools');
      setTools(response.data);
    } catch (error) {
      console.error('Error fetching tools: ', error);
    }
  };

  //tools search function
  const filteredTools = tools.filter((tool) =>
    tool.toolId.toLowerCase().includes(searchTools.toLowerCase()) ||
    tool.toolName.toLowerCase().includes(searchTools.toLowerCase())
  );

  //add select tools to cart
  const addToCart = (toolId) => {
    const selectedTool = tools.find((tool) => tool.toolId === toolId);
    if (selectedTool) {
      if (selectedTool.quantity > 0) {
        setCartItems([...cartItems, selectedTool]);
        const updatedTools = tools.map((tool) => {
          if (tool.toolId === toolId) {
            return { ...tool, quantity: tool.quantity - 1 };
          }
          return tool;
        });
        setTools(updatedTools);
      } else {
        const updatedTools = tools.map((tool) => {
          if (tool.toolId === toolId) {
            return { ...tool, quantity: <span style={{ color: 'red' }}>No available tools</span> };
          }
          return tool;
        });
        setTools(updatedTools);
        alert('No available tools');
      }
    }
  };

  //remove tools 
  const removeFromCart = (toolId) => {
    const updatedCartItems = cartItems.filter((item) => item.toolId !== toolId);
    setCartItems(updatedCartItems);
  };

  //submit dialog box after selecting tools
  const handleSubmit = () => {
    if (cartItems.length > 0) {
      const formData = { 
        ...toolbox,
        selectedTools: cartItems
      };
      navigate('/createtoolbox', { state: formData });
      setShowCartDetails(false);
    } else {
      alert("Please select at least one tool.");
    }
  };

  return (
    
    <Grid container>
        <Grid item>
            <StockSidebar/>
        </Grid>

        <Grid item xs>
            <NewNav/>

        <Container maxWidth="lg">
          <Box mt={4}>
            <Typography variant="h4" align="center" gutterBottom>
              Tools Section
            </Typography>
            <Box display="flex" alignItems="center" mb={2}>
              <TextField
                label="Search Tools"
                variant="outlined"
                fullWidth
                value={searchTools}
                onChange={(e) => setSearchTools(e.target.value)}
              />
            </Box>
            
            {/*  show tools table */}
            <Box sx={{ height: '400px', overflow: 'auto' }}>
              <Table stickyHeader aria-label="Tools Table" sx={{ borderCollapse: 'separate', borderSpacing: 0,'& .MuiTableCell-root':{border:'1px solid rgba(224,224,224,1)',} , }}>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', color: 'white' , background:"grey"}}>Tool_ID</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', color: 'white' , background:"grey" }}>ToolName</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', color: 'white' , background:"grey"}}>Description</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', color: 'white' , background:"grey" }}>Quantity</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', color: 'white' , background:"grey"}}>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredTools.map((tool) => (
                    <TableRow key={tool.toolId}>
                      <TableCell align="center">{tool.toolId}</TableCell>
                      <TableCell align="center">{tool.toolName}</TableCell>
                      <TableCell align="center">{tool.description}</TableCell>
                      <TableCell align="center">{tool.quantity}</TableCell>
                      <TableCell align="center">
                        <Button variant="contained" color="primary" onClick={() => addToCart(tool.toolId)}>
                          Add Tool
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>

          
            <Button
              variant="contained"
              startIcon={<FaCartArrowDown />}
              onClick={() => setShowCartDetails(true)}
              sx={{ position: 'fixed', bottom: '20px', left: '50%', transform:"translateX(-50%)", background:"green" }}
            >
              <Badge badgeContent={cartItems.length} color="secondary"></Badge>
              View Tool Cart
            </Button>
          </Box>
        </Container>
      </Grid>

      <Dialog open={showCartDetails} onClose={() => setShowCartDetails(false)}>
        <DialogTitle>Selected Tools</DialogTitle>
        <DialogContent>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', color: 'white', background:"black" }}>Tool_ID</TableCell>
                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', color: 'white', background:"black"  }}>ToolName</TableCell>
                <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', color: 'white', background:"black"  }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cartItems.map((item) => (
                <TableRow key={item.toolId}>
                  <TableCell align="center">{item.toolId}</TableCell>
                  <TableCell align="center">{item.toolName}</TableCell>
                  <TableCell align="center">
                    <Button variant="contained" color="secondary" onClick={() => removeFromCart(item.toolId)}>
                      Remove
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" sx={{ textAlign: 'center', color: 'white', background:"green" }} onClick={handleSubmit}>
            Submit
          </Button>
          <Button variant="contained" sx={{ textAlign: 'center', color: 'white', background:"red"  }} onClick={() => setShowCartDetails(false)}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>

  );
};

export default Tool;

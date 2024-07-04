import React, { useEffect, useState } from 'react';
import { TextField, Badge, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import axios from 'axios';
import StockSidebar from '../../../../../Components/Sidebar/StockSidebar.jsx';
import { FaCartArrowDown } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';
import './tools.css';
import StockSuperviorNavbar from '../../../../../Components/Navbar/StockSupervisorNavbar.jsx';

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
    <StockSidebar>
      <StockSuperviorNavbar/>
      <div className='toolsection'>
        <h1>Tools Section!</h1>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
          <TextField
            label="Search Tools"
            variant="outlined"
            fullWidth
            value={searchTools}
            onChange={(e) => setSearchTools(e.target.value)}
            style={{ flex: 1 }}
          />
        </div>
        <div className='tablesection'>
          <table className='table'>
            <thead>
              <tr>
                <th scope='col'>Tool_ID</th>
                <th scope='col'>ToolName</th>
                <th scope='col'>Description</th>
                <th scope='col'>Quantity</th>
                <th scope='col'>Action</th>
              </tr>
            </thead>
            <tbody className='bodysection'>
              {filteredTools.map((tool) => (
                <tr key={tool.toolId}>
                  <td>{tool.toolId}</td>
                  <td>{tool.toolName}</td>
                  <td>{tool.description}</td>
                  <td>{tool.quantity}</td>
                  <td>
                    <button className='btnAdd' onClick={() => addToCart(tool.toolId)}>Add Tool</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button className='cart-icon' onClick={() => setShowCartDetails(true)}>
          <FaCartArrowDown />
          <Badge badgeContent={cartItems.length} color="secondary"></Badge>
        </button>
      </div>
      <Dialog open={showCartDetails} onClose={() => setShowCartDetails(false)}>
        <DialogTitle>Selected Tools</DialogTitle>
        <DialogContent>
          <table className='table'>
            <thead>
              <tr>
                <th>Tool_ID</th>
                <th>ToolName</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.toolId}>
                  <td>{item.toolId}</td>
                  <td>{item.toolName}</td>
                  <td>
                    <button onClick={() => removeFromCart(item.toolId)}>Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit}>Submit</Button>
          <Button onClick={() => setShowCartDetails(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </StockSidebar>
  );
};

export default Tool;

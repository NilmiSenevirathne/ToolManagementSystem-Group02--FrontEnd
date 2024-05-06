import React, { useEffect, useState } from 'react';
import StockSidebar from '../../../../../Components/Sidebar/StockSidebar';
import axios from "axios";
import { Link, useParams } from 'react-router-dom';
import { TextField, Badge } from '@mui/material';
import { FaCartArrowDown } from "react-icons/fa";
import Cart from './Cart'; // Import the Cart component with the correct path
import './tools.css';

const Tool = () => {
  // State variables for tools data, search query, and selected items
  const [tools, setTools] = useState([]);
  const [searchTools, setSearchTools] = useState('');
  const [cartItems, setCartItems] = useState([]); // State variable to store selected items for cart badge

  // Fetch tools data from API when component mounts
  useEffect(() => {
    fetchTools();
  }, []);

  // Function to fetch tools data from API
  const fetchTools = async () => {
    try {
      // Fetch tools data from API endpoint
      const response = await axios.get('http://localhost:8080/tool/gettools');
      // Set the tools state with the fetched data
      setTools(response.data);
    } catch (error) {
      console.error('Error fetching tools: ', error);
    }
  };

  // Filter tools based on search query
  const filteredTools = tools.filter(tool =>
    tool.toolId.toLowerCase().includes(searchTools.toLowerCase()) ||
    tool.toolName.toLowerCase().includes(searchTools.toLowerCase())
  );

  // Function to add a tool to the cart
  const addToCart = (toolId) => {
    const selectedTool = tools.find(tool => tool.toolId === toolId);
    if (selectedTool) {
      // Check if quantity is greater than 0 before adding to cart
      if (selectedTool.quantity > 0) {
        setCartItems([...cartItems, selectedTool]); // Update cartItems state
        // Decrease the quantity of the selected tool
        const updatedTools = tools.map(tool => {
          if (tool.toolId === toolId) {
            return { ...tool, quantity: tool.quantity - 1 };
          }
          return tool;
        });
        setTools(updatedTools);
      } else {
        // Update the quantity to "No available tools" directly in the table
        const updatedTools = tools.map(tool => {
          if (tool.toolId === toolId) {
            return { ...tool, quantity: <span style={{ color: 'red' }}>No available tools</span> };
          }
          return tool;
        });
        setTools(updatedTools);
        // Display "No available tools" message directly in the table
        alert("No available tools");
      }
    }
  };

  return (
    <StockSidebar>
      <div className='toolsection'>
        <h1>Tools Section!</h1>

        {/* Search input field with search button */}
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

        {/* Table to display tools data */}
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
              {/* Map over the filtered tools array to render tool details */}
              {filteredTools.map((tool, index) => (
                <tr key={tool.toolId}>
                  <td>{tool.toolId}</td>
                  <td>{tool.toolName}</td>
                  <td>{tool.description}</td>
                  <td>{tool.quantity}</td>
                  <td>
                    {/* Button for adding tools to the cart */}
                    <button className='btnAdd' onClick={() => addToCart(tool.toolId)}>Add Tool</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Link to the cart page with the number of selected items */}
        <Link to="/cart" className='cart-icon' >
          <FaCartArrowDown /><Badge badgeContent={cartItems.length} color="secondary"></Badge>
        </Link>
      </div>
    </StockSidebar>
  );
};

export default Tool;

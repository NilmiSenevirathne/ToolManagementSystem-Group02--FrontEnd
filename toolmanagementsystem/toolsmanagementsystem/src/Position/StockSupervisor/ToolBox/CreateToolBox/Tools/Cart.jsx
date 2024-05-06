import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from "react-icons/fa";
import StockSidebar from '../../../../../Components/Sidebar/StockSidebar';

const Cart = ({ selectedItems }) => {
  return (
    <StockSidebar>
      <div>
        <h1>Selected Tools</h1>
        <Link to="/tool" className="back-btn"><FaArrowLeft /> Back to Tool Selection</Link>
        <table className='table'>
          <thead>
            <tr>
              <th scope='col'>Tool_ID</th>
              <th scope='col'>ToolName</th>
              {/* Add more table headers as needed */}
            </tr>
          </thead>
          <tbody>
            {selectedItems && selectedItems.length > 0 ? (
              selectedItems.map((tool, index) => (
                <tr key={index}>
                  <td>{tool.toolId}</td>
                  <td>{tool.toolName}</td>
                  {/* Add more table data cells as needed */}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2">No selected tools</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </StockSidebar>
  );
};

export default Cart;

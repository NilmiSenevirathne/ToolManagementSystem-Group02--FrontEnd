import React from 'react';
import StockSidebar from '../../../../../Components/Sidebar/StockSidebar';

const Cart = ({ cartItems }) => {
  return (
    <StockSidebar>
    <div>
      <h2>Cart</h2>
      <ul>
        {cartItems.map((item, index) => (
          <li key={index}>
            <strong>Tool ID:</strong> {item.toolId}, <strong>Tool Name:</strong> {item.toolName}, <strong>Description:</strong> {item.description}, <strong>Quantity:</strong> {item.quantity}
          </li>
        ))}
      </ul>
    </div>
    </StockSidebar>
  );
};

export default Cart;

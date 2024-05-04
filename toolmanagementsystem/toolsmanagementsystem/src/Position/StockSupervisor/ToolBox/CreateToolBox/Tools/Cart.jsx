import React from 'react';
import { connect } from 'react-redux'; // Import connect from react-redux
import { addToCart } from '../actions'; // Import the action creator for adding items to the cart

const Tool = ({ tool, addToCart }) => { // Add addToCart as a prop
  const { toolId, toolName } = tool;

  // Define clickHandler function to add tool to the cart
  const clickHandler = () => {
    // Dispatch the action to add the tool to the cart
    addToCart(tool);
  }

  return (
    <div>
      <h2>{toolName}</h2>
      <p>ID: {toolId}</p>
      <button onClick={clickHandler}>Add to Cart</button>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  addToCart: (tool) => dispatch(addToCart(tool))
});

export default connect(
  null,
  mapDispatchToProps
)(Tool);

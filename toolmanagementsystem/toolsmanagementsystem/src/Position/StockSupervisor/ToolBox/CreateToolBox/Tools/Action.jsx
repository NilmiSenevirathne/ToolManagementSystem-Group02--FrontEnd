// actions.jsx

// Action types
export const ADD_TO_CART = 'ADD_TO_CART';

// Action creators
export const addToCart = (tool) => ({
  type: ADD_TO_CART,
  payload: tool
});

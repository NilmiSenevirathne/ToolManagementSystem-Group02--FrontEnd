// src/redux/store.js
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import userLoginReducer from '../redux/userResducer'; // Adjust import based on file structure

const reducer = combineReducers({
  userLogin: userLoginReducer,
  // Add other reducers if needed
});

const initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;

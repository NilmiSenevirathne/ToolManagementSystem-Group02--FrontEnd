// src/actions/userActions.js

import axios from 'axios';

// Login action
export const loginUser = (username, password) => async (dispatch) => {
    try {
        const response = await axios.post('http://localhost:8080/authentication/login', { username, password });
        const userInfo = response.data; // Assuming the response contains user details including role
        dispatch({
            type: 'USER_LOGIN_SUCCESS',
            payload: userInfo, // Store complete user info in state
        });
    } catch (error) {
        console.error('Error logging in:', error);
        dispatch({
            type: 'USER_LOGIN_FAIL',
            payload: error.message,
        });
    }
};

// Logout action
export const logoutUser = () => (dispatch) => {
    // Perform logout actions if necessary, e.g., clearing tokens from localStorage
    dispatch({
        type: 'USER_LOGOUT',
    });
};

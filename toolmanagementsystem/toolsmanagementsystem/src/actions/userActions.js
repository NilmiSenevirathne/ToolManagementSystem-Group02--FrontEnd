import axios from 'axios';

    
// In src/actions/userActions.js
export const loginUser = (username, password) => async (dispatch) => {
    try {
        const response = await axios.post('http://localhost:8080/authentication/login', { username, password });
        const userInfo = response.data; // Ensure the response contains the expected data
        console.log('User Info from API:', userInfo); // Debugging line

        dispatch({
            type: 'USER_LOGIN_SUCCESS',
            payload: userInfo, // Store complete user info in state
        });
        console.log('User login success, dispatching action with payload:', userInfo);
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

// src/actions/userActions.js
import axios from 'axios';
import { USER_LOGIN_SUCCESS, USER_LOGIN_FAIL } from '../constants/userConstants';

export const loginUser = (username, password) => async (dispatch) => {
    try {
        const response = await axios.post('http://localhost:8080/authentication/login', { username, password });
        const userInfo = response.data;

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: userInfo,
        });

        // Ensure userInfo has role and other necessary properties
        console.log('Login User Info:', userInfo); // Debugging line

        // Store userInfo as an object in localStorage
        localStorage.setItem('userInfo', JSON.stringify(userInfo));
    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.message,
        });
    }
};

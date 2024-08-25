import axios from 'axios';

export const loginUser = (username, password) => async (dispatch) => {
    try {
        const response = await axios.post('http://localhost:8080/authentication/login', { username, password });
        const userInfo = response.data; // Ensure this includes the role

        dispatch({
            type: 'USER_LOGIN_SUCCESS',
            payload: userInfo,
        });

        // Optionally, store user info in localStorage
        localStorage.setItem('userInfo', JSON.stringify(userInfo));

    } catch (error) {
        dispatch({
            type: 'USER_LOGIN_FAIL',
            payload: error.message,
        });
    }
};

export const logoutUser = () => (dispatch) => {
    localStorage.removeItem('userInfo');
    dispatch({
        type: 'USER_LOGOUT',
    });
};

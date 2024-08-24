// src/redux/userReducer.js
const initialState = {
  userInfo: null,
};

const userLoginReducer = (state = initialState, action) => {
  switch (action.type) {
      case 'USER_LOGIN_SUCCESS':
          return {
              ...state,
              userInfo: action.payload,
          };
      case 'USER_LOGOUT':
          return {
              ...state,
              userInfo: null,
          };
      default:
          return state;
  }
};

export default userLoginReducer;

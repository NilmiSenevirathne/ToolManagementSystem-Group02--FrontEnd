// import React, { useState, useEffect } from 'react';
// import { AppBar, Toolbar, Typography, Avatar, IconButton, Menu, MenuItem } from '@mui/material';
// import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
// import profile from '../../images/profile.jpg';
// import { useNavigate } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import { logoutUser } from '../../actions/userActions';

// const Adminnavbar = () => {
//   const userLogin = useSelector((state) => state.userLogin);
//   const { userInfo } = userLogin || {};
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const [anchorEl, setAnchorEl] = useState(null);

//   useEffect(() => {
//     console.log('User Info from Redux:', userInfo);
//   }, [userInfo]);

//   const handleMenuOpen = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleMenuClose = () => {
//     setAnchorEl(null);
//   };

//   const handleProfileClick = () => {
//     navigate('/profile');
//     handleMenuClose();
//   };

//   const handleLogout = () => {
//     dispatch(logoutUser()); // Call logoutUser action
//     navigate('/login');
//   };

//   return (
//     <AppBar position="static">
//       <Toolbar>
//         <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
//           Welcome, {userInfo }!
//         </Typography>
//         <IconButton onClick={handleMenuOpen}>
//           <Avatar alt="Profile Picture" src={userInfo?.profilePictureUrl || profile} />
//           <ArrowDropDownIcon />
//         </IconButton>
//         <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
//           <MenuItem onClick={handleProfileClick}>Profile</MenuItem>
//           <MenuItem onClick={handleLogout}>Logout</MenuItem>
//         </Menu>
//       </Toolbar>
//     </AppBar>
//   );
// };

// export default Adminnavbar;

import React from "react";
import {CssBaseline, Grid} from '@mui/material';
import AdminSidebar from '../../../Components/Sidebar/AdminSidebar.jsx';
import AdminNavbar from '../../../Components/Navbar/Adminnavbar.jsx';

const DashBoard = () => {
  return (
    <Grid container>
      <CssBaseline/>
         <Grid item>
            <AdminSidebar/>
         </Grid>

         <Grid item xs>
             <AdminNavbar/>
         </Grid>
    </Grid>
  )
}

export default DashBoard


import React from "react"
import {Grid, CssBaseline} from '@mui/material';
import AdminSidebar from '../../../Components/Sidebar/AdminSidebar.jsx';
import AdminNavbar from '../../../Components/Navbar/Adminnavbar.jsx';



const UserReg = () => {
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

export default UserReg


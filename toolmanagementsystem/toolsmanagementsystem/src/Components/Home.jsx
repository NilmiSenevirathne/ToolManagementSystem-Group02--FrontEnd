import { CssBaseline, Grid } from '@mui/material'
import React from 'react'
import Header from '../Components/Header.jsx';
import Footer from '../Components/Footer.jsx';

function Home() {
  return (
    
    <Grid container>
        <CssBaseline/>
        <Grid item>
            <Header/>
            
             <div>
                   <h1> Tool Management System </h1>
              </div>

              <div>
                   <h1>About Us</h1>
              </div>

              <div>
                   <h1>Services </h1>
              </div>
 
            <Footer/>
        </Grid>


    </Grid>
  )
}

export default Home


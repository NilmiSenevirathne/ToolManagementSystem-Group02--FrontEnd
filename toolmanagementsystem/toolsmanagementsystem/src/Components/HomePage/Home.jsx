import React from 'react';
import { Button,Typography, Box , Grid} from '@mui/material';
import HomeNavbar from '../HomePage/HomeNavbar.jsx';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import backgroundImage from '../../images/home4.png';



function Home() {
  const handleLogin = () => {
    // Navigate to login page
    window.location.href = '/login';
  };

  return (
    // <Root>
    //   <Title>
    //     Tool Management System
    //   </Title>
    //   <LoginButton
    //     variant="contained"
    //     color="primary"
    //     onClick={handleLogin}
    //   >
    //     Login
    //   </LoginButton>
    // </Root>

    <Grid container>
        <Grid item>
              {/* <HomeNavbar/> */}

        </Grid>

        <Grid item 
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: `url(${backgroundImage})`,
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
        />      
         <Button
            variant="contained"
            color="primary"
           onClick={handleLogin}
      >
          Login
         </Button>
        </Grid>
  );
}

export default Home;

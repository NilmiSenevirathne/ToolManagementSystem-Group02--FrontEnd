import React from 'react';
import Navbar from '../Navbar/Navbar.jsx';
import { CCarousel, CCarouselItem, CImage } from '@coreui/react'; // Import components from CoreUI
import ReactPaginate from 'react-paginate';
import { Button, Typography, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const Root = styled(Box)(({ theme }) => ({
  height: '100vh',
  backgroundImage: 'url("back1.jpg")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  color: 'white',
}));

const Title = styled(Typography)(({ theme }) => ({
  fontSize: '4rem',
  fontWeight: 'bold',
  marginBottom: theme.spacing(2),
}));

const LoginButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(4),
}));

function Home() {
  const handleLogin = () => {
    // Navigate to login page
    window.location.href = '/login';
  };

  return (
    <Root>
      <Title>
        Tool Management System
      </Title>
      <LoginButton
        variant="contained"
        color="primary"
        onClick={handleLogin}
      >
        Login
      </LoginButton>
    </Root>
  );
}

export default Home;

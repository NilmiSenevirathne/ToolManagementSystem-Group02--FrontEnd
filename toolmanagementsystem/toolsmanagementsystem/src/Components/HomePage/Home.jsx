import React from 'react';
import Navbar from '../Navbar/Navbar.jsx';
import { CCarousel, CCarouselItem, CImage } from '@coreui/react'; // Import components from CoreUI

// Import images
import Img1 from '../../images/back1.jpg'; 
import Img2 from '../../images/back2.jpg'; 
import Img3 from '../../images/home5.webp'; 

const Home = () => {
  return (
    <div className='home'>
      <Navbar/>
      <div className='slides'>
        <CCarousel controls transition="crossfade">
          <CCarouselItem>
            <CImage className="d-block w-100" src={Img1} alt="slide 1" />
          </CCarouselItem>
          <CCarouselItem>
            <CImage className="d-block w-100" src={Img2} alt="slide 2" />
          </CCarouselItem>
          <CCarouselItem>
            <CImage className="d-block w-100" src={Img3} alt="slide 3" />
          </CCarouselItem>
        </CCarousel>
      </div>

      <footer>
        {/* Add content for your footer here */}
        <p>&copy; 2024 Your Company Name. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;

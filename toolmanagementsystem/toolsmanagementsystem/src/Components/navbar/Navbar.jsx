import "./navbar.css";
import EmailIcon from '@mui/icons-material/Email';
import Person2Icon from '@mui/icons-material/Person2';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import SearchIcon from '@mui/icons-material/Search';
import DilumBMKLogo from '../../images/BMKLogo.jpg'; // Import the logo image file

const Navbar = () => {
  return (
    <div className='navbar'>
        <img src={DilumBMKLogo} alt="Dilum BMK Logo" className="logo" />
        <a href="home">Home</a>
        <a href="aboutus">About Us</a>
        <a href="projecs">Projects</a>
        <a href="contact us">Contact Us</a>
        
    </div>
  );
};

export default Navbar;

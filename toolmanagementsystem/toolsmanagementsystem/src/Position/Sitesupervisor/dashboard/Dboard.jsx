
import "./dboard.css"
import Sbar from "../../../Components/Sbar"
import Navbr from "../../../Components/Navbar/Navbr"
import { FiAlignJustify } from "react-icons/fi";
const Dboard = () => {
  return (
    <div className='dashboard'>
     
     <Sbar/>
    
      <div className='homeContainer'>
       <Navbr/>
      </div>
    </div>
  )
}

export default Dboard


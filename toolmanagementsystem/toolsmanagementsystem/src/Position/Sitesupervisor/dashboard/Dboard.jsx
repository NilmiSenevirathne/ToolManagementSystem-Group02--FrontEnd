
import "./dboard.css"
import Sbar from "../../../Components/Sbar"
import Navbr from "../../../Components/Navbar/Navbr"
import { FiAlignJustify } from "react-icons/fi";
import {Link} from "react-router-dom"
const Dboard = () => {
  return (
    <div className='dashboard'>
     
     <Sbar/>
   <div className='homeContainer'>
    <Navbr/>
       <div className="bttn">
       
       <Link className="btn1" to="/ToolStatosRep">
       <div className="cont"> 
      View All Tool Status Repors</div></Link>
       
       <Link  className="btn1" to="/RequiredToolReport" >
      View All Required Tool Reports</Link>
       
       
        </div>
      </div>
      
      
    </div>
    
  )
}

export default Dboard


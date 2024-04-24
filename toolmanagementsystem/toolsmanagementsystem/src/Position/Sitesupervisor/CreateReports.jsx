import "./createReports.css"
import Sbar from '../../Components/Sbar'
import {Link} from "react-router-dom"
import Navbr from '../../Components/Navbar/Navbr'
import HandymanIcon from '@mui/icons-material/Handyman';
import AssessmentIcon from '@mui/icons-material/Assessment';
const CreateReports = () => {
  
  return (
    <div className='Createrep'>
        <Sbar/>
    <div className='container'>
        <Navbr/>
       
        <div className="btton">
       
        <Link className="btn" to="/ToolStatosRep">
        <div className="cont"> <  HandymanIcon style={{ fontSize: 60 }}/>
       Tool Status Reports</div></Link>
        
        <Link  className="btn" to="/RequiredToolReport" >
       Required Tool Reports</Link>
        
        
         </div>
      </div>
      </div>
   
  )
}
export default CreateReports

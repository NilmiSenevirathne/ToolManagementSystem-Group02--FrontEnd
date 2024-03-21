import "./dashboard.css"
import Sbar from "../../components/Sbar/Sbar"
import Navbar from "../../components/navbar/Navbar"
import Widget from "../../components/Widget/Widget"

const DashBoard = () => {
  return (
    <div className='dashboard'>
     <Sbar/>
     <div className="homeContainer">
    <Navbar/>
    
     </div>
    </div>
  )
}

export default DashBoard


import "./admindashboard.css"
import Sbar from "../../../Components/Sbar/Sbar"
import Navbar from "../../../Components/Navbar/Navbar"




const AdminDashboard = () => {
  return (
    <div className='dashboard'>
    <Sbar/>
    <div className="homeContainer">
   <Navbar/>
   
    </div>
   </div>
  )
}

export default AdminDashboard



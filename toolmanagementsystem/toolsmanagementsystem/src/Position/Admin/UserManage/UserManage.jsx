import "./userManage.css"
import Sbar from "../../components/Sbar/Sbar"
import Navbar from "../../components/navbar/Navbar"


const UserManage = () => {
  return (
    <div className='UserManage'>
      <Sbar/>
    <div className="listContainer">
     <Navbar/>
    </div>
    </div>
  )
}

export default UserManage

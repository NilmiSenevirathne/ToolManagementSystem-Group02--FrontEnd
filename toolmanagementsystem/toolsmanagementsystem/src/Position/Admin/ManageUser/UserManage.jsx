import "./UserManage.css"
import Sbar from "../../../Components/Sbar/Sbar"
import Navbar from "../../../Components/Navbar/Navbar"
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const UserManage = () => {

const[users,setUsers]=useState([])
   
   useEffect(()=>{

   loadUsers();
   }, []);
   const loadUsers=async()=>{
    const result=await axios.get("http://localhost:8080/getusers")
    setUsers(result.data);
   }

    //delete users from the system
    const deleteUser=async (id) =>{
    await axios.delete(`http://localhost:8080/deleteUser/${id}`);
    loadUsers();

 };


  return (
    <div className='UserManage'>
      <Sbar/>
    <div className="listContainer">
     <Navbar/>
     
    <table class="table border">
  <thead>
    <tr>
      <th scope="col">User Id</th>
      <th scope="col">Contact</th>
      <th scope="col">First Name</th>
      <th scope="col">Last Name</th>
      <th scope="col">Nic</th>
      <th scope="col">Password</th>
      <th scope="col">Role</th>
      <th scope="col">User Name</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
    {
      users.map((user,index) =>(
        <tr>
        <th scope="row" key={index}>{index+1}</th>
        <td>{user.contact}</td>
        <td>{user.firstname}</td>
        <td>{user.lastname}</td>
        <td>{user.nic}</td>
        <td>{user.password}</td>
        <td>{user.role}</td>
        <td>{user.username}</td>
        <td>
          <Link className="btn btn-primary mx-2" to={`/ViewUser/${user.userid}`}>View</Link>
          <Link className="btn btn-outline-primary mx-2" to={`/edituser/${user.userid}`}>Edit</Link>
          <button className="btn btn-danger mx-2"  onClick={() =>deleteUser(user.userid)}>Delete</button>
        </td>
      </tr>
      ) )
    }
  
   
  </tbody>
</table>
     
    </div>
    </div>
  )
}

export default UserManage

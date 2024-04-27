import "./userReg.css"
import Sbar from "../../../Components/Sbar/Sbar"
import Navbar from "../../../Components/Navbar/Navbar"
import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {Link} from "react-router-dom"


const UserReg = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    contact: "",
    firstname: "",
    lastname: "",
    nic: "",
    password: "",
    role: "",
    username: ""
  });

  const { contact, firstname, lastname, nic, password, role, username } = user;

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit =(e) =>{
    setUser({...user,[e.target.name]:EventTarget.value});
  }


  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(user);
      await axios.post("http://localhost:8080/adduser", user);
      navigate("/UserManage");
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };

  

  return (
    <div className='userRg'>
      <Sbar/>
    <div className="listContainer">
    <Navbar/>

      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
           
        <h2 className="text-center m-4">Register User</h2>
        
      <form onSubmit={(e)=>onSubmit(e)}>
        <div className="mb-3">
          <label htmlFor="FirstName" className="form-label">
           First Name
          </label>
          <br/>
           <input
          type={"text"}
          className="FirstName"
          placeholder="Enter First Name"
          name="firstname"
          value={firstname}
          onChange={(e)=>onInputChange(e)}/>
        </div>
        <div className="mb-3">
        <label htmlFor="LastName" className="form-label">
         Last Name
          </label>
          <br/>
           <input
          type={"text"}
          className="LastName"
          placeholder="Enter Last Name"
          name="lastname"
          value={lastname}
          onChange={(e)=>onInputChange(e)}/>
        
       
        </div>
        <div className="mb-3">
          <label htmlFor="Contact" className="form-label">
          Contact
          </label>
          <br/>
           <input
          type={"text"}
          className="Contact"
          placeholder="Enter Contact"
          name="contact"
          value={contact}
          onChange={(e)=>onInputChange(e)}/>
        </div>
        <div className="mb-3">
          <label htmlFor="Nic" className="form-label">
           Nic
          </label>
          <br/>
           <input
          type={"text"}
          className="Nic"
          placeholder="Enter Nic"
          name="nic"
          value={nic}
          onChange={(e)=>onInputChange(e)}/>
        </div>
        <div className="mb-3">
          <label htmlFor="Password" className="form-label">
           Password
          </label>
          <br/>
           <input
          type={"password"}
          className="Password"
          placeholder="Enter Password"
          name="password"
          value={password}
          onChange={(e)=>onInputChange(e)}/>
        </div>
      
        <div className="mb-3">
          <label htmlFor="role" className="form-label">
           Role
          </label>
          <br/>
           <input
          type={"text"}
          className="Role"
          placeholder="Enter Role"
          name="role"
          value={role}
          onChange={(e)=>onInputChange(e)}/>
        </div>
        <div className="mb-3">
          <label htmlFor="UserName" className="form-label">
           User Name
          </label>
          <br/>
           <input
          type={"text"}
          className="UserName"
          placeholder="Enter Username"
          name="username"
          value={username}
          onChange={(e)=>onInputChange(e)}/>
        </div>

        <button type="submit" className="btn btn-outline-primary">
          Submit
        </button>
        <Link type="cancel" className="btn btn-outline-danger mx-2" to="/UserReg">
          Cancel
        </Link>
        </form>

    </div>
 </div>
 </div>
 </div>
 
 </div>
  )
}

export default UserReg


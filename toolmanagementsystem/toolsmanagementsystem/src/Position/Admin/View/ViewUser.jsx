import React, { useEffect, useState } from 'react'
import {Link} from "react-router-dom"
import axios from "axios";
import {useParams} from "react-router-dom"

export default function ViewUser() {

    const [user,setUser]=useState({
       
            contact: "",
            firstname: "",
            lastname: "",
            nic: "",
            password: "",
            role: "",
            username: ""
          });

    const{id}=useParams();

          useEffect(()=>{
      loadUser()
          },[])

        

          const loadUser = async () => {
            try {
                console.log(id);
                const result = await axios.get(`http://localhost:8080/users/${id}`);
                setUser(result.data);
            } catch (error) {
                console.error("Error occurred:", error);
            }
        }

  return (
    <div className="container">
        <div className="row">
            <div className="col-md-6-offset-md-3 border rounded p-4 mt-2 shadow">
                <h2 className='text-center m-4'>User Details</h2>

                <div className='card'>
                    <div className='card-header'>
                        Details of user id:
                        <ul className='="list-group list-group-flush'>
                            <li className='list-group-item'>
                                <b>First Name:</b>
                                {user.firstname}
                            </li>
                            <li className='list-group-item'>
                                <b>Last Name:</b>
                                {user.lastname}
                            </li>
                            <li className='list-group-item'>
                                <b>Contact:</b>
                                {user.contact}
                            </li>
                    
                            <li className='list-group-item'>
                                <b>Nic:</b>
                                {user.nic}
                            </li>
                            <li className='list-group-item'>
                                <b>Password:</b>
                                {user.password}
                            </li>
                            <li className='list-group-item'>
                                <b>Role:</b>
                                {user.role}
                            </li>
                            <li className='list-group-item'>
                                <b>User Name:</b>
                                {user.username}
                            </li>
                            

                        </ul>
                    </div>
                </div>
                <Link className="btn btn-primary my-2" to={"/UserManage"}>Back to Home</Link>
            </div>

        </div>
      
    </div>
  )
}

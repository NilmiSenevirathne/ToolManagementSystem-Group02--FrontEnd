import React, { useEffect,useState } from 'react'
import axios from 'axios';
import AddProjects from './Projects/AddProjects';
export default function Home() {

const [users,setUsers]=useState([])
useEffect (()=>{
  loadUsers();
},[])

const loadUsers=async()=>{
  const result=await axios.get("http://localhost:8080/Projects")
  setUsers(result.data)
}

  return (
    
    <div className='container'> 
    
      <div className='py-4'>
      <table className="table border shadow ">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Project id</th>
      <th scope="col">Description</th>
      <th scope="col">projectName</th>
      <th scope="col">supervisor</th>
      <th scope="col">SiteSupervisor</th>
      <th scope="col">locationId</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
    {
      users.map((user,index)=>(
      <tr>
      <th scope="row"key={index}>{index+1}</th>
      <td>{user.id}</td>
      <td>{user.description}</td>
      <td>{user.projectName}</td>
      <td>{user.SiteSupervisorID}</td>
      <td>{user.SiteSupervisor}</td>
      <td>{user.locationId}</td>
        <td>
          <button className='btn btn-primary mx-2'>View</button>
          <button className='btn btn-outline-primary mx-2'>Edit</button>
          <button className='btn btn-danger mx-2'>Delete</button>
        </td>
      </tr>

      ))
    }
    
    
  </tbody>
</table>
      </div>

    </div>
  )
}


import React from 'react'
import {Link} from "react-router-dom"
export default function Navbar() {

  return (
    <div>
     
      
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary justify-content-center">
  <div className="container-fluid">
    <a className="navbar-brand " href="#" >Manage Projects
    </a>
  <h1>Manage Projects</h1>
    <Link className="btn btn-outline-light" to="/addprojects" >Add Projects</Link>
    
  </div>
   </nav>
    </div>
  )
}

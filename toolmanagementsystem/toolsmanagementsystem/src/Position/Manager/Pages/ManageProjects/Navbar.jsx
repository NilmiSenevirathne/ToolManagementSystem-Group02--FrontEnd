import React from 'react';
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg justify-content-center"  style={{ backgroundColor: 'lightskyblue' }}>
    
          <a className="navbar-brand" style={{textAlign:'center'}} >Manage Projects</a>
          <div >
          <Link className="btn" style={{ backgroundColor: 'navy',color: 'white'}} to="/addprojects">Add Projects</Link>

          </div>

      </nav>
    </div>
  );
}

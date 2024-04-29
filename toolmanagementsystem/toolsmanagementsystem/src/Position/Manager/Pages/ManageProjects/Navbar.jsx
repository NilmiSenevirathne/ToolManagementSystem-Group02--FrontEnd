import React from 'react';
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark justify-content-center">
    
          <a className="navbar-brand" href="#">Manage Projects</a>

          <Link className="btn btn-outline-light" to="/addprojects">Add Projects</Link>
        
      </nav>
    </div>
  );
}

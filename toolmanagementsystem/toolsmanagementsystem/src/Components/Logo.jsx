import React from 'react'
import './Logo.css'

export default function Logo() {
     const handleToggleSideBar = () =>{
        document.body.classList.toggle("togglr-sidebar");
     };

  return (
    <div className='d-flex align-items-center justify-content-between'>
        <a href='/' className='logo d-flex align-items-center'>
            {/*<img src=" " alt=" " */}
            <span className='d-none d-lg-block'> Dilum BMK Engineers</span>
        </a>

    
        
    </div>
  )
}

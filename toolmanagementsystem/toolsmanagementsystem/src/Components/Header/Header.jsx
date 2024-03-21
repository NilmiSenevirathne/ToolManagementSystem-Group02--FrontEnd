import React from 'react'
import './Header.css';
import Logo from '../Logo';


export default function Header() {
  return (
    <div>
      
         <header id  = 'header' className='header fixed-top d-flex align-items-center'>

            {/*logo*/}
              <Logo/>
          
              
          </header>
    </div>
  )
}

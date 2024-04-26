
//manager sidebar
import React, { useState } from 'react';
import './Sidebar.css'

import {
     FaTh,
     FaCartPlus,
     FaBriefcase,
     FaMapMarkerAlt,
     FaNewspaper,
     FaSearch

}from "react-icons/fa";
import { NavLink } from 'react-router-dom';

const Sidebar = ({children}) =>{
     const[isOpen, setIsOpen] = useState(false);
     const toggle = () => setIsOpen(!isOpen);
     const menuItm = [ 
          {
               path:"/dashboard",
               name:"Dashboard",
               icon:<FaTh/>
          },
          {
               path:"/ManageProjects",
               name:"Manage Projects",
               icon:<FaCartPlus/>
          },
          {
               path:"/ViewInventory",
               name:"View Inventory",
               icon:<FaBriefcase/>
          },
          {
               path:"/tracktoolbox",
               name:"Track Location",
               icon:<FaSearch/>
          },
       
     ]

    return(
 <div className='container'> 
          <div style={{width:isOpen ? "300px" :"50px"}} className='sidebar'></div>
          <div className="sidebar">

          <br></br>
               <div className="top_section">
                
                    <h1 style={{display: isOpen ? "block" : "50px"}} className="Role">Manager</h1>   
                    
               </div>
                    <br></br>
             
                  
                  <h3 className='name'>Manuji Anusari</h3>
                  <div className='button'>
                        <button type='button'>EditProfile</button>
                  </div>
                  <br/> <br/>
               {
                menuItm.map((item, index )=>(

                    <NavLink to ={item.path} key={index} className="link" activeclassname="active">
                         <div className="icon">{item.icon}</div>
                         <div className="link_text">{item.name}</div>
                    </NavLink>
                ))
              }
          </div>
          <main>{children}</main>
          </div>
     
    );
};
export default Sidebar;
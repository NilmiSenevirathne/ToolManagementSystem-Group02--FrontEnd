import React from 'react';
import './Sidebar.css';
import ProImg from '../../images/user1.jpg';
import { FaTh, FaCartPlus, FaBriefcase, FaSearch, FaNewspaper } from 'react-icons/fa';
import { RiLogoutCircleRLine } from "react-icons/ri";
import { NavLink } from "react-router-dom";

const Sidebar = ({ currentPage, onPageChange }) => {

  return (
    <div className='menu'>
      <div className='company'>
        <h2 className='name'>Dilum BMK Engineers (Pvt) Ltd.</h2>
      </div>
      <div className='menu-list'>
        <div className='prof'>
          <img className='img' src={ProImg} alt="" />
          <h3 className='username'>Nilmi Ama</h3>
          <span className='role'>Stock Supervisor</span>
        </div>

        <div className='ContentContainer'>
          {/*sidebar contents */}


          <ul>

            <li>
              <NavLink to='/dashboard' onClick={() => onPageChange('Dashboard')} className={currentPage === 'Dashboard' ? 'active item' : 'item'}>
                <FaTh className='icon' />Dashboard
              </NavLink>
            </li>

            <li>
              <NavLink to='/dashboard/managestock' onClick={() => onPageChange('ManageStock')} className={currentPage === 'ManageStock' ? 'active item' : 'item'}>
                <FaCartPlus className='icon' /><span>ManageStock</span>
              </NavLink>
            </li>

            <li>
              <NavLink to='/dashboard/createtoolbox' onClick={() => onPageChange('CreateToolbox')} className={currentPage === 'CreateToolbox' ? 'active item' : 'item'}>
                <FaBriefcase className='icon' /><span>CreateToolBox</span>
              </NavLink>
            </li>

            <li>
              <NavLink to='/dashboard/tracktoolbox' onClick={() => onPageChange('TrackToolbox')} className={currentPage === 'TrackToolbox' ? 'active item' : 'item'}>
                <FaSearch className='icon' /><span>TrackToolBox</span>
              </NavLink>
            </li>

            <li>
              <NavLink to='/dashboard/reports' onClick={() => onPageChange('Reports')} className={currentPage === 'Reports' ? 'active item' : 'item'}>
                <FaNewspaper className='icon' /><span>Reports</span>
              </NavLink>
            </li>

            <li>
              <NavLink to='/' className='item'><RiLogoutCircleRLine className='icon' /> Logout</NavLink>
            </li>

          </ul>
        </div>
      </div>
    </div>
  )
}

export default Sidebar;

// Dashboard.jsx
import React, { useState } from 'react';
import Sidebar from '../../Components/Sidebar/Sidebar';
import './Dashboard.css';


const Dashboard = () => {
  const [currentPage, setCurrentPage] = useState('Dashboard');//set the default page to Dashboard.jsx

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  

  return (
    <div className='dashboard-container'>

      <div>
           <Sidebar currentPage={currentPage} onPageChange={handlePageChange} /> 
      </div>

       <div className='dashboard-content'>
            <h1>Welcome to StockSupervisor Dashboard!</h1>
       </div>       
    </div>
    
  );
};

export default Dashboard;

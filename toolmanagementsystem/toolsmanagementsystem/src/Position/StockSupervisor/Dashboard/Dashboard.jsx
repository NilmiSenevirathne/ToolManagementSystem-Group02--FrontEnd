// Dashboard.jsx
import React from 'react';
import './Dashboard.css'
import Sidebar from '../../../Components/Sidebar/Sidebar';

const Dashboard = () => {
  const role = "StockSupervisor";
  return (
    <div>
        <Sidebar>
            
             <div className='dashboard-content'>
                 <h1 className='msg'>Welcome to {role} Dashboard!</h1>
                 

             </div>
        </Sidebar>
           
       

    </div>

    
      
    
  );
}

export default Dashboard;

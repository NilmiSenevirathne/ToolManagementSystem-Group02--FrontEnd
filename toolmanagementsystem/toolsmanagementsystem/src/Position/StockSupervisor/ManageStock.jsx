import React from 'react';
import './ManageStock.css';
import Sidebar from '../../Components/Sidebar/Sidebar';

const ManageStock = () => {
  const [currentPage, setCurrentPage] = useState('ManageStock');//set the default page to Dashboard.jsx

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className='stockcontainer'>
       <Sidebar currentPage={currentPage} onPageChange={handlePageChange} />

       <div className='stock-content'>
            <h1>Manage Stock</h1>
       </div>       
    </div>
  );
};

export default ManageStock;

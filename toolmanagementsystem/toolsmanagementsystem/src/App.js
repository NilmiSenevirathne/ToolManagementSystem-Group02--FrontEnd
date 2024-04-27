import React from 'react';
import logo from './logo.svg';
import {Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import './App.css';
import LoginForm from '../src/LoginPage/LoginForm.jsx';
import Dashboard from '../src/Position/StockSupervisor/Dashboard/Dashboard.jsx';
import ManageStock  from './Position/StockSupervisor/ManageStock/ManageStock.jsx';
import CreateToolbox from './Position/StockSupervisor/CreateToolBox/CreateToolbox.jsx';
import TrackToolbox from './Position/StockSupervisor/TrackToolbox/TrackToolbox.jsx';
import Reports from './Position/StockSupervisor/Reports/Reports.jsx';
import AddTool from './Position/StockSupervisor/ManageStock/AddTool.jsx';
import EditTool from './Position/StockSupervisor/ManageStock/EditTool.jsx';
import AdminDashboard from './Position/Admin/Dashboard/AdminDashboard.jsx';
import UserManage from './Position/Admin/ManageUser/UserManage.jsx';
import UserEdit from './Position/Admin/ManageUser/UserEdit.jsx';

function App() {
  return (
      
       
       <>
          <div>
          
               <Routes>
                    {/* <Route path='/' element={<LoginForm/>}> </Route> */}
                    <Route path='/' element={<AdminDashboard/>} />
                    <Route path='/useredit' element={<UserEdit/>}/>
                    <Route path='/UserManage' element={<UserManage/>}/>
                    <Route  path = "/managestock"  element={<ManageStock/>}/>
                    <Route  path = "/addTool"  element={<AddTool/>}/>
                    <Route path='/editTool/${tool.toolId}' element={<EditTool/>}/>
                    <Route  path = "/createtoolbox"  element={<CreateToolbox/>}/>
                    <Route  path = "/tracktoolbox"  element={<TrackToolbox/>}/>
                    <Route  path = "/reports"  element={<Reports/>}/>
                    
               </Routes>
          </div>
       </>

      

  );
}

export default App;

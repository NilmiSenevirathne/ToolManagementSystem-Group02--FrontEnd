import React from 'react';
import { Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import './App.css';
import LoginForm from '../src/LoginPage/LoginForm.jsx';
import ManageStock  from './Position/StockSupervisor/ManageStock/ManageStock.jsx';
import CreateToolbox from './Position/StockSupervisor/CreateToolBox/CreateToolbox.jsx';
import TrackToolbox from './Position/StockSupervisor/TrackToolbox/TrackToolbox.jsx';
import Reports from './Position/StockSupervisor/Reports/Reports.jsx';
import AddTool from './Position/StockSupervisor/ManageStock/AddTool.jsx';
import EditTool from './Position/StockSupervisor/ManageStock/EditTool.jsx';
import StockSupervisorDashboard from './Position/StockSupervisor/Dashboard/StockSupervisorDashboard.jsx';
import Sidebar from './Components/Sidebar/Sidebar.jsx';


function App() {
  return (
      <>
        
           <Routes>
            
                    <Route path='/' element={<LoginForm/>}/> 
    
                    <Route path='/stocksupervisordashboard' element={<StockSupervisorDashboard/>} />
                    <Route  path = "/managestock"  element={<ManageStock/>}/>
                    <Route  path = "/addTool"  element={<AddTool/>}/>
                    <Route path='/editTool/:toolId' element={<EditTool/>}/>
                    <Route  path = "/createtoolbox"  element={<CreateToolbox/>}/>
                    <Route  path = "/tracktoolbox"  element={<TrackToolbox/>}/>
                    <Route  path = "/reports"  element={<Reports/>}/>
                   
          </Routes>
          
        
  
       </>
     );
}


export default App;

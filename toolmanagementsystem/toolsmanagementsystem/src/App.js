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

function App() {
  return (
      
       
       <>
          <div>
          
               <Routes>
                    <Route path='/' element={<LoginForm/>}> </Route>
                    <Route path='/dashboard' element={<Dashboard/>} />
                    <Route  path = "/managestock"  element={<ManageStock/>}/>
                    <Route  path = "/createtoolbox"  element={<CreateToolbox/>}/>
                    <Route  path = "/tracktoolbox"  element={<TrackToolbox/>}/>
                    <Route  path = "/reports"  element={<Reports/>}/>
               </Routes>
          </div>
       </>

      

  );
}

export default App;

// import React from 'react';
// import logo from './logo.svg';
// import {Route, BrowserRouter as Router, Routes} from 'react-router-dom';
// import './App.css';
// import LoginForm from '../src/LoginPage/LoginForm.jsx';
// import ManageStock  from './Position/StockSupervisor/ManageStock/ManageStock.jsx';
// import CreateToolbox from './Position/StockSupervisor/CreateToolBox/CreateToolbox.jsx';
// import TrackToolbox from './Position/StockSupervisor/TrackToolbox/TrackToolbox.jsx';
// import Reports from './Position/StockSupervisor/Reports/Reports.jsx';
// import AddTool from './Position/StockSupervisor/ManageStock/AddTool.jsx';
// import EditTool from './Position/StockSupervisor/ManageStock/EditTool.jsx';
// import StockSupervisorDashboard from './Position/StockSupervisor/Dashboard/StockSupervisorDashboard.jsx';

// function App() {
//   return (
      
       
//        <>
//           <div>
          
//                <Routes>
//                     <Route path='/' element={<LoginForm/>}> </Route>
//                     <Route path='/stocksupervisordashboard' element={<StockSupervisorDashboard/>} />
//                     <Route  path = "/managestock"  element={<ManageStock/>}/>
//                     <Route  path = "/addTool"  element={<AddTool/>}/>
//                     <Route path='/editTool/:toolId' element={<EditTool/>}/>
//                     <Route  path = "/createtoolbox"  element={<CreateToolbox/>}/>
//                     <Route  path = "/tracktoolbox"  element={<TrackToolbox/>}/>
//                     <Route  path = "/reports"  element={<Reports/>}/>
                    
//                </Routes>
//           </div>
//        </>

      

//   );
// }

// export default App;

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Sidebar from './Position/Manager/Components/Sidebar.jsx';
import Dashboard from '../src/Position/Manager/Pages/Dashboard.jsx';
import ManageProjects from './Position/Manager/Pages/ManageProjects/ManageProjects.jsx';
import ViewInventory from './Position/Manager/Pages/ViewInventory.jsx';
import TrackToolbox from './Position/Manager/Pages/TrackToolbox.jsx';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import AddProjects from './Position/Manager/Pages/ManageProjects/Projects/AddProjects.jsx';
import UpdateProjects from './Position/Manager/Pages/ManageProjects/Projects/UpdateProjects.jsx';
import AddLocation from './Position/Manager/Pages/ManageProjects/Projects/Location/AddLocation.jsx';
import LocationHome from './Position/Manager/Pages/ManageProjects/Projects/Location/LocationHome.jsx';

import Home from './Position/Manager/Pages/ManageProjects/Home.jsx';

function App() {
  return (

     <> 
     <div>
      <Sidebar>
        <Routes>
          
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/manageprojects" element={<ManageProjects />} />
          <Route path="/ViewInventory" element={<ViewInventory />} />
          <Route path="/tracktoolbox" element={<TrackToolbox />} />
          <Route path="/addprojects" element={<AddProjects />} />
          <Route path="/UpdateProjects/:project_id" element={<UpdateProjects />} />
          <Route path="/AddLocation" element={<AddLocation />} />
          <Route path="/locationHome" element={<LocationHome />} />
          <Route path="/home" element={<Home/>}/>

        </Routes>
      </Sidebar>
   
    </div>
    </>
    
  );
}

export default App;

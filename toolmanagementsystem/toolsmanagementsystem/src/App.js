
import "./app.css"
import LoginForm from "./LoginPage/LoginForm.jsx";
import { BrowserRouter , Route, Routes } from 'react-router-dom';
import RequiredToolReport from "./Position/Sitesupervisor/RequiredToolReport.jsx";
import Dboard from './Position/Sitesupervisor/dashboard/Dboard.jsx';
import CreateReports from './Position/Sitesupervisor/CreateReports.jsx';
import ToolStatosRep from "./Position/Sitesupervisor/ToolStatosRep.jsx";

import AddReportDetails from "./Position/Sitesupervisor/AddReportDetails.jsx";
function App() {
  
  return (
    <div className='App'>
  <BrowserRouter>
      <Routes>
      
      <Route path='/' element={<Dboard/>}> </Route>
      <Route path="/CreateReports" element={<CreateReports/>}/>
      <Route path="/ToolStatosRep" element={<ToolStatosRep/>}/>
      <Route path="/RequiredToolReport" element={<RequiredToolReport/>}/>
     
      <Route path="/AddReportDetails" element={<AddReportDetails/>}/>
      </Routes>
  </BrowserRouter>
    </div>

   
  );
}

export default App;

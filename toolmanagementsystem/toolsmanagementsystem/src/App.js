
import "./app.css"

import { BrowserRouter , Route, Routes } from 'react-router-dom';
import RequiredToolReport from "./Position/Sitesupervisor/RequiredToolReport.jsx";
import Dboard from './Position/Sitesupervisor/dashboard/Dboard.jsx';
import CreateReports from './Position/Sitesupervisor/CreateReports.jsx';
import ToolStatosRep from "./Position/Sitesupervisor/ToolStatosRep.jsx";
import GenerateReportReTools from "./Position/Sitesupervisor/GenerateReportReTools.jsx";
function App() {
  
  return (
    <div className='App'>
  <BrowserRouter>
      <Routes>
      <Route path='/' element={<Dboard/>}> </Route>
      <Route path="/CreateReports" element={<CreateReports/>}/>
      <Route path="/ToolStatosRep" element={<ToolStatosRep/>}/>
      <Route path="/RequiredToolReport" element={<RequiredToolReport/>}/>
      <Route path="/GenerateReportReTools" element={<GenerateReportReTools/>}/>
      </Routes>
  </BrowserRouter>
    </div>

   
  );
}

export default App;

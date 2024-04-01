
import "./app.css"

import { BrowserRouter , Route, Routes } from 'react-router-dom';

import Dboard from './Position/Sitesupervisor/dashboard/Dboard.jsx';
import CreateReports from './Position/Sitesupervisor/CreateReports.jsx';

import ToolStatosRep from "./Position/Sitesupervisor/ToolStatosRep.jsx";

function App() {
  
  return (
    <div className='App'>
  <BrowserRouter>
      <Routes>
      <Route path='/' element={<Dboard/>}> </Route>
      <Route path="/CreateReports" element={<CreateReports/>}/>
      <Route path="/ToolStatosRep" element={<ToolStatosRep/>}/>
      </Routes>
  </BrowserRouter>
    </div>

   
  );
}

export default App;

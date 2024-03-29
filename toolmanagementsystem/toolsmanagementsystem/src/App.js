
import './App.css';
import LoginForm from '../src/LoginPage/LoginForm.jsx';
import Dashboard from './Position/StockSupervisor/Dashboard.jsx';
import { BrowserRouter , Route, Routes } from 'react-router-dom';
import Header from './Components/Header.jsx';
import Sidebar from './Components/Sidebar.jsx';
import ManageStock from './Position/StockSupervisor/ManageStock.jsx';
import Dboard from './Position/Sitesupervisor/dashboard/Dboard.jsx';
import CreateReports from './Position/Sitesupervisor/CreateReports.jsx';


function App() {
  
  return (
  <BrowserRouter>
      <Routes>
      <Route path='/' element={<Dboard/>}> </Route>
      <Route path="/CreateReports" element={<CreateReports/>}/>
      </Routes>
  </BrowserRouter>
    

   
  );
}

export default App;

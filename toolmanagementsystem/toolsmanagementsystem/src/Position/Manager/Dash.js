import React from 'react'
import './Dash.css';
import {BrowserRouter,Route,Routes} from 'react-router-dom';
import Sidebar from './Sidebar';
import ManageProject from './ManageProjects/ManageProject'
import ViewInventory from './ViewInventory/ViewInventory'

export default function Dash() {
  return (
    <BrowserRouter>
    <Sidebar>
    <Routes>
    <Route path="/ManageProjects/ManageProject"element={<ManageProject/>}/>
    <Route path="/ViewInventory/ViewInventory"element={<ViewInventory/>}/>
    </Routes>
    </Sidebar>
     </BrowserRouter>
     

  )
}

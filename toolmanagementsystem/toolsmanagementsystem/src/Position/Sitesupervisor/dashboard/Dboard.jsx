import React, { useState, useEffect } from 'react';
import "./dboard.css";
import axios from 'axios';
import Sbar from "../../../Components/Sbar";
import { Link } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';

const Dboard = () => {
  const [toolInventoryData, setToolInventoryData] = useState([]);

  useEffect(() => {
      axios.get('http://localhost:8080/tool/toolInventory')
          .then(response => {
              setToolInventoryData(response.data);
          })
          .catch(error => {
              console.error('Error fetching tool inventory data:', error);
          });
  }, []);

  return (
    <div className='dashboard'>
      <Sbar />
      <div className='homeContainer'>
        <div className="buttonContainer">
          <Link className="button" to="/ViewToolStatusReports">
            <div className="buttonText">View All Tool Status Reports</div>
          </Link>
          <Link className="button" to="/ViewRequiredToolReports">
            <div className="buttonText">View All Required Tool Reports</div>
          </Link>
          <Link className="button" to="/ViewProjects">
            <div className="buttonText">View All Project Details</div>
          </Link>
        </div>
        <div className="chartContainer">
          <h2 className="chartTitle">Tool Inventory</h2>
          <BarChart
            width={800}
            height={400}
            data={toolInventoryData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="toolName" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="quantity" fill="rgb(38, 196, 244)" />
          </BarChart>
        </div>
      </div>
    </div>
  );
}

export default Dboard;

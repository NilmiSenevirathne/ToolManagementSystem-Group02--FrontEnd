import React, { useState, useEffect } from 'react';
import "./dboard.css";
import axios from 'axios';
import Sbar from "../../../Components/Sbar";
import { Link } from "react-router-dom";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';

const Dboard = () => {
  const [toolInventoryData, setToolInventoryData] = useState([]);
  const [toolLocations, setToolLocations] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/tool/toolInventory')
      .then(response => {
        setToolInventoryData(response.data);
      })
      .catch(error => {
        console.error('Error fetching tool inventory data:', error);
      });
  }, []);

  const fetchToolLocation = (toolId) => {
    axios.get(`http://localhost:8080/locationTrack/tool/${toolId}`)
      .then(response => {
        setToolLocations(response.data);
      })
      .catch(error => {
        console.error('Error fetching tool location data:', error);
      });
  };

  return (
    <div className='dboard-container'>
      <Sbar />
      <div className='dboard-homeContainer'>
        <div className="dboard-chartContainer">
          <h2 className="dboard-chartTitle">Tool Inventory</h2>
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

        <Link to="/TrackToolBoxes" style={{ textDecoration: "none" }}>
          <li><LocationOnIcon /><span>Track Toolboxes</span></li>
        </Link>

        <div className="tool-location-container">
          <h2 className="dboard-chartTitle">Tool Locations</h2>
          <table className="tool-location-table">
            <thead>
              <tr>
              <th>Tool Id</th>
                <th>Tool Name</th>
                <th>Location</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {toolInventoryData.map(tool => (
                <tr key={tool.tool_Id}>
                   <td>{tool.toolId}</td>
                  <td>{tool.toolName}</td>
                  <td>
                    {toolLocations
                      .filter(locationTrack => locationTrack.tool.toolId === tool.toolId)
                      .map(locationTrack => locationTrack.location.locationName)
                      .join(', ')}
                  </td>
                  <td>
                    <button onClick={() => fetchToolLocation(tool.toolId)}>
                      Show Location
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dboard;

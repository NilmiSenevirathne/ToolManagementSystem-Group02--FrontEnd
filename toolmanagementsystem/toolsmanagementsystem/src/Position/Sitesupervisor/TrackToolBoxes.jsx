import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './tracktoolboxes.css'
import Sbar from '../../Components/Sbar';


const TrackToolboxes = () => {
  const [locationTracks, setLocationTracks] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/toolbox/gettoolbox')
      .then(response => {
        setLocationTracks(response.data);
      })
      .catch(error => {
        console.error('Error fetching toolbox locations:', error);
      });
  }, []);

  return (
    <div className='track-toolboxes-container'>
      <Sbar />
      <div className='track-toolboxes-content'>
        <h2>Toolbox Locations</h2>
        <table className='toolbox-table'>
          <thead>
            <tr>
              <th>Toolbox ID</th>
              <th>Project Id</th>
              <th>Site Supervisor Id</th>
              <th>Location Id</th>
            </tr>
          </thead>
          <tbody>
            {locationTracks.map((track, index) => (
              <tr key={index}>
                <td>{track.toolbox_id}</td>
                <td>{track.project_id}</td>
                <td>{track.site_supervisor_id}</td>
                <td>{track.location_id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TrackToolboxes;

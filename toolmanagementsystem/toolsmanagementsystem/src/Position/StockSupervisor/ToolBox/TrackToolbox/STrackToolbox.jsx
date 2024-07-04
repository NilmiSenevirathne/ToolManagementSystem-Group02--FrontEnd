import React, { useState } from 'react';
import StockSidebar from '../../../../Components/Sidebar/StockSidebar.jsx';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import StockSuperviorNavbar from '../../../../Components/Navbar/StockSupervisorNavbar.jsx';

const STrackToolbox = () => {
  let navigate = useNavigate();

  const [toolbox, setToolbox] = useState({
    toolboxId: ''
  });

  const [toolboxDetails, setToolboxDetails] = useState(null);
  const [error, setError] = useState(null);

  const onInputChange = (e) => {
    setToolbox({ ...toolbox, [e.target.name]: e.target.value });
  };

  const fetchToolboxDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/toolbox/${toolbox.toolboxId}`);
      setToolboxDetails(response.data);
      setError(null);
    } catch (err) {
      setError('Error fetching toolbox details. Please try again.');
      setToolboxDetails(null);
    }
  };

  const onSearchClick = () => {
    if (toolbox.toolboxId) {
      fetchToolboxDetails();
    } else {
      setError('Please enter a toolbox ID.');
    }
  };

  return (
    <StockSidebar>
      <StockSuperviorNavbar />
      <div className='stock-content'>
        <h1>Welcome to TrackToolbox Section!</h1>

        <div>
          <label htmlFor="toolboxId" className="form-label">
            Enter the Toolbox ID
          </label>
          <input
            type="text"
            placeholder="Enter toolbox id"
            name="toolboxId"
            value={toolbox.toolboxId}
            onChange={onInputChange}
          />
          <button onClick={onSearchClick}>Search</button>
        </div>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        {toolboxDetails && (
          <div className='toolbox-details'>
            <h2>Toolbox Details</h2>
            <p>ID: {toolboxDetails.id}</p>
            <p>Name: {toolboxDetails.name}</p>
            <p>Description: {toolboxDetails.description}</p>
            {/* Add more fields as necessary */}
          </div>
        )}
      </div>
    </StockSidebar>
  );
};

export default STrackToolbox;

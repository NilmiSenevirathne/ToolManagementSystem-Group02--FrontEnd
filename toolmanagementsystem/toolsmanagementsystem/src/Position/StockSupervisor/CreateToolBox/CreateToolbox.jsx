import React, { useState } from 'react';
import Sidebar from '../../../Components/Sidebar/Sidebar';
import { useNavigate } from 'react-router-dom';

const CreateToolbox = () => {
  let navigate = useNavigate();

  const [toolbox, setToolbox] = useState({
    qrId: "",
    projectId: "",
    projectName: "",
    sitesupervisor: "",
    location: ""
  });

  const { qrId, projectId, projectName, sitesupervisor, location } = toolbox;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setToolbox({ ...toolbox, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your submit logic here
  };

  return (
    <div>
      <Sidebar>
        <div className='stock-content'>
          <form onSubmit={handleSubmit}>
            <h1>New ToolBox Form</h1>

            <div>
              <label>QR_id</label>
              <input type='file' className='form-control' placeholder='Enter QR ID' name='qrId' value={qrId} onChange={handleChange} />
            </div>

            <div>
              <label>Project_Id</label>
              <input type='dropdown' className='form-control' placeholder='' name='projectId' value={projectId} onChange={handleChange} />
            </div>

            <div>
              <label>Project_Name</label>
              <input type='checkbox' className='form-control' placeholder='' name='projectName' value={projectName} onChange={handleChange} />
            </div>

            <div>
              <label>Site Supervisor</label>
              <input type='checkbox' className='form-control' placeholder='' name='sitesupervisor' value={sitesupervisor} onChange={handleChange} />
            </div>

            <div>
              <label>Location</label>
              <input type='checkbox' className='form-control' placeholder='Enter Location' name='location' value={location} onChange={handleChange} />
            </div>

            <div>
              <button type='submit' className='form-control btn btn-primary'>Submit</button>
            </div>
          </form>
        </div>
      </Sidebar>
    </div>
  );
};

export default CreateToolbox;

import { Link, useNavigate } from 'react-router-dom'; // Import React Router components for navigation
import React, { useState } from 'react'; // Import React and useState hook
import axios from 'axios'; // Import axios for making HTTP requests
import Sidebar from '../../../../../../Components/ManagerSidebar.jsx'; // Import Sidebar component

// Main function component for adding a new location
export default function AddLocation() {
  let navigate = useNavigate(); // Initialize navigation

  // State to store form data for location
  const [locations, setLocation] = useState({
    locationId: "",
    locationName: ""
  });

  const [locationMap, setLocationMap] = useState(null); // State to store the location map image

  // Destructure state variables for easier access
  const { locationId, locationName } = locations;

  // Handle input changes
  const onInputChange = (e) => {
    if (e.target.name === "locationMap") {
      setLocationMap(e.target.files[0]); // Store the selected file
    } else {
      setLocation({ ...locations, [e.target.name]: e.target.value });
    }
  };

  // Handle form submission
  const onSubmit = async (e) => {
    e.preventDefault();
    // Location Form validation
    if (!locationId || !locationName || !locationMap) {
      alert("Please fill in all fields and select a map image.");
      return;
    }

    // Create a FormData object to send the form data along with the image
    const formData = new FormData();
    formData.append('locationId', locationId);
    formData.append('locationName', locationName);
    formData.append('locationMap', locationMap);

    // Send a POST request to add the new location
    await axios.post("http://localhost:8080/location", formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    navigate("/ViewLocations"); // Navigate to ViewLocations page upon success
  };

  // Function to reset the form fields
  const resetForm = () => {
    setLocation({
      locationId: "",
      locationName: ""
    });
    setLocationMap(null); // Reset the image
  };

  // Render the form inside the Sidebar component
  return (
    <Sidebar>
      <div className='container-fluid'>
        <div className="py-2" style={{ maxHeight: '70vh', maxWidth: '800px' }}>
          <div className='col-md-12 offset-md-3 border rounded p-4 mt-3 shadow'>
            <h2 className='text-center m-4'>Add a New Location</h2>
            <form onSubmit={(e) => onSubmit(e)}>
              <div className='mb-3'>
                <label htmlFor="locationId" className="form-label">Location Id</label>
                <input
                  type="text"
                  className='form-control'
                  placeholder='Enter Location Id'
                  name="locationId"
                  value={locationId}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
              <div className='mb-3'>
                <label htmlFor="locationName" className="form-label">Location Name</label>
                <input
                  type="text"
                  className='form-control'
                  placeholder='Enter Location Name'
                  name="locationName"
                  value={locationName}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
              <div className='mb-3'>
                <label htmlFor="locationMap" className="form-label">Location Map</label>
                <input
                  type="file"
                  className='form-control'
                  name="locationMap"
                  onChange={(e) => onInputChange(e)}
                />
              </div>
              
              <div className='d-flex justify-content-between'>
                <Link className='btn btn-outline-dark' to="/ViewLocations">Back</Link>
                <div>
                  <button type="button" className='btn btn-outline-secondary mx-2' onClick={resetForm}>Clear</button>
                  <button type="submit" className='btn btn-outline-primary'>Submit</button>
                </div>
              </div>
              <br />
            </form>
          </div>
        </div>
      </div>
    </Sidebar>
  );
}

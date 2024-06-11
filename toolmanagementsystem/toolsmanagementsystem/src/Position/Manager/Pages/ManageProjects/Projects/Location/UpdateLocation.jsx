import { Link,useNavigate ,useParams} from 'react-router-dom'// Import React Router components for navigation and parameter handling
import React, { useEffect,useState } from 'react'// Import React and hooks
import axios from 'axios'// Import axios for making HTTP requests
import Sidebar from '../../../../../../Components/ManagerSidebar.jsx';// Import Sidebar component


// Main function component for updating a location
export default function UpdateLocation() {

let navigate=useNavigate()

// Retrieve location ID from URL parameters
const LocId  = useParams()

// State to store form data for location
    const[locations,setlocation]=useState({
        locationId:"",
        locationName:""

      })

// Destructure state variables for easier access
    const {locationId,locationName}=locations

// Handle input changes
    const onInputChange=(e)=>{
        setlocation({...locations,[e.target.name]:e.target.value})
    }

// Function to load location data based on the ID from URL
    const loadLocations =async ()=>{
        const result=await axios.get(`http://localhost:8080/locations/${LocId.locationId}`)
        setlocation(result.data)
      }
      useEffect (()=>{
        loadLocations();
      },[])


    // Handle form submission
    const onSubmit=async(e)=>{
        e.preventDefault();
        //Location Form validation
        if ( !locationId|| !locationName) {
          alert("Please fill in all fields.");
          return;
        }
        // Send a PUT request to update the location
        await axios.put(`http://localhost:8080/locations/${LocId.locationId}`,locations)
        navigate("/locationHome")// Navigate to locationHome page upon success
    }

    // Render the form inside the Sidebar component
    return (
    <Sidebar>
    <div className='container-fluid'>
        <div className=' justify-content-center'>
        <div className='col-md-12 border rounded p-4 mt-2 shadow' style={{ maxHeight: '80vh', overflowY: 'auto', maxWidth: '1000px' }}>
                <h2 className='text-center m-4'>Edit Location</h2>
                <form onSubmit={(e) =>onSubmit(e)}>

                    <div className='mb-3'>
                      <lable htmlFor="Name" className="form-lable">Location Id</lable>
                      <input type={"text"} className='form-control' 
                      placeholder='Enter Project id' 
                      name="locationId"
                      value={locationId}
                      onChange={(e)=>onInputChange(e)}
                      />
                    </div>
                    <div className='mb-3'>
                      <lable htmlFor="Name" className="form-lable">Location name</lable>
                      <input type={"text"} className='form-control' 
                      placeholder='Enter Project Name' 
                      name="locationName"
                      value={locationName}
                      onChange={(e)=>onInputChange(e)}
                      />
                    </div>
                    <button type="submit" className='btn btn-outline-primary'>Submit</button>
                </form>
            </div>
            <br/>
            <div>
            <Link className='btn btn-outline-dark mx-2'to="/ViewLocations">Back</Link>
            </div>
            </div>
        </div>
     
    </Sidebar>
  
  )
}

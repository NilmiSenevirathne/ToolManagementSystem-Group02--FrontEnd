import { Link,useNavigate ,useParams} from 'react-router-dom'
import React, { useEffect,useState } from 'react'
import axios from 'axios'
import Sidebar from '../../../../../../Components/ManagerSidebar.jsx';


export default function UpdateLocation() {

let navigate=useNavigate()

//pass parameters in to variable
const LocId  = useParams()

    const[locations,setlocation]=useState({
        locationId:"",
        locationName:""

      })

    const {locationId,locationName}=locations

  
    const onInputChange=(e)=>{
        setlocation({...locations,[e.target.name]:e.target.value})
    }

    const loadLocations =async ()=>{
        const result=await axios.get(`http://localhost:8080/locations/${LocId.locationId}`)
        setlocation(result.data)
      }
      useEffect (()=>{
        loadLocations();
      },[])


    const onSubmit=async(e)=>{
        e.preventDefault();
        //Location Form validation
        if ( !locationId|| !locationName) {
          alert("Please fill in all fields.");
          return;
        }
        await axios.put(`http://localhost:8080/locations/${LocId.locationId}`,locations)
        navigate("/locationHome")
    }

    
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
            <div className='mt-3' style={{ marginLeft: '60px' }}>
            <Link className='btn btn-outline-danger mx-2'to="/addprojects">Cancel</Link>
            <Link className='btn btn-outline-primary text-decoration-none' to='/locationHome'>View Location Details</Link>
            </div>
            </div>
        </div>
     
    </Sidebar>
  
  )
}

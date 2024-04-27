import { Link,useNavigate } from 'react-router-dom'
import React, { useState } from 'react'
import axios from 'axios'



export default function AddLocation() {

    let navigate=useNavigate()

    const[locations,setlocation]=useState({
        locationId:"",
        locationName:""

      })

    const {locationId,locationName}=locations

    const onInputChange=(e)=>{
        setlocation({...locations,[e.target.name]:e.target.value})
    }

    const onSubmit=async(e)=>{
        e.preventDefault();
        await axios.post("http://localhost:8080/location",locations)
        navigate("/locationHome")
    }

  return (
    <div className='container'>
        <div className='row'>
            <div className='col-md offset-md-3 border rounded p-4 mt-2 shadow'>
                <h2 className='text-center m-4'>Add a New Location</h2>
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
                    <Link className='btn btn-outline-danger mx-2'to="/addprojects">Cancel</Link>
                    <button className='btn btn-primary mx-2'>View</button>


                </form>
            </div>

        </div>
     
    </div>
  )
}

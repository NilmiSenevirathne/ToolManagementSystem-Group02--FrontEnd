import axios from 'axios'// Import axios for making HTTP requests
import React, { useEffect, useState } from 'react'// Import React and hooks
import { Link,useNavigate, useParams } from 'react-router-dom'// Import React Router components
import ManagerSidebar from '../../../../../Components/ManagerSidebar.jsx';// Import Sidebar component
import {Grid , Container, Box} from '@mui/material';
import ManagerNavbar from '../../../../../Components/Navbar/ManagerNavbar.jsx';

export default function Updateprojects() {

  let navigate=useNavigate()// Initialize navigation

const Id =useParams() // Get the project ID from the URL parameters

// State for storing project details
        const[projects,setprojects]=useState({
          projectId:"", 
          projectName:"",
          descriptions:"",
          siteSupervisorID:"",
          siteSupervisorName:"",
          locationId:"",
          locationName:"",
          startDate:"",
          endDate:""

        })

        // Destructure project details from the state
        const{projectId,projectName,description,siteSupervisorID,siteSupervisorName,locationId,locationName,startDate,endDate}=projects
           
          
        // Handle input changes
        const onInputChange=(e)=>{
          setprojects({...projects,[e.target.name]:e.target.value})
        }

        // Function to load project details from the backend
        const loadProjects =async ()=>{
          const result=await axios.get(`http://localhost:8080/Projects/${Id.project_id}`)
          setprojects(result.data)
        }

        // Load project details when the component mounts
        useEffect (()=>{
          loadProjects();
        },[])

        // Handle form submission
        const onSubmit =async(e)=>{
            e.preventDefault();
            await axios.put(`http://localhost:8080/Projects/${Id.project_id}`,projects)
            navigate("/manageprojects")
        }
            
    
  return (
    <Grid container>
    <Grid item >
        <ManagerSidebar/>
    </Grid>

    <Grid item xs>
        <ManagerNavbar/>

        <Container maxWidth="md">
      <Box mt={4}>
      <Box 
              p={4} 
              border={1} 
              borderRadius={8} 
              borderColor="grey.300"
              boxShadow={3}
            >
        <h2 className='text-center m-4'>Edit Projects Details </h2>
                <form onSubmit={(e) =>onSubmit(e)}>
                    <div className='mb-3'>
                      <lable htmlFor="Name" className="form-lable">Project Id</lable>
                      <input type={"text"} className='form-control' 
                      placeholder='Enter Project id' 
                      name="projectId"
                      value={projectId}
                      onChange={(e)=>onInputChange(e)}
                      />
                    </div>
                    <div className='mb-3'>
                      <lable htmlFor="Name" className="form-lable">Project name</lable>
                      <input type={"text"} className='form-control' 
                      placeholder='Enter Project Name' 
                      name="projectName"
                      value={projectName}
                      onChange={(e)=>onInputChange(e)}
                      />
                    </div>

                    <div className='mb-3'>
                      <lable htmlFor="Name" className="form-lable">Description</lable>
                      <input type={"text"} className='form-control' 
                      placeholder='Enter Description' 
                      name="description"
                      value={description}
                      onChange={(e)=>onInputChange(e)}
                      />
                    </div>

                    <div className='mb-3'>
                      <lable htmlFor="Name" className="form-lable">Site Supervisor ID</lable>
                      <input type={"text"} className='form-control' 
                      placeholder='Enter Site Supervisor ID' 
                      name="siteSupervisorID"
                      value={siteSupervisorID}
                      onChange={(e)=>onInputChange(e)}
                      />
                    </div>

                    <div className='mb-3'>
                      <lable htmlFor="Name" className="form-lable">Site Supervisor name</lable>
                      <input type={"text"} className='form-control' 
                      placeholder='Enter Supervisor name' 
                      name="siteSupervisorName"
                      value={siteSupervisorName}
                      onChange={(e)=>onInputChange(e)}
                      />
                    </div>

                    <div className='mb-3'>
                      <lable htmlFor="Name" className="form-lable">Location ID</lable>
                      <input type={"text"} className='form-control' 
                      placeholder='Enter Location ID'
                      name="locationId"
                      value={locationId}
                      onChange={(e)=>onInputChange(e)}
                      />
                    </div>
                    <div className='mb-3'>
                      <lable htmlFor="locationName" className="form-lable">Location Name</lable>
                      <input type={"text"} className='form-control' 
                      placeholder='Enter Location Name'
                      name="locationName"
                      value={locationName}
                      onChange={(e)=>onInputChange(e)}
                      />
                    </div>

                  <div className='mb-3'>
                  <label htmlFor="startDate" className="form-label">Start Date </label>
                  <input type={"date"} className='form-control' 
                    placeholder='Enter project start date' 
                    name="startDate"
                    value={startDate}
                    onChange={(e)=>onInputChange(e)}
                  />
                  </div>
                  <div className='mb-3'>
                  <label htmlFor="endDate" className="form-label">End Date </label>
                  <input type={"date"} className='form-control' 
                    placeholder='Enter project end date' 
                    name="endDate"
                    value={endDate}
                    onChange={(e)=>onInputChange(e)}
                  />
                  </div>
                    <button type="submit" className='btn btn-outline-primary'>Submit</button>

                </form>
                </Box>
            </Box>
    </Container>
    </Grid>
</Grid>      
  )
}

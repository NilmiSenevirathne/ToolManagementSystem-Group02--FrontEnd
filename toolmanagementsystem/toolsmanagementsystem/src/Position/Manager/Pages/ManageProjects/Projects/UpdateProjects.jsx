import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link,useNavigate, useParams } from 'react-router-dom'

export default function Updateprojects() {

  let navigate=useNavigate()

const Id =useParams()

        const[projects,setprojects]=useState({
          projectId:"", 
          projectName:"",
          descriptions:"",
          siteSupervisorID:"",
          siteSupervisorName:"",
          locationId:""
        })

        const{projectId,projectName,description,siteSupervisorID,siteSupervisorName,locationId}=projects

        const onInputChange=(e)=>{
          setprojects({...projects,[e.target.name]:e.target.value})
        }

        useEffect (()=>{
          loadProjects();
        },[])

        const loadProjects =async ()=>{
          const result=await axios.get(`http://localhost:8080/Projects/${Id.project_id}`)
          setprojects(result.data)
        }

        const onSubmit =async(e)=>{
            e.preventDefault();
            await axios.put(`http://localhost:8080/Projects/${Id.project_id}`,projects)
            navigate("/manageprojects")
        }
            
     

  return (
    <div className='container'>
        <div className='row'>
              <div className='col-md offset-md-3 border rounded p-4 mt-2 shadow'>
                <h2 className='text-center m-4'>Edit a Project for assign to site supervisor</h2>

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

                    <button type="submit" className='btn btn-outline-primary'>Submit</button>
                    <Link className='btn btn-outline-danger mx-2'to="/manageprojects">Cancel</Link>

                </form>
                </div>
        </div>
    </div>
  )
}
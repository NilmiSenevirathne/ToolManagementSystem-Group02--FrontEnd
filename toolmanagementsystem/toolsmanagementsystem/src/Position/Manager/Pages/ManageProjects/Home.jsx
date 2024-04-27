import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

export default function Home() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    loadProjects();
  }, []);

  const { projectId } = useParams();

  const loadProjects = async () => {
    const result = await axios.get("http://localhost:8080/Projects");
    setProjects(result.data);
  };

  const deleteProject = async (projectId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this project?");
    if (confirmDelete) {
      await axios.delete(`http://localhost:8080/Projects/${projectId}`);
      loadProjects();
    }
  };

  return (
    <div className='container'>
      <div className='py-4'>
        <table className="table border shadow ">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Project id</th>
              <th scope="col">Description</th>
              <th scope="col">projectName</th>
              <th scope="col">supervisor</th>
              <th scope="col">SiteSupervisor</th>
              <th scope="col">locationId</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{project.projectId}</td>
                <td>{project.description}</td>
                <td>{project.projectName}</td>
                <td>{project.siteSupervisorID}</td>
                <td>{project.siteSupervisorName}</td>
                <td>{project.locationId}</td>
                <td>
                  <Link className='btn btn-outline-primary mx-2' to={`/UpdateProjects/${project.projectId}`}>Edit</Link>
                  <button className='btn btn-danger mx-2' onClick={() => deleteProject(project.projectId)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

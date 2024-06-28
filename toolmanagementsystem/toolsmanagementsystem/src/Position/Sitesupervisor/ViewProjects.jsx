import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchIcon from '@mui/icons-material/Search';
import "./viewprojects.css";

const ViewProjects = () => {
  const [projects, setProjects] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const response = await axios.get('http://localhost:8080/Projects');
      setProjects(response.data);
    } catch (error) {
      console.error("Error loading projects:", error);
    }
  };

  const filteredProjects = projects.filter(project =>
    project.projectId.toString().toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.projectName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="rep">
      <div className='Createp'>
        <div className="topbarcontainer">
          <div className="topbartext">
            View Projects Details
          </div>
        </div>
        <div className="searchbar">
          <SearchIcon className="searchIcon" />
          <input
            placeholder="Search projects using project ID or project name"
            className="searchInput"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="table">
          <table className="table caption-top">
          
            <thead>
              <tr>
                <th scope="col">Project ID</th>
                <th scope="col">Project Name</th>
                <th scope="col">Description</th>
                <th scope="col">Site Supervisor Id</th>
                <th scope="col">Site Supervisor Name</th>
                <th scope="col">Location Id</th>
              </tr>
            </thead>
           
            <tbody style={{ maxHeight: "230px", overflowY: "auto" }}>
              {filteredProjects.map((project) => (
                <tr key={project.projectId}>
                  <td>{project.projectId}</td>
                  <td>{project.projectName}</td>
                  <td>{project.description}</td>
                  <td>{project.siteSupervisorID}</td>
                  <td>{project.siteSupervisorName}</td>
                  <td>{project.locationId}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ViewProjects;

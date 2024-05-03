import "./viewprojects.css"
import axios from "axios";
import { useState, useEffect } from "react";
import SearchIcon from '@mui/icons-material/Search';
const ViewProjects = () => {
  const [project, setProjects] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');


  useEffect(() => {
    loadTools();
  }, []);

  const loadTools = async () => {
    try {
      const response = await axios.get('http://localhost:8080/Projects');
      setProjects(response.data);
    } catch (error) {
      console.error("Error loading tools:", error);
    }
  }
  const filteredProjects = project.filter(project =>
    project.projectId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    project.ProjectName.toLowerCase().includes(searchQuery.toLowerCase())
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
          placeholder="Search tools using tool id or tool name"
          className="searchInput"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
        <div className="table">
        <table className="table caption-top">
          {/* Table header */}
          <thead>
            <tr>
              <th scope="col">Project ID</th>
              <th scope="col">Project Name</th>
              <th scope="col">Description</th>
              <th scope="col">Site Supervisor Id</th>
              <th scope="col">Site Supervispr Name</th>
              <th scope="col">Location Id</th>
             
            </tr>
          </thead>
          {/* Table body */}
          <tbody style={{ maxHeight: "230px", overflowY: "auto" }}>
            {filteredProjects.map((project) => (
              <tr key={project.project_Id}>
                <td>{project.ProjectName}</td>
                <td>{project.Description}</td>
                <td>{project.SiteSupervisorID}</td>
                <td>{project.SiteSupervisorName}</td>
                <td>{project.locationId}</td>
                
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>
      
    </div>
    
  )
}

export default ViewProjects

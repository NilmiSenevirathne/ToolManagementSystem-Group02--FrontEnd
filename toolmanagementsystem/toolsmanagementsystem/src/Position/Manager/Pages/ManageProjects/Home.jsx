import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import Sidebar from '../../../../Components/ManagerSidebar.jsx';
import { Check } from '@mui/icons-material'; // Import the Check icon from Material-UI
import ReactPaginate from 'react-paginate'; // Import React Paginate
import  './Home.css';

export default function Home() {
  // State variables
  const [projects, setProjects] = useState([]); // To store the list of projects
  const [clickedProjects, setClickedProjects] = useState({});// To store the state of clicked projects
  const [pageNumber, setPageNumber] = useState(0); // State to track current page number

  // Constants for pagination
  const projectsPerPage = 4; // Number of projects to show per page
  const pagesVisited = pageNumber * projectsPerPage;

  // useEffect hook to load projects when the component mounts
  useEffect(() => {
    loadProjects();
  }, []);

  // Extract projectId from URL parameters (if needed)
  const { projectId } = useParams();

  // Function to fetch projects from the backend
  const loadProjects = async () => {
    const result = await axios.get("http://localhost:8080/Projects");
    setProjects(result.data);
  };

  // Function to delete a project
  const deleteProject = async (projectId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this project?");
    if (confirmDelete) {
      await axios.delete(`http://localhost:8080/Projects/${projectId}`);
      loadProjects();
    }
  };

  // Function to handle the click event for a project
  const handleClick = (projectId) => {
    setClickedProjects(prevState => ({ ...prevState, [projectId]: true }));
  };

  // Function to display the projects for the current page
  const displayProjects = projects
    .slice(pagesVisited, pagesVisited + projectsPerPage)// Get the projects for the current page
    .map((project, index) => (
      <tr key={index}>
        <th scope="row">{pagesVisited + index + 1}</th>
        <td>{project.projectId}</td>
        <td>{project.projectName}</td>
        <td>{project.description}</td>
        <td>{project.siteSupervisorID}</td>
        <td>{project.siteSupervisorName}</td>
        <td>{project.locationId}</td>
        <td>{project.date}</td>
        <td>
          <Link className='btn btn-success mx-2' to={`/UpdateProjects/${project.projectId}`}>Edit</Link>
        </td>
        <td>
          <button className='btn btn-danger mx-2' onClick={() => deleteProject(project.projectId)}>Delete</button>
        </td>
        <td>
          <div>
            {clickedProjects[project.projectId] ? (
              <>
                <Check style={{ color: 'green' }} /> {/* Show the tick icon */}
                <span className="text-success">Completed</span> {/* Show the finished status */}
              </>
            ) : (
              <button
                className='btn'
                onClick={() => handleClick(project.projectId)}
              >
                Click Me
              </button>
            )}
          </div>
        </td>
      </tr>
    ));
    // Calculate the total number of pages
  const pageCount = Math.ceil(projects.length / projectsPerPage);

  // Function to handle page change
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <Sidebar>
      <div className='container-fluid'>
        <h3 style={{ textAlign: 'center' }}>Manage Projects</h3>
        <Link className="btn" style={{ backgroundColor: 'navy', color: 'white' }} to="/addprojects">Add Projects</Link>
        <div className="py-4" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
          <table className="table border shadow">
            <thead style={{ position: 'sticky', top: 0, zIndex: 1, background: '#fff' }}>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Project id</th>
                <th scope="col">projectName</th>
                <th scope="col">Description</th>
                <th scope="col">SiteSupervisor Id</th>
                <th scope="col">SiteSupervisor Name</th>
                <th scope="col">locationId</th>
                <th scope="col">Date</th>
                <th scope="col">Action</th>
                <th scope="col">Action</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {displayProjects}
            </tbody>
          </table>
          
        </div>
        <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            pageCount={pageCount}
            onPageChange={changePage}
            containerClassName={"pagination"}
            previousLinkClassName={"previousBttn"}
            nextLinkClassName={"nextBttn"}
            disabledClassName={"paginationDisabled"}
            activeClassName={"paginationActive"}
          />
      </div>
    </Sidebar>
  );
}

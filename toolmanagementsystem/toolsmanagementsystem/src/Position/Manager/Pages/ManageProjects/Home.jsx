import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import Sidebar from '../../../../Components/ManagerSidebar.jsx';
import { saveAs } from 'file-saver';
import { PDFDocument, Text, Page, Document, StyleSheet } from '@react-pdf/renderer';



const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#E4E4E4',
    padding: 10
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  },
  header: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 10
  },
  content: {
    fontSize: 14,
    marginBottom: 5
  }
});

// const generatePdfBlob = async (pdfDoc, project) => {
//   const asPdf = PDFDocument.create(pdfDoc);
//   return await asPdf.toBlob();
// };

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

  // const generateReport = async (project) => {
  //   const pdfDoc = (
  //     <Document>
  //       <Page size="A4" style={styles.page}>
  //         <Text style={styles.header}>Project Report</Text>
  //         <Text style={styles.content}>Project ID: {project.projectId}</Text>
  //         <Text style={styles.content}>Project Name: {project.projectName}</Text>
  //         <Text style={styles.content}>Description: {project.description}</Text>
  //         {/* Add more project details as needed */}
  //       </Page>
  //     </Document>
  //   );

  //   const pdfBlob = await generatePdfBlob(pdfDoc, project);
  //   saveAs(pdfBlob, `${project.projectName}_Report.pdf`);
  // };

  return (
    <Sidebar>
      <div className='container-fluid'>
        <h3>Manage Projects</h3>
        <Link className="btn" style={{ backgroundColor: 'navy', color: 'white' }} to="/addprojects">Add Projects</Link>
        <div className="py-4" style={{ maxHeight: '70vh', overflowY: 'auto', maxWidth: '1100px' }}>
          <table className="table border shadow">
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
                  <td>{project.date}</td>
                  <td>
                    <Link className='btn btn-outline-primary mx-2' to={`/UpdateProjects/${project.projectId}`}>Edit</Link>
                  </td>
                  <td>
                  <button className='btn btn-danger mx-2' onClick={() => deleteProject(project.projectId)}>Delete</button>
                    {/* <button className='btn btn-danger mx-2' onClick={() => generateReport(project)}>Generate Report</button> */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Sidebar>
  );
}

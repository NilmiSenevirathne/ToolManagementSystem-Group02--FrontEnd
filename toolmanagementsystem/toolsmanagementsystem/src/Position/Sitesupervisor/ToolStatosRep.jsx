
import "./toolStatRep.css";
import axios from "axios";
import { Link } from "react-router-dom"
import { useEffect, useState } from "react";
import SearchIcon from '@mui/icons-material/Search';
const ToolStatosRep = () => {

  const [tools, setTools] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');


  useEffect(() => {
    loadTools();
  }, []);

  const loadTools = async () => {
    const result = await axios.get('http://localhost:8080/gettools')
    setTools(result.data);
  }
  const filteredTools = tools.filter(tool =>
    tool.toolId.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tool.toolName.toLowerCase().includes(searchQuery.toLowerCase())
  );


  return (
   

    <div className='Createp'>
      <div className="topbarcontainer">
<div className="topbartext">
       Tool Status Report
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
          <thead>
            <tr>
              <th scope="col">Tool Id</th>
              <th scope="col">Tool Name</th>
              <th scope="col">Description</th>
              <th scope="col">Quantity</th>
              <th scope="col">Allocate Tool</th>
              <th scope="col">Available Tool</th>
              
            </tr>
          </thead>
          <tbody style={{ maxHeight: "230px", overflowY: "auto" }}>
            {filteredTools.map((tool) => (
              <tr key={tool.toolId}>
                <td>{tool.toolId}</td>
                <td>{tool.toolName}</td>
                <td>{tool.description}</td>
                <td>{tool.quantity}</td>
                <td>{tool.allocatedTool}</td>
                <td>{tool.availableTool}</td>
                </tr>
                 ))}
                </tbody>
                </table>
      </div>
      </div>
      
    
  )
}

export default ToolStatosRep

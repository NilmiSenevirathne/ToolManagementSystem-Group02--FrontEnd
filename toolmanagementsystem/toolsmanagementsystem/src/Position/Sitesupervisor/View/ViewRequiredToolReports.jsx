import './viewRequiredToolReports.css';
import { useState, useEffect } from "react";
import axios from "axios";
import SearchIcon from '@mui/icons-material/Search';

const ViewRequiredToolReports = () => {
    const [reports, setReports] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [editingReport, setEditingReport] = useState(null);
    const [updatedProjectName, setUpdatedProjectName] = useState('');

    useEffect(() => {
        loadReports();
    }, []);

    const loadReports = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/reports/getReqTool');
            setReports(response.data);
        } catch (error) {
            console.error("Error loading reports:", error);
        }
    }

    const deleteReport = async (reportId) => {
        try {
            const confirmDelete = window.confirm("Do you surely want to delete this report?");
            if (confirmDelete) {
                await axios.delete(`http://localhost:8080/api/reports/${reportId}`);
                loadReports(); // Refresh the reports list
            }
        } catch (error) {
            console.error("Error deleting report:", error);
        }
    }

    const filteredReports = reports.filter(report =>
        report.project_name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const base64ToImageSrc = (base64) => {
        const byteCharacters = atob(base64);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: 'application/pdf' });
        return URL.createObjectURL(blob);
    };

    const handleViewPdfClick = (reportData, e) => {
        const confirmView = window.confirm("Do you want to view this PDF?");
        if (confirmView) {
            const src = base64ToImageSrc(reportData);
            if (src) {
                window.open(src, '_blank', 'noopener,noreferrer');
            }
        } else {
            e.preventDefault();
        }
    };

    return (
        <div className="rep">
            <div className='Createp'>
                <div className="topbarcontainer">
                    <div className="topbartext">
                        View Required Tool Reports
                    </div>
                </div>
                <div className="searchbar">
                    <SearchIcon className="searchIcon" />
                    <input
                        placeholder="Search tools using project name"
                        className="searchInput"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="table">
                    <table className="table caption-top">
                        <thead>
                            <tr>
                                <th scope="col">Report Id</th>
                                <th scope="col">Created At</th>
                                <th scope="col">Project Name</th>
                                <th scope="col">Report Data</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody style={{ maxHeight: "230px", overflowY: "auto" }}>
                            {filteredReports.map((report) => (
                                <tr key={report.report_id}>
                                    <td>{report.report_id}</td>
                                    <td>{report.created_at}</td>
                                    <td>
                                        {editingReport && editingReport.report_id === report.report_id ? (
                                            <input
                                                type="text"
                                                value={updatedProjectName}
                                                onChange={(e) => setUpdatedProjectName(e.target.value)}
                                            />
                                        ) : (
                                            report.project_name
                                        )}
                                    </td>
                                    <td>
                                        <button onClick={(e) => handleViewPdfClick(report.report_data, e)}>View PDF</button>
                                    </td>
                                    <td>
                                        <button onClick={() => deleteReport(report.report_id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default ViewRequiredToolReports;

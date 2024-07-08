import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ViewToolStatusReports.css'

const ViewToolStatusReports = () => {
    const [reports, setReports] = useState([]);

    useEffect(() => {
        loadReports();
    }, []);

    const loadReports = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/toolboxstatus/getToolstatus');
            setReports(response.data);
        } catch (error) {
            console.error("Error loading tool status reports:", error);
        }
    }

    const deleteReport = async (reportId) => {
        try {
            const confirmDelete = window.confirm("Do you surely want to delete this tool status report?");
            if (confirmDelete) {
                await axios.delete(`http://localhost:8080/api/toolboxstatus/${reportId}`);
                loadReports(); // Refresh the reports list
            }
        } catch (error) {
            console.error("Error deleting tool status report:", error);
        }
    }

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
        <div>
            <h2>View Tool Status Reports</h2>
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
                        {reports.map((report) => (
                            <tr key={report.reportId}>
                                <td>{report.reportId}</td>
                                <td>{report.created_at}</td>
                                <td>{report.projectName}</td>
                                <td>
                                    <button onClick={(e) => handleViewPdfClick(report.statusPdf, e)}>View PDF</button>
                                </td>
                                <td>
                                    <button onClick={() => deleteReport(report.reportId)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ViewToolStatusReports;

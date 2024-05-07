
// Admin Dashboard.jsx
import React, { useState, useEffect } from 'react';
import './admindashboard.css';
import { Chart } from 'primereact/chart';
import axios from 'axios';
import AdminSidebar from '../../../Components/Sidebar/AdminSidebar';


const AdminDashboard = () => {
  const [role] = useState("Admin");
  const [userStats, setUserStats] = useState({}); // Store user statistics
  const [lineChartData, setLineChartData] = useState({}); // Data for the line chart
  const [pieChartData, setPieChartData] = useState({}); // Data for the pie chart
  const [chartOptions, setChartOptions] = useState({}); // Chart options for both charts
  const [lineChartOptions, setLineChartOptions] = useState({}); // Line chart specific options

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch some data from the backend
        const response = await axios.get("http://localhost:8080/tool/gettools");
        
        // Assume the response provides required data for charts
        const data = {
          allocatedUser: 44,
          availableUser: 100,
        };
        setUserStats(data); // Set user statistics
        
        // Line chart data setup
        setLineChartData({
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
          datasets: [
            {
              label: 'Tool usage over time',
              data: [65, 59, 80, 81, 56, 55, 40], // Example data
              fill: false,
              borderColor: 'rgba(75, 192, 192, 1)', // Border color
              backgroundColor: 'rgba(75, 192, 192, 0.2)', // Background color
            },
          ],
        });

        // Pie chart data setup
        setPieChartData({
          labels: ['Allocated Users', 'Available Users'],
          datasets: [
            {
              data: [data.allocatedUser, data.availableUser], // Based on fetched data
              backgroundColor: ['#FF6384', '#36A2EB'], // Different colors for pie slices
              hoverBackgroundColor: ['#FF6384', '#36A2EB'], // Colors on hover
            },
          ],
        });

        // Chart options (common for both charts)
        const commonOptions = {
          responsive: true,
          maintainAspectRatio: false,
        };

        setChartOptions(commonOptions); // Apply common options
        setLineChartOptions({ ...commonOptions, tension: 0.4 }); // Specific option for line chart
      } catch (error) {
        console.error('Error fetching data:', error); // Log errors
      }
    };

    fetchData(); // Call the fetch function
  }, []); // Run only once when the component mounts

  return (
    <AdminSidebar> {/* Include the sidebar */}
      <div className='dashboard-content'> {/* Main content area */}
        <h1 className='msg'>Welcome to the {role} Dashboard!</h1> {/* Welcome message */}
        
        {/* Pie Chart */}
        <div className='chart-container'>
          <Chart type="doughnut" data={pieChartData} options={chartOptions} />
        </div>

        {/* Line Chart */}
        <div className='chart-container'>
          <Chart type="line" data={lineChartData} options={lineChartOptions} />
        </div>
      </div>
    </AdminSidebar>
  );
};

export default AdminDashboard;

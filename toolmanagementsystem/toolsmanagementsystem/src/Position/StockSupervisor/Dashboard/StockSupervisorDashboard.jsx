// StockSupervisor Dashboard.jsx
import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import Sidebar from '../../../Components/Sidebar/Sidebar';
import { Chart } from 'primereact/chart';
import axios from 'axios';

const StockSupervisorDashboard = () => {
  const role = "StockSupervisor";
  const [tools, setTools] = useState({});
  const [lineChartData, setLineChartData] = useState({});
  const [pieChartData, setPieChartData]= useState({});
  const [chartOptions, setChartOptions] = useState({});
  const [lineChartOptions, setLineChartOptions] = useState({});

  useEffect(() => {
    const loadTools = async () => {
      // Fetch data from API
      try {
        const response  = await axios.get("http://localhost:8080/tool/gettools");
        //Assuming the response structure is similar to this:
        const result = {
          allocatedTool: 44,
          availableTool: 100,
        };
        setTools(result);
  
        // Set line chart data
        const lineData = {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
          datasets: [
            {
              label: 'Variation in amount of tools during the year',
              data: [65, 59, 80, 81, 56, 55, 40],
              fill: false,
              borderColor: 'rgba(255, 99, 132, 0.5)',
              backgroundColor: 'rgba(255, 99, 132, 0.3)',
            },
          ],
        };
        setLineChartData(lineData);

        //pie chart data
        const pieData = {
          labels:['Allocated Tools' , 'Available Tools'],
          datasets:[
           {
          
            data:[result.allocatedTool, result.availableTool],
            backgroundColor:['#FF6384', '#36A2EB'],
            hoverBackgroundColor: ['#FF6384', '#36A2EB'],
           },
          ],
        };
        setPieChartData(pieData);
  
        // Set chart options
        const options = {
          responsive: true,
          maintainAspectRatio: false,
        };
        setChartOptions(options);
        setLineChartOptions(options);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    // Call loadTools function when component mounts
    loadTools();
  }, []); // Empty dependency array ensures this effect runs only once on mount

  

  return (
    <div>
      <Sidebar>
        <div className='dashboard-content'>
          <h1 className='msg'>Welcome to {role} Dashboard!</h1>
          <div className='chart'>
             <Chart type="doughnut" data={pieChartData} options={chartOptions} />
          </div>

          <div className='chart'>
              <Chart type="line" data={lineChartData} options={lineChartOptions} />
            </div>
        </div>
      </Sidebar>
    </div>
  );
}

export default StockSupervisorDashboard;

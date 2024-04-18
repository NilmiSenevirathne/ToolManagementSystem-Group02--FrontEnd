// Dashboard.jsx
import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import Sidebar from '../../../Components/Sidebar/Sidebar';
import { Chart } from 'primereact/chart';

const Dashboard = () => {
  const role = "StockSupervisor";
  const [chartData, setChartData] = useState({});
  const [lineChartData, setLineChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});
  const [lineChartOptions, setLineChartOptions] = useState({});

  useEffect(() => {
    // data for Doughnut chart
    const doughnutData = {
      labels: ['AllocatedTools', 'AvailableTools'],
      datasets: [
        {
          data: [300, 50],
          backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 205, 86, 0.6)'],
        },
      ],
    };
    setChartData(doughnutData);

    // data for Line chart
    const lineData = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'Variation in amout of tools dusring the year ',
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: false,
          borderColor: 'rgba(255, 99, 132, 0.5)',
          backgroundColor: 'rgba(255, 99, 132, 0.3)',
        },
      ],
    };
    setLineChartData(lineData);

    // Chart options
    const options = {
      responsive: true,
      maintainAspectRatio: false,
    };
    setChartOptions(options);
    setLineChartOptions(options);
  }, []);

  return (
    <div>
      <Sidebar>
        <div className='dashboard-content'>
          <h1 className='msg'>Welcome to {role} Dashboard!</h1>
          <div className='chart'>
             <Chart type="doughnut" data={chartData} options={chartOptions} />
          </div>

          <div className='chart'>
              <Chart type="line" data={lineChartData} options={lineChartOptions} />
            </div>
        </div>
      </Sidebar>
    </div>
  );
}

export default Dashboard;

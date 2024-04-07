import React from 'react';
import { PieChart, Pie,Tooltip,Cell, LineChart,
  Brush,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,} from 'recharts';


const Dashboard = () => {
  const data01 =[
    {name:"Allocated Stock", value:20000},
    {name: "Available Stock",value:15000},
   
  ];
  const COLORS = ['#0088FE', '##00C49F'];

  const data02 = [
    {
      name: 'jananury',
      
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'Feb',
     
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'March',
      
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'April',
      
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'May',
     
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'June',
      
      pv: 3800,
      amt: 2500,
    },
    {
      name: 'July',
      
      pv: 4300,
      amt: 2100,
    },
  ];



    
    
  return (
     <div>
        <PieChart width={400} height={400}>
          <Pie
           dataKey="value"
           isAnimationActive={false}
           data={data01}
           cx="50%"
           cy="50%"
           outerRadius={80}
           fill="#8884d8"
           label
          >
             {data01.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          
          ))}
          </Pie>
        </PieChart>

        <LineChart
            width={500}
            height={200}
            data={data02}
            syncId="anyId"
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="pv" stroke="#82ca9d" fill="#82ca9d" />
            <Brush />
          </LineChart>
     </div>
    
  );
  

};

export default Dashboard;
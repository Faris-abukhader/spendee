import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
LinearScale,PointElement,
LineElement,
Title,
Tooltip,
Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
CategoryScale,
LinearScale,
PointElement,
LineElement,
Title,
Tooltip,
Legend
);

  export default function PolarChart() {
    //   var [data,setData] = useState({labels:['Red','Green','Custom'],datasets:[{data:[5,4,3],backgroundColor:['#7944d0','green','gray']}]})
     const options = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: '',
        },
      },
    };
    
  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

   const data = {
    labels,
    datasets: [
      {
        label: 'Transaction',
        data: [23,65,89,76,3,5,7,9,9,8],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      }
    ],
  };
    return (

        <div className='text-center row align-items-center justify-content-center m-1'  style={{height:'350px',background:'white',boxShadow:'2px 4px 8px 2px rgba(34,41,47,.12)!important',borderRadius:'8px'}}>
        <h1 className='col-12'>LineChart</h1>
        <div className='col-12' style={{width:'100%'}}>
        <Line style={{width:'100%'}} options={options} data={data}  />
        </div>
    </div>
    )
  }
  
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
import {useSelector} from 'react-redux'

  export default function PolarChart() {
    console.log('2022-05-15T00:00:00.000Z'.substring(8,10))
    //   var [data,setData] = useState({labels:['Red','Green','Custom'],datasets:[{data:[5,4,3],backgroundColor:['#7944d0','green','gray']}]})
    const monthArray = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const transactionMonths = [];
    const transactions = useSelector(state=>state.transaction.map((item)=>{
      // console.log((Number.parseInt(item.date.toString().substring(8,10))-1))
      // console.log(monthArray[(Number.parseInt(item.date.toString().substring(8,10))-1)])
      // transactionMonths.push(monthArray[item.date.toString().substring(8,10)-1])
      if(item.type=='income'){
        return item.amount
      }else{
        return -item.amount
      }
    }))

    // console.log(transactions)
    
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
    console.log(transactionMonths)
//     const array = [];
// mySet.forEach(v => array.push(v));
   const data = {
    monthArray,
    datasets: [
      {
        label: 'Transaction',
        data: transactions,
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
  
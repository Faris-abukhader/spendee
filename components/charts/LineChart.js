import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale, PointElement,
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
import { useSelector } from 'react-redux'
import { setTransaction, addNewTransaction, deleteOneTransaction, modifyOneTransaction } from '../../store/slices/transactionSlice';
export default function LineChart({transactions}) {
  const monthArray = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var [monthAmount, setMonthAmount] = useState({ 'Jan': 0, 'Feb': 0, 'Mar': 0, 'Apr': 0, 'May': 0, 'Jun': 0, 'Jul': 0, 'Aug': 0, 'Sep': 0, 'Oct': 0, 'Nov': 0, 'Dec': 0 })
  var transactionData = new Map();

  const getMonth = (sqlDate) => {
    var sqlDateArr1 = sqlDate.split("-");
    var month = sqlDateArr1[1]
    return Number.parseInt(month)
  }


  transactions.map((item) => {
    // for transactions line chart
    // getting each month total transactions amount
    let sign = item.type == 'income' ? 1 : -1
    if (transactionData.has(getMonth(item.date))) {
      transactionData.set(getMonth(item.date), (transactionData.get(getMonth(item.date)) + (sign * item.amount)))
    } else {
      transactionData.set(getMonth(item.date), sign * item.amount)
    }
  })


  const setMonthData = () => {
    transactionData.forEach((item, key) => {
      setMonthAmount((prevs) => {
        return {
          ...prevs,
          [monthArray[key]]: item
        }
      })
    })
  }

  useEffect(() => {
    setMonthData()
  }, [transactions])


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

  const data = {
    monthArray,
    datasets: [
      {
        label: 'Transaction',
        data: monthAmount,
        borderColor: 'rgb(0,157,255)',
        backgroundColor: 'rgba(0,157,255, 0.5)',
      }
    ],
  };
  return (

    <div className='text-center row align-items-center justify-content-center m-1' style={{ height: '350px', background: 'white', boxShadow: '1px 1px 4px 1px rgba(34,41,47,0.12)!important', borderRadius: '8px' }}>
      <h3 className='col-12'>Transactions</h3>
      <div className='col-12' style={{ width: '100%' }}>
        <Line style={{ width: '100%' }} options={options} data={data} />
      </div>
    </div>
  )
}

import { useState, useEffect } from 'react'
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js'
import { useSelector } from 'react-redux'
Chart.register(ArcElement, Tooltip, Legend);
import categories from '../../public/icons/categories/categoriesList.json'
import { setTransaction, addNewTransaction, deleteOneTransaction, modifyOneTransaction } from '../../store/slices/transactionSlice';
export default function DoughnutChart({transactions}) {
  var [data, setData] = useState({ labels: [], datasets: [{ data: [], backgroundColor: [] }] })
  var transactionCategories = new Map();
  var myColor = categories.map((item) => { return item.backgroundColor })
  // var transactions = useSelector(state => state.transaction.map((item) => {

  transactions.map((item)=>{

    // for transactions categories
    // getting each category total trasactions amount
    if (transactionCategories.has(item.transactionCategory.id)) {
      transactionCategories.set(item.transactionCategory.id, { name: item.transactionCategory.title, amount: transactionCategories.get(item.transactionCategory.id).amount + item.amount })
    } else {
      transactionCategories.set(item.transactionCategory.id, { name: item.transactionCategory.title, amount: item.amount })
    }
  })
 

  const setdata = () => {
    let titles = Array.from(transactionCategories.values()).map((item) => item.name)
    let amounts = Array.from(transactionCategories.values()).map((item) => item.amount)
    setData(() => {
      return {
        labels: titles,
        datasets: [{ data: amounts, backgroundColor: myColor }]
      }
    })
  }

  useEffect(() => {
    setdata()
  }, [transactions])


  return (
    <div className='text-center m-1' style={{ alignItems: 'center', justifyContent: 'center', height: '350px', background: 'white', boxShadow: '1px 1px 4px 1px rgba(34,41,47,0.12)!important', borderRadius: '8px' }}>
      <h3 className='p-0 m-0 pt-3'>Transaction categories</h3>
      <div className='p-0 m-0' style={{ width: '100%', height: '280px', margin: '0 auto' }}>
       {data && <Doughnut style={{ width: '280px', height: '280px', margin: '0 auto' }} data={data} />} 
      </div>
    </div>
  )
}

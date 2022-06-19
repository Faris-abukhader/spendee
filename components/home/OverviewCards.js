import { useSelector } from "react-redux"
import { useEffect, useState } from "react";
export default function OverviewCards({transactions}) {
  var totalCash = 0;
  var totalIncome = 0;
  var totalExpense = 0;
  var totalChange = 0;
  const [dataList,setDataList] = useState([
    {
      title: 'Total Balance',
      amount: totalCash
    },
    {
      title: 'Total Period Change',
      amount: totalChange
    },
    {
      title: 'Total Period Expenses',
      amount: totalExpense
    },
    {
      title: 'Total Period Income',
      amount: totalIncome
    }
  ])
  

  const updateData = ()=>{
    transactions.map((item)=>{
      totalChange+=item.amount
      if(item.type=='income'){
        totalCash+=item.amount
        totalIncome+=item.amount;
      }else{
        totalCash-=item.amount
        totalExpense+=item.amount
      }
    })
    let data = 
      [
        {
          title: 'Total Balance',
          amount: totalCash
        },
        {
          title: 'Total Period Change',
          amount: totalChange
        },
        {
          title: 'Total Period Expenses',
          amount: totalExpense
        },
        {
          title: 'Total Period Income',
          amount: totalIncome
        }
      ]
      setDataList(data)
  }

  useEffect(()=>{
   updateData()
  },[transactions])


  return (
    <ul className="report list-group list-group-horizontal overflow-auto my-2 px-0 mx-0" style={{width: '100%' }}>
      {dataList.map((item, index) => {
        return (
          <li key={index} className="list-group-item mx-2 my-5" style={{ minWidth: '270px',border:'none',borderRadius:'8px',boxShadow: '1px 1px 4px 1px rgba(34,41,47,0.12)!important', }}>
            <h6 style={{color:'#324c5b'}}>{item.title}</h6>
            <h4 style={{color:'#2dba75'}}>{item.amount} USD</h4>
          </li>
        )})}
    </ul>
  )
}
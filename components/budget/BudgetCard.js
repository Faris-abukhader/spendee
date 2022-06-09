import React, { useEffect, useState } from 'react'
import BudgetIndicator from './BudgetIndicator'

export default function BudgetCard({data}) {
    var [percentage,setPercentage] = useState(0)
    var [reminder ,setReminder] = useState(0)

    const percentageHandler = ()=>{
        let totalAmount = 0
        data.transactions.map((item)=>{
           totalAmount+=item.amount
        })
        setReminder(data.amount-totalAmount)
        setPercentage(totalAmount/data.amount * 100)
    }

    useEffect(()=>{
     percentageHandler()
    },[])

    return (
      <div className='col-lg-4 col-md-3 col-sm-6 col-xs-12 p-2 '>
    <div className='text-start py-3 px-2' style={{height:'200px',background:'white',borderRadius:'8px',boxShadow:'2px 4px 8px 2px rgba(34,41,47,.12)!important'}}>
        <h3 className='pb-1'>{data.name}</h3>
        <div style={{color:'green'}}>{reminder} USD <span style={{color:'gray'}}>left</span></div>
        <small style={{color:'#7b93a4'}}>From {data.amount} USD</small>
        <br/>
        <br/>
        <BudgetIndicator percentage={percentage}/>
        <div style={{color:'#7b93a4'}} className='row align-items-between justify-content-center'>
            <div className='col-6 text-start'>
              {data.startedDate.substring(0,10)}
            </div>
            <div className='col-6 text-end'>
             {data.endDate.substring(0,10)}
            </div>
        </div>
    </div>
      </div>
  )
}

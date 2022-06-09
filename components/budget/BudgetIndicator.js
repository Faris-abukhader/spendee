import React from 'react'

export default function BudgetIndicator({percentage}) {


    const changeIndicatorColor = ()=>({
        width:`${percentage}%`,
        background:`rgb(24, 178, 114)`,
        height:'25px'
    })

    
  return (
  <>
    <div className='progress' style={{height:'25px'}}>
        <div className='prgoress-bar' style={changeIndicatorColor()}><div className='ms-2'style={{fontSize:'15px'}}>{percentage}%</div></div>
    </div>
     </>
  )
}

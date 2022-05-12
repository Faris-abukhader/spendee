import React from 'react'

export default function CategoryCard(props) {
  return (
    <div className='row justify-content-start align-items-center p-3'>
    <div className='col' style={{display:'flex',flexDirection:'row'}}>
        <div className='pe-2'>
        <img style={{borderRadius:'50%'}} src={`/icons/categories/categories_icon/${props.icon}`}/>
        </div>
        <div className='text-start'>
        <div style={{fontSize:'12px'}}>{props.title}</div>
        <div style={{fontSize:'8px',color:'darkgray'}}>Transaction {props.transactions}</div>
       </div>

     </div>
    </div>
  )
}

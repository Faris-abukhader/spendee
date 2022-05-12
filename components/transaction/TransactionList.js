import {useState} from 'react'
import TransactionListItem from './TransactionListItem'
export default function TransactionList(props) {
  return (
    <div className='p-2' style={{width:'100%',background:'white',borderRadius:'8px',boxShadow:'2px 4px 8px 2px rgba(34,41,47,.12)!important'}}>
     {props.data.map((item,index)=><TransactionListItem key={index} data={item}/>)}
    </div>
  )
}

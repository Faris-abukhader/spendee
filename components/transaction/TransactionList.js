import TransactionListItem from './TransactionListItem'
import {  useSelector } from 'react-redux'
export default function TransactionList({transactions}) {

  return (
    <div className='p-2' style={{width:'100%',background:'white',borderRadius:'8px',boxShadow:'2px 4px 8px 2px rgba(34,41,47,.12)!important'}}>
     {transactions.map((item,index)=><TransactionListItem data={item} key={index} showDivider={index+1!=transactions.length}/>)}
    </div>
  )
}

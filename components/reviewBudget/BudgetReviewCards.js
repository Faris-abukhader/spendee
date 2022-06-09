import React from 'react'

export default function BudgetReviewCards() {
    var data = 
      [
        {
          title: 'Originally Budgeted',
          amount: `123 USD`
        },
        {
          title: 'Spent so far',
          amount: `543 USD`
        },
        {
          title: 'Money left',
          amount: `9876 USD`
        },
        {
          title: 'You can spend',
          amount: `23456 USD/DAY`
        }
      ]
  return (
    <ul className="report list-group list-group-horizontal overflow-auto my-2 px-0 mx-0" style={{width: '100%' }}>
    {data.map((item, index) => {
      return (
        <li key={index} className="list-group-item mx-2 my-4" style={{ minWidth: '270px',border:'none',borderRadius:'8px',boxShadow: '2px 4px 8px 2px rgba(34,41,47,.12)!important', }}>
          <h6 style={{color:'#324c5b'}}>{item.title}</h6>
          <h4 style={{color:item.title == 'You can spend' ?'#324c5b':'#2dba75'}}>{item.amount}</h4>
        </li>
      )})}
  </ul>
  )
}

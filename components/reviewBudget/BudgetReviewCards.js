import {useEffect , useState} from 'react'

export default function BudgetReviewCards({data}) {

  var [cardData,setCardData] = useState([])


  const setupData = ()=>{
    setCardData( [
      {
        title: 'Originally Budgeted',
        amount: `${data.originallyBudgeted} USD`
      },
      {
        title: 'Spent so far',
        amount: `${data.spentSoFar} USD`
      },
      {
        title: 'Money left',
        amount: `${data.moneyLeft} USD`
      },
      {
        title: 'You can spend',
        amount: `${data.youCanSpend} USD/DAY`
      }
    ])
  }


  useEffect(()=>{
      setupData()
  },[data])

    
  return (
    <ul className="report list-group list-group-horizontal overflow-auto my-2 px-0 mx-0" style={{width: '100%' }}>
    {cardData.map((item, index) => {
      return (
        <li key={index} className="list-group-item mx-2 my-4" style={{ minWidth: '270px',border:'none',borderRadius:'8px',boxShadow: '2px 4px 8px 2px rgba(34,41,47,.12)!important', }}>
          <h6 style={{color:'#324c5b'}}>{item.title}</h6>
          <h4 style={{color:item.title == 'You can spend' ?'#324c5b':'#2dba75'}}>{item.amount}</h4>
        </li>
      )})}
  </ul>
  )
}

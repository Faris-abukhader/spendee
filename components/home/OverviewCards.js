import { useSelector } from "react-redux"
export default function OverviewCards() {
  var totalCash = 0;
  var totalIncome = 0;
  var totalExpense = 0;
  var totalChange = 0;
  useSelector((state) => state.transaction.map((item)=>{
    totalChange+=item.amount
    if(item.type=='income'){
      totalCash+=item.amount
      totalIncome+=item.amount;
    }else{
      totalCash-=item.amount
      totalExpense+=item.amount
    }
  },0))

  var data = 
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
  console.log(totalCash)
  return (
    <ul className="report list-group list-group-horizontal overflow-auto my-2 px-0 mx-0" style={{width: '100%' }}>
      {data.map((item, index) => {
        return (
          <li key={index} className="list-group-item mx-2 my-5" style={{ minWidth: '270px',border:'none',borderRadius:'8px',boxShadow: '2px 4px 8px 2px rgba(34,41,47,.12)!important', }}>
            <h5>{item.title}</h5>
            <h3>{item.amount} USD</h3>
          </li>
        )})}
    </ul>
  )
}
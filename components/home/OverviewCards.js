export default function OverviewCards({ data }) {
  return (
    <ul class="report list-group list-group-horizontal overflow-auto my-2 px-0 mx-0" style={{width: '100%' }}>
      {data.map((item) => {
        return (
          <li class="list-group-item mx-2 my-5" style={{ minWidth: '300px',border:'none',borderRadius:'8px',boxShadow: '2px 4px 8px 2px rgba(34,41,47,.12)!important', }}>
            <h5>{item.title}</h5>
            <h3>{item.amount} USD</h3>
          </li>
        )})}
    </ul>
  )
}
const defaultData =
  OverviewCards.defaultProps =
  {
    data:
      [
        {
          title: 'Total Balance',
          amount: 100
        },
        {
          title: 'Total Period Change',
          amount: 200
        },
        {
          title: 'Total Period Expenses',
          amount: 300
        },
        {
          title: 'Total Period Income',
          amount: 400
        }
      ]

  }
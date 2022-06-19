import { useEffect, useState } from 'react'
import Layout from '../../../../components/layout/Client'
import Breadcrumb from '../../../../components/reviewBudget/Breadcrumb'
import BudgetProgress from '../../../../components/reviewBudget/BudgetProgress'
import BudgetReviewCards from '../../../../components/reviewBudget/BudgetReviewCards'
import TransactionList from '../../../../components/reviewBudget/TransactionList'
import DeleteBudget from '../../../../components/reviewBudget/DeleteBudget'
import { wrapper } from '../../../../store/store'
import { getSession } from 'next-auth/react'
import axios from 'axios'
import { setUser } from '../../../../store/slices/userSlice'
import { setTransaction } from '../../../../store/slices/transactionSlice'
import { setTransactionCategory } from '../../../../store/slices/transactionCategorySlice'
import { modifyOneBudget, setBudget } from '../../../../store/slices/budgetSlice'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
export default function index() {
  var [budget, setBudget] = useState({})
  var [isLoaded, load] = useState(false)
  var [progressMessage, setProgressMessage] = useState(0)
  var [progressNumbers, setProgressNumbers] = useState({ originallyBudgeted: 0, spentSoFar: 0, moneyLeft: 0, youCanSpend: 0 })
  

  const router = useRouter()
  const id = useSelector((state) => state.user.id)
  const budgetId = router.query.id
  const myBudget = useSelector((state)=>state.budget.filter((item)=>item.id==budgetId)[0])

  const fetchData = async () => {
    setBudget(myBudget)
    load(true)
  }

  const subtractDays = () => {
    let current = new Date()
    let end = new Date(budget.endDate && budget.endDate)
    const diffTime = Math.abs(end - current);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays
  }


  const moneyCanSpend = () => {
    let current = new Date()
    let end = new Date(budget.endDate && budget.endDate.substring(0, 10))
    let totalSpent = 0
    let daysRemainder = 0

    if (budget.transactions) {
      budget.transactions.map((item) => totalSpent += item.amount)
    }

    if (end >= current) {
      daysRemainder = subtractDays()
      setProgressMessage(0)
      if (totalSpent > budget.amount) {
        setProgressMessage(2)
      }
    } else {
      setProgressMessage(1)
    }

    setProgressNumbers((prevs) => { return { ...prevs, ['originallyBudgeted']: budget.amount, ['spentSoFar']: totalSpent, ['moneyLeft']: budget.amount - totalSpent > 0 ? budget.amount - totalSpent : 0, ['youCanSpend']: budget.amount - totalSpent > 0 ? ((budget.amount - totalSpent) / daysRemainder).toFixed(2) : 0 } })

  }
  

    useEffect(() => {
      fetchData()
      moneyCanSpend()
    }, [budget,modifyOneBudget,isLoaded])


  return (
    <Layout>
      <Breadcrumb budget={budget} isLoad={load} />
      <BudgetReviewCards data={progressNumbers} />
      <BudgetProgress transactions={budget.transactions} progressNumbers={progressNumbers} amount={budget.amount} messageIndex={progressMessage} />

      {budget.transactions && budget.transactions.length > 0 ?
        <div className='mt-3'>
          <TransactionList data={budget.transactions} />
        </div>
        :
        <div style={{ width: '100%' }} className='text-center mt-5'>
          <img src='/icons/home/no_transaction.svg' />
          <br />
          <small style={{ opacity: '0.8' }}>You have no transactions yet</small>
        </div>
      }
      <DeleteBudget budgetId={budgetId}/>
    </Layout>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(store => async (ctx) => {
  const session = await getSession(ctx)


  if (session) {
    const dataList = session.user.email.split(',')
    const id = dataList[1]


    const data = await axios.get(`${process.env.API_URL}/user/${id}`, {
      method: "GET",
      headers: {
        token: id
      }
    })

    const user = await data.data;

    if (user.state) {
      const userInfo = { username: user.data.firstName + ' ' + user.data.secondName, id: user.data.id, email: user.data.email, image: user.data.image, age: user.data.age }
      store.dispatch(setUser(userInfo))
      if (user.data.transactions !== undefined) {
        store.dispatch(setTransaction(user.data.transactions))
      }
      if (user.data.budgets !== undefined) {
        store.dispatch(setBudget(user.data.budgets))
      }
      store.dispatch(setTransactionCategory(user.data.transactionCategories))

    }

    return {
      props: {
        session
      }
    }
  } else {
    return {
      redirect: {
        destination: '/api/auth/signin'
      },
      props: {}
    }
  }
})

import { useEffect, useState } from 'react'
import { getSession } from "next-auth/react"
import { wrapper } from '../../../store/store'
import axios from 'axios'
import { setTransactionCategory } from '../../../store/slices/transactionCategorySlice'
import { setTransaction } from '../../../store/slices/transactionSlice'
import ClientLayout from '../../../components/layout/Client'
import TransactionList from '../../../components/transaction/TransactionList'
import AddNewTransactionModal from '../../../components/transaction/AddNewTransactionModal'
import OverviewCard from '../../../components/home/OverviewCards'
import { useSelector } from 'react-redux'
import { setUser } from '../../../store/slices/userSlice'
import { setBudget } from '../../../store/slices/budgetSlice'
import MyDateRangePicker from '../../../components/home/DateRangePicker'
export default function index({ transactions }) {
  const userId = useSelector((state)=>state.user.id)
  const [transactionList,setTransactionList] = useState([]) 
  var [showModal, dispatchModal] = useState(false)
  var transaction = useSelector((state) => state.transaction)


  const updateData = (data)=>{
    setTransactionList(data)
  }

  useEffect(()=>{
    setTransactionList(transaction)
  },[transaction])

  const modalToggle = () => {
    dispatchModal(!showModal)
  }

  return (
    <ClientLayout page={'transactions'}>
      <div className='py-3 px-0'>
        <h3 className='py-2'>Transaction</h3>
        <button onClick={modalToggle} style={{ background: '#00cc8b', border: 'none', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} className='btn btn-success btn-sm'>
          <svg className='' xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" className="bi bi-plus-circle-fill" viewBox="0 0 16 16">
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
          </svg>
          <span className='ms-2'>Add new transaction</span>
        </button>
        <AddNewTransactionModal id={userId} show={showModal} toggle={modalToggle} />
        <OverviewCard transactions={transactionList} />
            <div  className='row align-items-between justify-content-center pt-4 px-0 my-2'>
              <h3 className=' col-lg-6 col-md-6 col-sm-6 col-xs-12 mb-4' style={{ marginRight: 'auto' }}>Overview</h3>
              <div className='col-lg-6 col-md-6 col-sm-6 col-xs-12'>
                <MyDateRangePicker updateNewData={updateData} />
              </div>
            </div>

        {transactionList.length > 0 ?
          <>
            <TransactionList transactions={transactionList} />
          </>
          :
          <div style={{ width: '100%' }} className='text-center mt-5'>
            <img src='/icons/home/no_transaction.svg' />
            <br />
            <small style={{ opacity: '0.8' }}>You have no transactions yet</small>
          </div>
        }

      </div>
    </ClientLayout>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(store => async (ctx) => {
  const session = await getSession(ctx)

  if (session) {
    const dataList = session.user.email.split(',')
    const id = dataList[1]

    let fromDate = new Date( new Date().setMonth(new Date().getMonth() - 1))
    let toDate = new Date()
    fromDate = fromDate.toISOString().slice(0, 19).replace('T', ' ')
    toDate = toDate.toISOString().slice(0, 19).replace('T', ' ')

    const data =  await axios.get(`${process.env.API_URL}/user/${id}`,{
      method:"GET",
      headers:{
        token:id
      }
    })

    const user = await data.data;
    
    if(user.state){
        const userInfo = {username:user.data.firstName+' '+user.data.secondName,id:user.data.id,email:user.data.email,image:user.data.image,age:user.data.age}
        store.dispatch(setUser(userInfo))

        if(user.data.transactions!== undefined){
          store.dispatch(setTransaction(user.data.transactions))
        }
        if(user.data.budgets !== undefined){
          store.dispatch(setBudget(user.data.budgets))
        }
        store.dispatch(setTransactionCategory(user.data.transactionCategories))
        
    }

    return {
      props: {
       session,
       transactions:user.data.transactions
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
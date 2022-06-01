import { useState } from 'react'
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
export default function index({ id }) {
  var [showModal, dispatchModal] = useState(false)
  var transactions = useSelector((state) => state.transaction)

  const modalToggle = () => {
    dispatchModal(!showModal)
  }

  return (
    <ClientLayout>
      <div className='py-3 px-0'>
        <h3 className='py-2'>Transaction</h3>
        <button onClick={modalToggle} style={{ background: '#00cc8b', border: 'none', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} className='btn btn-success btn-sm'>
          <svg className='pe-1' xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" className="bi bi-plus-circle-fill" viewBox="0 0 16 16">
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
          </svg>
          Add new transaction
        </button>
        <AddNewTransactionModal id={id} show={showModal} toggle={modalToggle} />
        {transactions.length > 0 ?
          <>
            <OverviewCard />
            <TransactionList {...{transactions}} />
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


    const data =  await axios.get(`${process.env.API_URL}/user/${id}`,{
      method:"GET",
      headers:{
        token:id
      }
    })

    const user = await data.data;

    console.log(user)
    
    if(user.state){
        const userInfo = {username:user.data.firstName+' '+user.data.secondName,id:user.data.id,email:user.data.email,image:user.data.image,age:user.data.age}
        store.dispatch(setUser(userInfo))
        if(user.transactions!== undefined){
          store.dispatch(setTransaction(user.data.transactions))
        }
        store.dispatch(setTransactionCategory(user.data.transactionCategories))
        // store.dispatch(setBudget(user.budgets))
        
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
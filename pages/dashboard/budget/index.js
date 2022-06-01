import React from 'react'
import Layout from '../../../components/layout/Client'
import AddNewBudgetCard from '../../../components/budget/AddNewBudgetCard'
import BudgetCategoriesSelector from '../../../components/budget/BudgetCategoriesSelector'
import { wrapper } from '../../../store/store'
import { getSession } from 'next-auth/react'
import axios from 'axios'
import { setUser } from '../../../store/slices/userSlice'
import { setTransaction } from '../../../store/slices/transactionSlice'
import { setTransactionCategory } from '../../../store/slices/transactionCategorySlice'
export default function index() {
  return (
      <Layout>
    <div className='row align-items-center justify-content-start px-3'>
    <AddNewBudgetCard/>
    </div>
    </Layout>
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
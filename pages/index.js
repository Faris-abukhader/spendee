import { useState } from 'react'
import { getSession } from "next-auth/react"
import Head from 'next/head'
import ClientLayout from '../components/layout/Client'
import WalletCard from '../components/home/WalletCard'
import OverviewCard from '../components/home/OverviewCards'
import DateRangePicker from '../components/home/DateRangePicker'
import DoughnutChart from '../components/charts/DoughnutChart'
import LineChart from '../components/charts/LineChart'
import { wrapper } from '../store/store'
import {setUser} from '../store/slices/userSlice'
import {setTransaction} from '../store/slices/transactionSlice'
import { setTransactionCategory } from '../store/slices/transactionCategorySlice'
import { useSelector } from 'react-redux'
import axios from 'axios'
export default function Home() {
  var [transactionAmount ,setTransactionAmount] = useState(0)
  const transactions = useSelector((state)=>state.transaction)
  var transactionAmount = 0
  transactions.map((item)=>{
    if(item.type=='expense'){
      transactionAmount-=item.amount
    }else{
      transactionAmount+=item.amount
    }
  })


  return (
    <ClientLayout>
      <div className='pt-4'>
        <Head>
          <title>Ewallet</title>
          <meta name="description" content="Generated by FaRiS and Ahmed" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <h3>Wallets</h3>
        <div className='ps-3'>
          <WalletCard amount={transactionAmount} />
        </div>
        {transactions ? 
        <>
                <div style={{ marginTop: '50px' }} className='row align-items-between justify-content-center pt-4 px-0'>
                <h3 className=' col-lg-6 col-md-6 col-sm-6 col-xs-12 mb-4' style={{ marginRight: 'auto' }}>Overview</h3>
                <div className='col-lg-6 col-md-6 col-sm-6 col-xs-12'>
                  <DateRangePicker />
                </div>
              </div>
              <OverviewCard />
        <div className='row'>
          <div className='col-lg-6 col-md-6 col-sm-12'>
            <DoughnutChart />
          </div>
          <div className='col-lg-6 col-md-6 col-sm-12'>
            <LineChart />
          </div>
        </div>
        </>
        :
        <div style={{width:'100%'}} className='text-center'>
            <img className='mb-2'  style={{opacity:'0.6'}} src='/icons/home/no_transaction.svg'/>
            <br/>
            <small style={{color:'#009DFF',opacity:'0.6'}}>You have no transactions yet</small>
        </div>
}
      </div>
    </ClientLayout>
  )
}


export const getServerSideProps = wrapper.getServerSideProps(store=>async(ctx)=>{
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

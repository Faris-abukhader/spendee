import { useEffect } from 'react'
import { getSession, useSession } from "next-auth/react"
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import ClientLayout from '../components/layout/Client'
import WalletCard from '../components/home/WalletCard'
import OverviewCard from '../components/home/OverviewCards'
import DateRangePicker from '../components/home/DateRangePicker'
export default function Home({session}) {


  


  return (
    <ClientLayout>

    <div className='pt-4'>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

<div className='px-5'>
<div className='px-3'>
<h3>Wallets</h3>

<WalletCard amount={3000}/>


<div style={{marginTop:'50px'}} className='row align-items-between justify-content-center pt-4'>
<h3 className=' col-lg-6 col-md-6 col-sm-12 mb-4' style={{marginRight:'auto'}}>Overview</h3>
<div className='col-lg-6 col-md-6 col-sm-12'>
<DateRangePicker/>
</div>
</div>


</div>
</div>
  
    <OverviewCard/>
    <OverviewCard/>
    <OverviewCard/>
    <OverviewCard/>
    <OverviewCard/>
    <OverviewCard/>
    <OverviewCard/>
    <OverviewCard/>
    <OverviewCard/>
    <OverviewCard/>
    <OverviewCard/>
    <OverviewCard/>
    <OverviewCard/>
    <OverviewCard/>

    </div>

    </ClientLayout>
    
  )
}


export const getServerSideProps = async (ctx)=> {
  const session = await getSession(ctx )

  if (session) {
    return{
      props:{
        session
      }
    }
  } else {
    return{
      redirect:{
        destination:'/api/auth/signin'
      },
      props:{}
    }
  }
  
}
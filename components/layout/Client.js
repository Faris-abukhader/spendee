import React from 'react'
import Nav from './components/Nav'
import Footer from './components/Footer'
import BottomNav from './components/BottomNav'
export default function client({children,page}) {
  return (
    <>
    <Nav page={page}/>
    <div className='p-0 m-0 row align-items-start justify-content-center' style={{minHeight:'88vh',background:'#f4f7fa'}}>
      <div className='col py-5' style={{maxWidth:'900px'}}>
       {children}
      </div>
    </div>
    <BottomNav/>
    {/* <Footer/> */}
    </>
  )
}

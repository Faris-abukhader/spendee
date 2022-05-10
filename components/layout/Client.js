import React from 'react'
import Nav from './components/Nav'
import Footer from './components/Footer'
import BottomNav from './components/BottomNav'
export default function client({children}) {
  return (
    <>
    <Nav/>
    <div className='p-0 m-0 row align-items-start justify-content-center' style={{minHeight:'88vh',background:'rgba(240,242,245,1.0)'}}>
      <div className='col' style={{maxWidth:'900px'}}>
       {children}
      </div>
    </div>
    <BottomNav/>
    <Footer/>
    </>
  )
}

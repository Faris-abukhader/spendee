import React from 'react'
import Nav from './components/Nav'
import Footer from './components/Footer'
import BottomNav from './components/BottomNav'
export default function client({children}) {
  return (
    <>
    <Nav/>
    <div style={{minHeight:'88vh',background:'rgba(240,242,245,1.0)'}}>
    {children}
    </div>
    <BottomNav/>
    <Footer/>
    </>
  )
}

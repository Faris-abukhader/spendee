import React from 'react'
import SupportCard from './components/SupportCard'
export default function Support() {
  let data = [
    {
      title:'Help Center',
      icon:'helpCenter.svg'
    },{
      title:'Send Feedback',
      icon:'sendFeedback.svg'
    },{
      title:'Blog',
      icon:'blog.svg'
    },{
      title:'Contact customer support',
      icon:'customerSupport.svg'
    }
  ]
  return (
    <div className='px-3 my-3'>
    <fieldset>
      <legend>Support</legend>
    <div className='px-3 mt-3'>
      <div className='row align-items-center justify-content-center'>
      {data.map((item)=><div key={item.id} className='col-lg-6 col-md-6 col-sm-12 col-sm-112 '><SupportCard {...item} /></div>)}
      </div>       
    </div>
    </fieldset>
    </div>
  )
}

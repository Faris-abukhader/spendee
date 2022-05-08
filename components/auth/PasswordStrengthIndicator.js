import React from 'react'
import {passwordStrength} from '../../validation/password'

export default function passwordStrengthIndicator({password}) {

    const strength = passwordStrength(password)

    let color = '' 
    switch(strength.id){
      case 0: color='red';break;
      case 1: color='orange';break;
      case 2: color='yellow';break;
      case 3: color='green';break;
    }

    const changePasswordColor = ()=>({
        width:`${(strength.id)*100/4+(25*(strength.id/strength.id))}%`,
        background:`${color}`,
        height:'7px'
    })

    
  return (
  <>
    <div className='progress' style={{height:'7px'}}>
        <div className='prgoress-bar' style={changePasswordColor()}></div>
    </div>
    <div className='text-end'>
     <div style={{color:color,fontSize:'10px'}}>{strength.value}</div>
     </div>
     </>
  )
}

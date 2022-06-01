import { useState } from "react"
import { Form,FloatingLabel } from "react-bootstrap"
import Link from "next/link"
import axios from 'axios'
import emailValidation from  "../.../../../validation/email"
export default function twoSetp({apiEndpoint}) {

    var [email,setEmail] = useState('')
    var [buttonDisable,setButtonDisable] = useState(true)
    var [alert,showAlert] = useState({sucess:false,error:false})

    function isEnable(){
       if(emailValidation(email)){
        setButtonDisable(false)
       }else{
        setButtonDisable(true)
       }
    }

    function submit(){
      axios.get(`${apiEndpoint}/password/changeRequest/${email}`)
      .then((response)=>{
        if(response.data.state){
          showAlert({sucess:true,error:false})
        }else{
          showAlert({sucess:false,error:true})
        }
      })
    }

  return (
<>
    <div className='fluid-container' style={{background:'rgba(240,242,245,1.0)'}}>
      <div className='row justify-content-center align-items-center px-3 mx-5' style={{minHeight:'100vh'}}>
        <div className='col card' style={{background:'white',borderRadius:'10px',border:'none',boxShadow:'0 2px 4px rgb(0 0 0 / 10%), 0 8px 16px rgb(0 0 0 / 10%)',maxWidth:'500px'}}>
          <div className='col'style={{background:'white',borderRaduis:'20px',borderShadow:'0 2px 4px rgb(0 0 0 / 10%), 0 8px 16px rgb(0 0 0 / 10%)'}}>
            <div className='p-3'>
              <div className='text-center mb-4'>
                <img src='/Ahmed/Pictures/logo.png' style={{width:'60%'}}/>
               <h5 className="mt-3">Forgot Password? 🔒</h5>
               <p style={{color:'darkgray'}}>Enter your email and we'll send you instructions to reset your password</p>
              </div>
            <FloatingLabel
            controlId="floatingInput"
            label="Email address"
            className="mb-3"
            >
            <Form.Control type="email" name='email' value={email} onChange={(e)=>{setEmail(e.target.value);isEnable()}} />
            </FloatingLabel>            
              <button className='btn btn-light m-2' style={{background:'rgb(8,105,251)',color:'white',width:'100%'}} disabled={buttonDisable} onClick={submit} >Confirm</button>
           <div className="text-center" >
           <Link href={`/auth/signIn`}>
               <a style={{textDecoration:'none'}}>
               <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-chevron-left"><polyline points="15 18 9 12 15 6"></polyline></svg>
               Back to login
               </a>
           </Link>
           </div>
           {alert.sucess && <div className="alert alert-success text-center" role="alert">We've sent a link to your email address: <b>{email}</b> Please follow the link inside to continue</div>}
          {alert.error && <div className="alert alert-danger" role="alert">this email : <b>{email}</b> isn't register with us , hurry up and register now.</div>}
          </div>
        </div>
        </div>
      </div>
    </div>
    </> 
     )
}
export const getServerSideProps = async()=>{
  const apiEndPoint = process.env.API_URL
  console.log(apiEndPoint)
  return{
    props:{
      apiEndpoint:apiEndPoint
    }
  }
}
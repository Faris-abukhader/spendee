import {useState} from 'react'
import jwt from 'jsonwebtoken'
import { Form,FloatingLabel } from "react-bootstrap"
import Link from "next/link"
import { useRouter } from 'next/router'
import axios from 'axios'
import {passwordStrength} from  "../.../../../validation/password"
import PasswordStrengthIndicator from '../../components/auth/PasswordStrengthIndicator'
export default function resetPassword({apiEndpoint,token}) {

    var [password,setPassword] = useState('')
    var [disable,setDisble] = useState(true)
    const router = useRouter()


    function isEnable(){
        console.log(passwordStrength(password).value)
        if(passwordStrength(password).value ==='Medium'){
            setDisble(false)
            
        }else{
            setDisble(true)
        }
     }
 
     function submit(){
       axios.post(`${apiEndpoint}/password/reset`,{password:password},{headers:{"X-auth-token":token}})
       .then((response)=>{
         console.log(response)
          if(response.data.state){
            router.push(`/auth/signIn`)
           }
       })
 
 
     }
 
 

  return (
<>
    <div className='fluid-container' style={{background:'rgba(240,242,245,1.0)'}}>
      <div className='row justify-content-center align-items-center mx-3' style={{minHeight:'100vh'}}>
        <div className='col card' style={{background:'white',borderRadius:'10px',border:'none',boxShadow:'0 2px 4px rgb(0 0 0 / 10%), 0 8px 16px rgb(0 0 0 / 10%)',maxWidth:'500px'}}>
          <div className='col'style={{background:'white',borderRaduis:'20px',borderShadow:'0 2px 4px rgb(0 0 0 / 10%), 0 8px 16px rgb(0 0 0 / 10%)'}}>
            <div className='p-3'>
              <div className='text-center mb-4'>
                <img src='/Ahmed/Pictures/logo.png' style={{width:'60%'}}/>
               <h5 className="mt-3">Your new Password 🔒</h5>
               <p style={{color:'darkgray'}}>Your new password must be different from previously used passwords</p>
              </div>
              <FloatingLabel
            controlId="floatingInput"
            label="Password"
            className="mb-2"
            >
            <Form.Control type="password" name='password' value={password} onChange={(e)=>{setPassword(e.target.value);isEnable()}}/>
            </FloatingLabel>
            {password && <PasswordStrengthIndicator password={password}/>}
            {passwordStrength(password).notEncluded.length !=0 ? <div style={{color:'darkgray',fontSize:'9px'}}>Password should have {passwordStrength(password).notEncluded.map((item)=><span key={item}>{item},</span>)} and length 6 to be accepted.</div>:<div></div>}
              <button className='btn btn-light m-2' style={{background:'rgb(8,105,251)',color:'white',width:'100%'}} disabled={disable} onClick={submit} >set new password</button>
           <div className="text-center" >
           <Link href={`/auth/signIn`}>
               <a style={{textDecoration:'none'}}>
               <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-left"><polyline points="15 18 9 12 15 6"></polyline></svg>
               Back to login
               </a>
           </Link>
           </div>
          </div>
        </div>
        </div>
      </div>
    </div>
    </> 
  )
}

export const getServerSideProps = async(context)=>{
    const apiEndPoint = process.env.API_URL
    const token = context.query.token

    // try{
    //     var decoded = jwt.verify(token, process.env.JWT_SECRET);
        return{
            props:{
              apiEndpoint:apiEndPoint,
              token:token
            }
          }
      
    // }catch{
        // return {
        //     redirect: {
        //       destination: "/auth/signIn"
        //     }
        //   }   
    //  }
  }
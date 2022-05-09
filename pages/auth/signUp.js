import {useState} from 'react'
import Link from 'next/link'
import {Form,FloatingLabel} from 'react-bootstrap'
import axios from 'axios'
import Error from '../../components/customModals/Error'
import Sucess from '../../components/customModals/Sucess'
import emailValidation from  "../.../../../validation/email"
import {passwordStrength,isEqual} from  "../.../../../validation/password"
import PasswordStrengthIndicator from '../../components/auth/PasswordStrengthIndicator'
export default function signUp({apiEndpoint}) {
  var [newUser,setNewUser] = useState({email:'',password:'',prePassword:'',firstName:'',lastName:''})
  var [waring,setWarning] = useState({email:'',prePassword:'',firstName:'',lastName:''})
  var [disable,setDisable] = useState(true)
  var [showModal,setShowModal] = useState({sucess:false,error:false})
  var [alert,showAlert] = useState(false)


  function inputHandler(event){
    const {name , value} = event.target
    setNewUser((prevs)=>{
      return{
        ...prevs,
        [name]:value  
      }
    })
    validation(name)
    buttonEnable() 
  }

  function validation(name){
    if(name=="email"){
      if(!emailValidation(newUser.email)){
        setWarning((prevs)=>{
          return {
            ...prevs,
            ['email']:'Email is not valid'
          }
        })
      }else{
        setWarning((prevs)=>{
          return {
            ...prevs,
            ['email']:''
          }
        })
      }
    }
    if(name=='password'){
       if(newUser.password.length<8){
        setWarning((prevs)=>{
          return{
            ...prevs,
            ['password']:`password length should be more than 8`
          }
        })
       }else{
        setWarning((prevs)=>{
          return{
            ...prevs,
            ['password']:``
          }
        })
       }
    }
    if(name == 'prePassword'){
      if(!isEqual(newUser.password,newUser.prePassword)){
        if(!(newUser.password!=newUser.prePassword)){
        setWarning((prevs)=>{
          return{
            ...prevs,
            ['prePassword']:`Password and Prepassword aren't matching`
          }
        })
      }else{
        setWarning((prevs)=>{
          return {
            ...prevs,
            ['prePassword']:''
          }
        })
      }
    }
    if(name == 'firstName'){
      if(newUser.firstName.length>=3 && newUser.firstName.length<=10){
        setWarning((prevs)=>{
          return{
            ...prevs,
            ['firstName']:''
          }
        })
  
      }else{
        setWarning((prevs)=>{
          return{
            ...prevs,
            ['firstName']:'First name should length should be in 3 ~ 10'
          }
        })  
      }
    }
    if (name == 'lastName'){
      if(newUser.lastName.length>=3 && newUser.lastName.length<=10){
        setWarning((prevs)=>{
          return{
            ...prevs,
            ['lastName']:''
          }
        })
  
      }else{
        setWarning((prevs)=>{
          return{
            ...prevs,
            ['lastName']:'Last name should length should be in 3 ~ 10'
          }
        })  
      }
    }
  }
}

  function buttonEnable(){
    if(emailValidation(newUser.email) && passwordStrength(newUser.password).value === 'Strong' && newUser.firstName.length>=3 && newUser.firstName.length<=10 && newUser.lastName.length>=3 && newUser.lastName.length<=10){
      setDisable(false)
    }else{
      setDisable(true)
    }
  }

  function submit(){
    const token = "fafrefraef" 
    axios.post(`${apiEndpoint}/user`,newUser,{headers:{"X-auth-token":token}})
    .then(response=>{
      if(response.data.state){
        reset()
        showAlert(true)
        setShowModal({sucess:true,error:false})
        setTimeout(() => {
          setShowModal({sucess:false,error:false})
        }, 500);
      }else{
        setShowModal({sucess:false,error:true})
        setTimeout(() => {
          setShowModal({sucess:false,error:false})
        }, 500);
      }
    })
    .catch(err=>{
      setShowModal({sucess:false,error:true})
      setTimeout(() => {
        setShowModal({sucess:false,error:false})
      }, 500);
    })
  }

  function reset(){
    setNewUser({email:'',password:'',prePassword:'',firstName:'',lastName:''})
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
              </div>
            <FloatingLabel
            controlId="floatingInput"
            label="Email address"
            className="mb-3"
            >
            <Form.Control type="email" name='email' value={newUser.email} onChange={inputHandler} />
            {waring.email && <div style={{color:'red',fontSize:'11px'}}>{waring.email}</div>}
            </FloatingLabel>
            <FloatingLabel
            controlId="floatingInput"
            label="Password"
            className="mb-2"
            >
            <Form.Control type="password" name='password' value={newUser.password} onChange={inputHandler}/>
            </FloatingLabel>
            {newUser.password && <PasswordStrengthIndicator password={newUser.password}/>}
            {passwordStrength(newUser.password).notEncluded.length !=0 ? <div style={{color:'darkgray',fontSize:'9px'}}>Password should have {passwordStrength(newUser.password).notEncluded.map((item)=><span>{item},</span>)} and length 6 to be accepted.</div>:<div></div>}
            <FloatingLabel
            controlId="floatingInput"
            label="Re-password"
            className="my-2"
            >
            <Form.Control type="password" name='prePassword' value={newUser.prePassword} onChange={inputHandler} />
            </FloatingLabel>
            {waring.prePassword &&<div style={{color:'red',fontSize:'11px'}}><small>{waring.prePassword}</small></div>}
            <FloatingLabel
            controlId="floatingInput"
            label="First Name"
            className="mb-3"
            >
            <Form.Control type="text" name='firstName' value={newUser.firstName} onChange={inputHandler} />
            </FloatingLabel>
            {waring.firstName &&<div style={{color:'red'}}><small className='mb-2'>{waring.firstName}</small></div>}
            <FloatingLabel
            controlId="floatingInput"
            label="Last name"
            className="mb-3"
            >
            <Form.Control type="text"  name='lastName' value={newUser.lastName} onChange={inputHandler}/>
            </FloatingLabel>
            {waring.lastName &&<div style={{color:'red'}}><small className='mb-2'>{waring.lastName}</small></div>}
            <div className='text-end'>
              <Link href={`/auth/signIn`}>
              <small>Have an account? <a style={{color:'rgb(8,105,251)',cursor:'pointer'}}>Login here!</a></small>
              </Link>
            </div>
            <div className='row justify-content-center'>
              <button className='btn btn-light col-4 m-2' style={{background:'rgb(8,105,251)',color:'white'}} disabled={disable} onClick={submit}>Sign up</button>
              <button className='btn btn-outline-warning col-4 m-2' style={{color:'black'}} onClick={reset}>Reset</button>
            </div>
            {alert && <div class="alert alert-success text-center" role="alert">We've sent a link to your email address: <b>{newUser.email}</b> Please follow the link inside to continue</div>}
          </div>
        </div>
        </div>
      </div>
    </div>
    <Error show={showModal.error} message={`email already exist`}/>
    <Sucess show={showModal.sucess} message={`Registeration done sucessfully`}/>
    </>
  )
}

export const getServerSideProps = async()=>{
  const apiEndPoint = process.env.API_URL
  return{
    props:{
      apiEndpoint:apiEndPoint
    }
  }
}
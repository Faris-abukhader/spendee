import {useState} from 'react'
import { getCsrfToken,signIn } from "next-auth/react"
import Link from 'next/link'
import {Form,FloatingLabel} from 'react-bootstrap'
import emailValidation from  "../.../../../validation/email"
export default function SignIn({ csrfToken }) {
  var [user,setuser] = useState({email:'',password:'',csrfToken:csrfToken})
  var [disable,setDisable] = useState(true)

  function inputHandler(event){
    const {name , value} = event.target
    setuser((prevs)=>{
      return{
        ...prevs,
        [name]:value  
      }
    })
    buttonEnable() 
    buttonEnable()
  }


  
  function buttonEnable(){
    if(emailValidation(user.email) && user.password.length>=4){
      setDisable(false)
    }else{
      setDisable(true)
    }
  }

  async function submit(e){
    e.preventDefault()

    let test = await signIn('credentials',{
      redirect:true,
      callbackUrl:process.env.BASE_URL,
      email:user.email,
      password:user.password
    });

    console.log(test)
  }


  function reset(){
    setuser({email:'',password:''})
  }


  return (
    <>
    <div className='fluid-container' style={{background:'rgba(240,242,245,1.0)'}}>
      <div className='row justify-content-center align-items-center' style={{minHeight:'100vh'}}>
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
            <Form.Control type="email" name='email' value={user.email} onChange={inputHandler} />
            </FloatingLabel>
            <FloatingLabel
            controlId="floatingInput"
            label="Password"
            className="mb-3"
            >
            <Form.Control type="password" name='password' value={user.password} onChange={inputHandler}/>
            </FloatingLabel>
            <div className='text-end'>
              <Link href='/auth/twoStep'>
                <a style={{textDecoration:'none'}}><small>Forget password?</small></a>
              </Link>
            </div>
            <div className='row justify-content-center'>
              <button className='btn btn-light col-4 m-2' style={{background:'rgb(8,105,251)',color:'white'}} disabled={disable} onClick={submit}>Sign in</button>
              <button className='btn btn-outline-warning col-4 m-2' style={{color:'black'}} onClick={reset}>Reset</button>
            </div>
            <div className='text-center'>
              <Link href={`/auth/signUp`}>
              <small>Don't have an account yet? <a style={{color:'rgb(8,105,251)',cursor:'pointer'}}>Sign Up here!</a></small>
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

export async function getServerSideProps(context) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  }
}

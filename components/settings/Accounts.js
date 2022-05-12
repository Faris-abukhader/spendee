import {useState} from 'react'
import { FloatingLabel,Form } from 'react-bootstrap'
import EventEmitter from '../../utils/EventEmitter'
export default function Accounts() {

  var [userData,setUserData] = useState({email:'',firstName:'',secondName:'',image:'',gender:'',age:0})


  function submit(){
    // . . . 

    EventEmitter.emit('reloadSession',{userData})
    EventEmitter.emit('testEvent',{userData})

  }

  return (
    <div className='px-4 mb-3'>
        <h2 className='my-5'>Accout Settings</h2>
        <div className='text-start mb-2' style={{color:'darkgray'}}>
            Profile photo
        </div>

        <div className='row justify-content-start align-items-center'>
        <div className='col' style={{maxWidth:'100px',height:'100px',borderRadius:'50%',border:'dashed'}}></div>
        <div className='btn btn-primary ms-3 col' style={{maxWidth:'200px',maxHeight:'40px'}}>Upload Avatar</div>
        </div>
        <div className='row justify-content-center align-items-center mt-3'>
            <div className='col-6'>
            <FloatingLabel
            controlId="floatingInput"
            label="First Name"
            className="mb-3" >
             <Form.Control type="text" placeholder="" />
              </FloatingLabel>
            </div>  
            <div className='col-6'>
            <FloatingLabel
            controlId="floatingInput"
            label="Second Name"
            className="mb-3" >
             <Form.Control type="text" placeholder="" />
              </FloatingLabel>
            </div>
            <div className='col-6'>
            <FloatingLabel controlId="floatingSelectGrid" label="Gender">
      <Form.Select aria-label="Floating label select example">
        <option>select your gender</option>
        <option value="male">male</option>
        <option value="female">female</option>
      </Form.Select>
    </FloatingLabel>           
     </div>
            <div className='col-6'>
            <FloatingLabel
            controlId="floatingInput"
            label="Email"
            className="mb-3" >
             <Form.Control type="email" placeholder="" />
              </FloatingLabel>
            </div>

            <hr/>
            <div className='text-end'>
                <button id='modifyUserButton' onClick={submit} className='btn btn-sm btn-primary'>Save my settings</button>
            </div>
        </div>

      

    </div>
  )
}

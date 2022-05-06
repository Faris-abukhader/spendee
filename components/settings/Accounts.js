import React from 'react'
import { FloatingLabel,Form, NavItem } from 'react-bootstrap'
import iconsList from '../../public/icons/categories/iconsList.json'
export default function Accounts() {

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
            <FloatingLabel
            controlId="floatingInput"
            label="Gender"
            className="mb-3" >
             <Form.Control type="text" placeholder="" />
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
                <button className='btn btn-sm btn-primary'>Save my settings</button>
            </div>
        </div>

      <div className='bg-primary'>

     {iconsList.map((item)=><><h1>{item.title}</h1><img style={{background:`${item.type == 'expense'? 'red':'green'}`,borderRadius:'50%'}} src={`/icons/categories/categories_icon/${item.icon}`}/></>)}
     </div>

    </div>
  )
}

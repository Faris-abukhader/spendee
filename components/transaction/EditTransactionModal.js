import { useState,useEffect } from 'react'
import {Modal,FloatingLabel,Form} from 'react-bootstrap'
import TransactionCategorySelector from './transactionCategorySelector'
export default function ({data,show,toggle}) {
  var [transactionData,setTransactionData] = useState([])


  useEffect(()=>{
   setTransactionData(data)
  },[])


  const  setTransactionTitleTypeAndIcon = (title,type,icon,backgroundColor)=>{
    setTransactionData((prevs)=>{
      return{
        ...prevs,
        ['title']:title,
        ['type']:type,
        ['icon']:icon
      }
    })
  }

  const inputHandler = (event)=>{
    const {name,value} = event.target
    setTransactionData((prevs)=>{
      return{
        ...prevs,
        [name]:value
      }
    })
  }

  function submit(){
    // Todo . . .
    toggle()
    reset()
  }

  function reset(){
    setTransactionData({title:'',icon:'',type:'',date:new Date(),note:'',amount:0})

  }

  return (
    <>
       <Modal centered show={show} onHide={toggle} style={{ border: 'none', boxShadow: '2px 4px 8px 2px rgba(34,41,47,.12)!important' }}>
        <Modal.Header closeButton style={{ border: 'none' }}>
          <Modal.Title>Edit transaction</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='row align-items-center justify-content-center'>
          <div className='col-sm-12 col-md-6 col-lg-6'>
          <TransactionCategorySelector icon={transactionData.icon} title={transactionData.title} setTransactionTypeAndIcon={setTransactionTitleTypeAndIcon}/>
          </div>
            <div className='col-sm-12 col-md-6 col-lg-6'>
              <FloatingLabel
                controlId="floatingInput"
                label="Date"
                className="mb-3">
                <Form.Control type={`date`} name='date' value={transactionData.date} onChange={inputHandler} />
              </FloatingLabel>
            </div>
            <div className='col-sm-12 col-md-6 col-lg-6'>
              <FloatingLabel
                controlId="floatingInput"
                label="Note"
                className="mb-3">
                <Form.Control type={`text`} name='note' value={transactionData.note} onChange={inputHandler} />
              </FloatingLabel>
            </div>
            <div className='col-sm-12 col-md-6 col-lg-6'>
              <FloatingLabel
                controlId="floatingInput"
                label="Amount"
                className="mb-3">
                <Form.Control type={`number`} name='amount' value={transactionData.amount} onChange={inputHandler} />
              </FloatingLabel>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className='text-center' style={{ border: 'none' }}>
          <div style={{margin:'0 auto'}}>
          <button className='btn btn-outline-primary me-2'onClick={()=>{reset();toggle()}}>Cancel</button>
          <button className='btn btn-primary'onClick={submit}>Confirm</button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  )
}

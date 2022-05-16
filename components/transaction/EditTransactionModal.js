import { useState,useEffect } from 'react'
import {Modal,FloatingLabel,Form} from 'react-bootstrap'
import { useSelector } from 'react-redux'
import TransactionCategorySelector from './transactionCategorySelector'
import axios from 'axios'
import { modifyOneTransaction } from '../../store/slices/transactionSlice'
import { useDispatch } from 'react-redux'
export default function ({show,toggle,itemId}) {
  const transaction = useSelector((state)=>state.transaction[0].transaction[0].filter((item)=>item.id==itemId)[0])
  var [transactionData,setTransactionData] = useState({id:'',type:'',title:'',icon:'',categoryId:'',date:'',note:'',amount:0})
  const dispatch = useDispatch()

  const dispatchTransactionData = ()=>{
    setTransactionData({id:transaction.id,type:transaction.type,title:transaction.title,icon:transaction.icon,categoryId:transaction.category,date:transaction.date,note:transaction.note,amount:transaction.amount})
  }

  useEffect(()=>{
    dispatchTransactionData()
  },[show])

  
  const  setTransactionIdTitleTypeAndIcon = (id,title,type,icon)=>{
    setTransactionData((prevs)=>{
      return{
        ...prevs,
        ['category']:id,
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
        [name]: name == 'amount' ? Number.parseInt(value):value
      }
    })
  }

  async function submit(){


    if(transactionData.type=='expense'){transactionData.amount *= -1 }
    const request = await axios.put(`${process.env.API_URL}/transaction/${transactionData.id}`,transactionData)
    const response = await request.data

    if(response.state){
      dispatch(modifyOneTransaction(transactionData))
    }

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
          <TransactionCategorySelector icon={transactionData.icon} title={transactionData.title}  itemId={itemId} setTransactionIdTitleTypeAndIcon={setTransactionIdTitleTypeAndIcon}/>
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

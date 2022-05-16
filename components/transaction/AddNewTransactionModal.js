import { useState ,useEffect} from 'react'
import { getSession } from "next-auth/react"
import { Modal, FloatingLabel,Form } from 'react-bootstrap'
import TransactionCategorySelector from './transactionCategorySelector'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { addNewTransaction, setTransaction } from '../../store/slices/transactionSlice'
export default function addNewTransactionModal(props) {

  var [transactionData,setTransactionData] = useState({id:' ',type:' ',title:' ',icon:' ',categoryId:' ',date:new Date(),note:' ',amount:0})
  var [disable,setDisable] = useState(true)
  const dispatch = useDispatch()

  const setUserId = ()=>{
    setTransactionData((prevs)=>{
      return{
        ...prevs,
        ['id']:props.id
      }
    })
  }
  const  setTransactionIdTitleTypeAndIcon = (id,title,type,icon)=>{
    setTransactionData((prevs)=>{
      return{
        ...prevs,
        ['categoryId']:id,
        ['icon']:icon,
        ['title']:title,
        ['type']:type
      }
    })
  }


  useEffect(()=>{
    setUserId()
  },[])

  const inputHandler = (event)=>{
    const {name,value} = event.target
    setTransactionData((prevs)=>{
      return{
        ...prevs,
        [name]:name=='amount' ? Number.parseInt(value):value
      }
    })
  }

  function validator(){
    if(transactionData.amount > 0 && transactionData.categoryId.length > 0 && transactionData.note.length > 0){
      setDisable(false)
    }else{
      setDisable(true)
    }
  }

  useEffect(()=>{
    validator()
  },[inputHandler])


  const  submit = async()=> {

    const date = new Date(transactionData.date)
    transactionData.date = date
    const request = await axios.post(`${process.env.API_URL}/transaction`,transactionData)
    const response = await request.data

    if(response.state){
      dispatch(setTransaction(transactionData))
    }
    props.toggle()
    reset()
  }

  function reset(){
    setTransactionData({title:'',icon:'',type:'',date:new Date(),note:'',amount:0})
  }

  return (
    <>
      <Modal centered show={props.show} onHide={props.toggle} style={{ border: 'none', boxShadow: '2px 4px 8px 2px rgba(34,41,47,.12)!important' }}>
        <Modal.Header closeButton style={{ border: 'none' }}>
          <Modal.Title>Add new transaction</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='row align-items-center justify-content-center'>
          <div className='col-sm-12 col-md-6 col-lg-6'>
            <TransactionCategorySelector  setTransactionIdTitleTypeAndIcon={setTransactionIdTitleTypeAndIcon}/>
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
          <button className='btn btn-outline-primary me-2'onClick={()=>{reset();props.toggle()}}>Cancel</button>
          <button disabled={disable} className='btn btn-primary'onClick={submit}>Confirm</button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  )
}

import {useEffect, useState} from 'react'
import EditTransactionModal from './EditTransactionModal'
import Swal from 'sweetalert2'
import axios from 'axios'
import { useSelector ,useDispatch } from 'react-redux'
import { deleteOneTransaction } from '../../store/slices/transactionSlice'
export default function TransactionListItem({ data,showDivider }) {
  let [showEditModal,setShowEditModal] = useState(false)
  const dispatch = useDispatch()

  const userId = useSelector((state)=>state.user.id)
 
  const [transaction,setTransaction] = useState({})
  
  useEffect(()=>{
    setTransaction(data)
  },[])

  const modalToggle = ()=>{
    setShowEditModal((prev)=> !prev)
  }


  const showDeleteDialog = ()=>{
    Swal.fire({
      title: 'Are you sure you want to delete this transaction?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirm'
    }).then((result) => {

      if (result.isConfirmed) {    
        axios.delete(`${process.env.API_URL}/transaction/${transaction.id}`,{userId:transaction.userId},{headers:{token:userId}})
        .then((response)=>{
          dispatch(deleteOneTransaction(transaction.id))
          Swal.fire({
            title:'Deleted!',
            text:'Your Transaction has been deleted.',
            icon:'success',
            confirmButtonColor:'#28a745'
          })
        }).catch((err)=>{
          Swal.fire({
            title:'Error',
            text:'Something went wrong , try again later.',
            icon:'error',
            confirmButtonColor:'#dc3545',
            confirmButtonText:'Close'
          })
         })
       }  
    })
  }
  return (
    <>
      <div className='p-2'>
        <div className='py-2'>{data.createAt}</div>
        <div className='row align-items-center justify-content-center'>
          <div className='col-2'>
            <img src={`/icons/categories/categories_icon/${data.icon}`} style={{ borderRadius: '50%' }} />
          </div>
          <div className='col-6'>
            <div style={{ width: '100%' }} className='row align-items-center justify-content-start'>
              <div className='col-lg-4 col-md-4 col-sm-12' style={{ fontSize: '1rem' }}>{data.title}</div>
              <div className='col-lg-4 col-md-4 col-sm-12' style={{ fontSize: '0.8rem' }}>{data.category}</div>
              <div className='col-lg-4 col-md-4 col-sm-12' style={{ fontSize: '0.8rem' }}>{data.note}</div>
            </div>
          </div>
          <div className='col-4 text-end'>
            <button onClick={showDeleteDialog} className='btn btn-danger me-2' style={{padding: '0px', border: 'none', background: '#e06476' }}>
              <span>
                <img src='/icons/transaction/delete.svg' style={{ padding: '5px' }} />
              </span>
            </button>
            <button onClick={modalToggle} className='btn btn-success' style={{ padding: '0px', border: 'none', background: '#72c541' }}>
              <span>
                <img src='/icons/transaction/edit.svg' style={{ padding: '5px' }} />
              </span>
            </button>
          </div>
        </div>
      </div>
      {showDivider && <hr className="dropdown-divider my-2" style={{ maxWidth: '90%', margin: '0 auto' }} /> }
      <EditTransactionModal show={showEditModal} toggle={modalToggle} itemId={data.id} />
    </>
  )
}

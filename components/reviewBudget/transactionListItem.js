import {useEffect, useState} from 'react'
import { useSelector ,useDispatch } from 'react-redux'
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
          </div>
        </div>
      </div>
      {showDivider && <hr className="dropdown-divider my-2" style={{ maxWidth: '90%', margin: '0 auto' }} /> }
    </>
  )
}

import {useState} from 'react'
import Link from 'next/link'
import EditBudgetModal from './EditBudgetModal'
export default function Breadcrumb({budget,isLoad}) {
  var [modal,showModal] = useState(false)

  const toggle = ()=>{
    showModal(!modal)
  }
  return (
    <>
    <div style={{width:'100%',background:'white',borderRadius:'8px',boxShadow:'2px 4px 8px 2px rgba(34,41,47,.12)!important'}}>
        <div className='p-4 row align-items-center justify-content-between'>
          <div className='col-6 text-start fs-6'>
              <Link href={`/dashboard/budget`}>
                 <a style={{color:'#324c5b',textDecoration:'none'}} >
                     {`Budgets`}
                     <span className='px-3'>{`>`}</span>
                </a>
              </Link>
              {budget.name && budget.name}
              <span className='px-3'>{`>`}</span>
              </div>
          <div className='col-6 text-end'>
              <button style={{background:'#e7f9f3',color:'#12c48b',border:'none'}} className='btn btn-success'>
                  <div className='px-2 py-0' onClick={toggle}>Edit</div>
              </button>
          </div>
        </div>
      </div>
     <EditBudgetModal show={modal} toggle={toggle}  data={budget} isLoad={isLoad}/>
    </>
  )
}

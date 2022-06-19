import { useDispatch,useSelector } from 'react-redux'
import { deleteOneBudget } from '../../store/slices/budgetSlice'
import Swal from 'sweetalert2'
import axios from 'axios'
export default function DeleteBudget({budgetId}) {

    const dispatch = useDispatch()
    const userId = useSelector((state)=>state.user.id)
    
    const showDeleteDialog = ()=>{
        Swal.fire({
          title: 'Are you sure you want to delete this budget?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Confirm'
        }).then((result) => {
    
          if (result.isConfirmed) {    
            axios.delete(`${process.env.API_URL}/budget/${budgetId}`,{headers:{token:userId}})
            .then((response)=>{
              dispatch(deleteOneBudget(budgetId))
              Swal.fire({
                title:'Deleted!',
                text:'Your Budget has been deleted.',
                icon:'success',
                confirmButtonColor:'#28a745'
              })
              window.location.href = '/dashboard/budget'
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
    <div className='text-center py-3 mt-4' style={{background:'white',borderRadius:'8px',width:'100%',boxShadow: '1px 1px 4px 1px rgba(34,41,47,0.12)!important'}}>
        <button onClick={showDeleteDialog} className='btn btn-danger' style={{border:'none',background:'rgba(241, 76, 82,0.3)',color:'#f14c52'}}>Delete</button>
    </div>
    </>
  )
}

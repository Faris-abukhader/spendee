import {useState} from 'react'
import { useRouter } from 'next/router'
import ClientLayout from '../../../components/layout/Client'
import Accounts from '../../../components/settings/Accounts'
import AllCategories from '../../../components/settings/AllCategories'
import Support from '../../../components/settings/Support'
import { useSession } from 'next-auth/react'
export default function index() {
  const {data:session,status} = useSession()

  console.log(session)

  const router = useRouter()
  let {query} = router
  var [option,chooseOption] = useState(query.option ? query.option:1)
  function buttonHandler(event){
    router.replace({
      query: { ...router.query, option: event.target.name },
   });   
    chooseOption(Number.parseInt(event.target.name))
  }
  return (
    <ClientLayout>
     <div className='p-3'>
       <div className='row justify-content-center align-items-top'>
       {/* <div className='d-none d-lg-block d-md-block d-xl-none' style={{width:'100%',display:'flex',flexDirection:'row',justifyContent:'center'}}>
           <button className='btn btn-light mb-2 p-3' style={{width:'100%',fontSize:'12px'}} name='1' onClick={buttonHandler}>Account</button>
           <button className='btn btn-light mb-2 p-3' style={{width:'100%',fontSize:'12px'}} name='2' onClick={buttonHandler}>All Categories</button>
           <button className='btn btn-light mb-2 p-3' style={{width:'100%',fontSize:'12px'}} name='3' onClick={buttonHandler}>Support</button>
           </div> */}
       <div className='col-sm-12 col-md-2 col-lg-2 p-0 m-0 pe-1'>
       {/* <div style={{width:'100%',display:'flex',flexDirection:'row',justifyContent:'center'}}> */}
           <button className='btn btn-light mb-2 p-3' style={{width:'100%',fontSize:'12px'}} name='1' onClick={buttonHandler}>Account</button>
           <button className='btn btn-light mb-2 p-3' style={{width:'100%',fontSize:'12px'}} name='2' onClick={buttonHandler}>All Categories</button>
           <button className='btn btn-light mb-2 p-3' style={{width:'100%',fontSize:'12px'}} name='3' onClick={buttonHandler}>Support</button>
           {/* </div> */}
         </div>
         <div className='col-sm-12 col-md-10 col-lg-10 p-1 m-0' style={{background:'white',borderRadius:'5px'}}>
           {option==1 && <Accounts/>}
           {option==2 && <AllCategories/>}
           {option==3 && <Support/>}
         </div>
       </div>
     </div>
    </ClientLayout>
  )
}

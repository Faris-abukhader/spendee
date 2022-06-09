import { useState } from "react"
import AddNewBudgetModal from "./AddNewBudgetModal"
export default function AddNewBudgetCard() {
    var [showModal,setShowModal] = useState(false)

    function modalToggle(){
        setShowModal(!showModal)
    }
  return (
      <>
            <div className='col-lg-4 col-md-3 col-sm-6 col-xs-12 p-2 '>
      <div className=" text-center py-5" style={{height:'200px',background:'white',borderRadius:'8px',boxShadow:'2px 4px 8px 2px rgba(34,41,47,.12)!important'}}>
     <div style={{color:'black',opacity:'0.7'}}>Take control of your expenses and save more money with budgets!</div>
     <div className="px-2">
     <button onClick={modalToggle} className="btn btn-success btn-sm mt-2" style={{background:'#18b272',border:'none',width:'100%'}}>Create a new budget</button>
     </div>
    </div>
    </div>
    <AddNewBudgetModal show={showModal} toggle={modalToggle}/>
    </>
  )
}

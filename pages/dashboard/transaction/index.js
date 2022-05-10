import {useState} from 'react'
import ClientLayout from '../../../components/layout/Client'
import AddNewTransactionModal from '../../../components/transaction/AddNewTransactionModal'
export default function index() {
    var [showModal,dispatchModal] = useState(false) 
    const handleClose = () => dispatchModal(false);
    const handleShow = () => dispatchModal(true);  
    function modalToggle(){
        console.log('hello ',showModal)
        dispatchModal(!showModal)
    }
    return (
        <ClientLayout>
            <div className='py-3'>
                <h3 className='py-2'>Transaction</h3>
                <button onClick={modalToggle} style={{ background: '#00cc8b', border: 'none', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} className='btn btn-success'>
                    <svg className='pe-1' xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-plus-circle-fill" viewBox="0 0 16 16">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
                    </svg>
                    Add new transaction
                </button>
                <AddNewTransactionModal show={showModal} toggle={modalToggle}/>
            </div>
        </ClientLayout>
    )
}

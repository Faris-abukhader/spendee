import {useState} from 'react'
import ClientLayout from '../../../components/layout/Client'
import AddNewTransactionModal from '../../../components/transaction/AddNewTransactionModal'
import OverviewCard from '../../../components/home/OverviewCards'
import TransactionList from '../../../components/transaction/TransactionList'
export default function index() {
    var [showModal,dispatchModal] = useState(false) 
    var [transactions,setTransactions] = useState([])
    const modalToggle = ()=>{
        console.log('hello ',showModal)
        dispatchModal(!showModal)
    }

    const data = [
        {
            id:'123',
            title:'Food',
            isExpense:true,
            category:'Foot & drink',
            note:'just test',
            amount:120,
            createAt:'Mar 2022-5-5',
            icon:'food.svg'
        },
        {
            id:'123',
            title:'Food',
            isExpense:true,
            category:'Foot & drink',
            note:'just test',
            amount:120,
            createAt:'Mar 2022-5-5',
            icon:'food.svg'
        },
        {
            id:'123',
            title:'Food',
            isExpense:true,
            category:'Foot & drink',
            note:'just test',
            amount:120,
            createAt:'Mar 2022-5-5',
            icon:'entertain.svg'
        },
        {
            id:'123',
            title:'Bus',
            isExpense:true,
            category:'transportation',
            note:'just test',
            amount:120,
            createAt:'Mar 2022-5-5',
            icon:'transport.svg'
        },
        {
            id:'123',
            title:'Test',
            isExpense:true,
            category:'Foot & drink',
            note:'just test',
            amount:120,
            createAt:'Mar 2022-5-5',
            icon:'wallet.svg'
        }
    ]

    return (
        <ClientLayout>
            <div className='py-3 px-0'>
                <h3 className='py-2'>Transaction</h3>
                <button onClick={modalToggle} style={{ background: '#00cc8b', border: 'none', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} className='btn btn-success btn-sm'>
                    <svg className='pe-1' xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-plus-circle-fill" viewBox="0 0 16 16">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
                    </svg>
                    Add new transaction
                </button>
                <AddNewTransactionModal show={showModal} toggle={modalToggle}/>

                {transactions ? 
                <>
                 <OverviewCard/>
                <TransactionList data={data}/>
                </>
                :
                
                <div style={{width:'100%'}} className='text-center mt-5'>
                <img src='/icons/home/no_transaction.svg'/>
                <br/>
                <small style={{opacity:'0.8'}}>You have no transactions yet</small>
                </div>
                }
                

            </div>
        </ClientLayout>
    )
}

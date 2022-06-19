import { useEffect, useState } from 'react'

export default function WalletCard({transactions}) {
    const [cardAmount,setCardAmount] = useState(0)
    var tempTransactionAmount = 0
  
    const calculateTransactionAmount = ()=>{ 
      transactions.map((item) => {
        if (item.type == 'expense') {
            tempTransactionAmount -= item.amount
        } else {
            tempTransactionAmount += item.amount
        }
      })  
      setCardAmount(tempTransactionAmount)
      tempTransactionAmount = 0
    }
  

    useEffect(()=>{
     calculateTransactionAmount()
    },[transactions])
    return (
        <div className="row align-items-center justify-content-center" style={{ width: '250px', height: '120px', background: 'white', borderRadius: '8px', boxShadow: '1px 1px 4px 1px rgba(34,41,47,0.12)!important' }}>
            <div className='col-3 text-center'>
                <img className='ms-2' src='/icons/home/wallet.svg' />
            </div>
            <div className='col-9 text-start'>
                <div>
                    <h4>Cash</h4>
                    <div style={{color:cardAmount>=0?'green':'red'}}>{cardAmount} USD</div>
                </div>
            </div>
        </div>
    )
}

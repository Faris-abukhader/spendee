import {useState,useEffect} from 'react'

export default function BudgetProgress({transactions,amount,progressNumbers,messageIndex}) {
    var messages = [
        `Keep spending. You can spend ${progressNumbers.youCanSpend} USD each day for the rest of the period.`,
        `out of period`,
        ` over`
    ]
    var [percentage,setPercentage] = useState(0)
    var [reminder ,setReminder] = useState(0)
    var [message,setMessage] = useState(messages[messageIndex])





    const percentageHandler = ()=>{
        let totalAmount = 0
        if(transactions){
            transactions.map((item)=>{
                totalAmount+=item.amount
             })     
        }
        setReminder(amount-totalAmount)
        setPercentage(totalAmount/amount * 100)
    }

    useEffect(()=>{
     percentageHandler()
     setMessage(messages[messageIndex])
    },[progressNumbers])


    const changeIndicatorColor = () => ({
        width: `${percentage}%`,
        background: `rgb(24, 178, 114)`,
        height: '35px'
    })

    return (
        <div style={{ width: '100%', background: 'white', border: 'none', borderRadius: '8px', boxShadow: '2px 4px 8px 2px rgba(34,41,47,.12)!important' }}>
            <div className='p-2'>
                <div className='text-start my-2 mb-1'>
                    Budget progress
                </div>
                <div className='text-center my-4'>
                    {message && message}
                </div>

                <div className='row justify-content-center align-items-center my-5'>
                    <div className='col-9'>
                    <div  className='progress' style={{ height: '35px' }}>
                        <div className='prgoress-bar' style={changeIndicatorColor()}><div className='ms-2' style={{ fontSize: '15px' }}>{percentage.toFixed(2)}%</div></div>
                    </div>
                    </div>
                </div>



            </div>
        </div>
    )
}

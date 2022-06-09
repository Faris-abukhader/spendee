import React from 'react'

export default function BudgetProgress() {

    const changeIndicatorColor = () => ({
        width: `${40}%`,
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
                    Keep spending. You can spend 24.00 USD each day for the rest of the period.
                </div>

                <div className='row justify-content-center align-items-center my-5'>
                    <div className='col-9'>
                    <div  className='progress' style={{ height: '35px' }}>
                        <div className='prgoress-bar' style={changeIndicatorColor()}><div className='ms-2' style={{ fontSize: '15px' }}>{40}%</div></div>
                    </div>
                    </div>
                </div>



            </div>
        </div>
    )
}

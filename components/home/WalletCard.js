import React from 'react'

export default function WalletCard({amount}) {
    return (
        <div class="row align-items-center justify-content-center" style={{ width: '250px', height: '120px', background: 'white', borderRadius: '8px', boxShadow: '2px 4px 8px 2px rgba(34,41,47,.12)!important' }}>
            <div className='col-3 text-center'>
                <img className='ms-2' src='/icons/home/wallet.svg' />
            </div>
            <div className='col-9 text-start'>
                <div>
                    <h4>Cash</h4>
                    <div style={{color:amount>0?'green':'red'}}>{amount>0 ? '+':'-'}{amount} USD</div>
                </div>
            </div>
        </div>
    )
}

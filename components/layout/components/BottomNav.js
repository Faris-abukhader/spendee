import Link from "next/link"
export default function BottomNav() {
    return (
        <nav class="bottomMenu navbar navbar-light justify-content-center fixed-bottom py-0 d-lg-none" style={{ backgroundColor: 'none' }}>
            <ul class="navbar-nav list-group-horizontal mb-4 py-1" style={{ boxShadow: '2px 4px 8px 2px rgba(34,41,47,.12)!important', minWidth: '90%', background: 'white', borderRadius: '40px' }}>
                <div className='row align-items-center justify-content-center' style={{ width: '100%' }}>
                    <div className='col-4 text-center'>
                        <div className='row align-items-center justify-content-center'>
                            <div className='col-6 btn' style={{ color: 'rgb(0,157,255)' }}>
                                <img src='/icons/nav/transaction.svg' style={{ color: 'rgb(0,157,255)' }} />
                                <br />
                                <small>Transaction</small>
                            </div>
                            <div className='col-6 btn' style={{ color: 'rgb(0,157,255)' }}>
                                <img src='/icons/nav/budget.svg' style={{ color: 'rgb(225,210,0)' }} />
                                <br />
                                <small>Budget</small>
                            </div>
                        </div>
                    </div>
                </div>
            </ul>
        </nav>
    )
}

import Link from "next/link"
export default function BottomNav() {
    return (
        <nav class="bottomMenu navbar navbar-light justify-content-center fixed-bottom py-0 d-lg-none" style={{ backgroundColor: 'none' }}>
            <ul class="navbar-nav list-group-horizontal mb-4 py-1" style={{ boxShadow: '2px 4px 8px 2px rgba(34,41,47,.12)!important', minWidth: '90%', background: 'white', borderRadius: '40px' }}>
                <div className='row align-items-center justify-content-center' style={{ width: '100%' }}>
                    <div className='col-8 text-center'>
                        <div className='row align-items-center justify-content-center'>
                            <Link href={`/dashboard/transaction`}>
                            <div className='col-4 btn p-0 m-0' style={{ color: 'rgb(0,157,255)' }}>
                                <img src='/icons/nav/transaction.svg' style={{ color: 'rgb(0,157,255)' }} />
                                <br />
                                <small style={{fontSize:'0.7rem'}}>Transaction</small>
                            </div>
                            </Link>
                            <Link href={`/dashboard/buget`}>
                            <div className='col-4 btn p-0 m-0' style={{ color: 'rgb(0,157,255)' }}>
                                <img src='/icons/nav/budget.svg' style={{ color: 'rgb(225,210,0)' }} />
                                <br />
                                <small style={{fontSize:'0.7rem'}}>Budget</small>
                            </div>
                            </Link>
                            <Link href={`/dashboard/settings`}>
                            <div className='col-4 btn p-0 m-0' style={{ color: 'rgb(0,157,255)' }}>
                                <img src='/icons/nav/settings.svg' style={{ color: 'rgb(225,210,0)' }} />
                                <br />
                                <small style={{fontSize:'0.7rem'}}>Settings</small>
                            </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </ul>
        </nav>
    )
}

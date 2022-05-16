import { useState } from 'react'
import OffCanvas from './OffCanvas'
import { Dropdown, ButtonGroup } from 'react-bootstrap'
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import { useSelector } from 'react-redux'
export default function Nav() {
    var [showOffCanvas, setShowOffCanvas] = useState(false)
    const user = useSelector((state)=>state.user[0].user[0])

    function toggleOffCanvas() {
        setShowOffCanvas(!showOffCanvas)
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light" style={{ boxShadow: "0px 1px 5px rgba(128, 128, 128, 0.5)" }}>
                <div className="container-fluid my-0 py-0" style={{ width: '100%' }}>
                    <Link href={`/`}>
                    <a className="navbar-brand">
                        <img src="/Ahmed/Pictures/logo.png" width="200" height="45" />
                    </a>
                    </Link>
                    <button className="navbar-toggler" type="button" onClick={toggleOffCanvas} >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link href={`/dashboard/transaction`}>
                                <a className="nav-link active" aria-current="page"><strong>Transactions</strong></a>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link  href={`/dashboard/budget`}>
                                <a className="nav-link" href="#"><strong>Budget</strong></a>
                                </Link>
                            </li>
                            <li className="nav-item">
                               <Link href={`/dashboard/settings`}>
                                <a className="nav-link" href="#"><strong>Settings</strong></a>
                                </Link>
                            </li>
                        </ul>
                        <div className="dropdown ms-auto">
                            <Dropdown as={ButtonGroup}>
                                <butt className='btn btn-light' style={{ border:'none',background: 'none' }}>
                                    <img className="img-fluid mx-2" src={user.image ? user.image:`/icons/nav/user.svg`} alt="user_icon" style={{ borderRadius: '50%',width:'40px',height:'40px' }} />
                                    <span>{user.username}</span>
                                </butt>
                                <Dropdown.Toggle split variant="light" id="dropdown-split-basic" style={{ border:'none',background: 'none' }} />
                                <Dropdown.Menu>
                                    <Dropdown.Item href="/dashboard/settings?option=1">Settings</Dropdown.Item>
                                    <Dropdown.Item href="/dashboard/settings?option=3">Support</Dropdown.Item>
                                    <Dropdown.Divider />
                                    <Dropdown.Item onClick={signOut}>Sign out</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    </div>
                </div>
            </nav>
            <OffCanvas show={showOffCanvas} showToggle={toggleOffCanvas} />
        </>
    )
}

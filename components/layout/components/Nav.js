import { useState } from 'react'
import OffCanvas from './OffCanvas'
import { Dropdown, DropdownButton } from 'react-bootstrap'
export default function Nav() {
    var [showOffCanvas, setShowOffCanvas] = useState(false)

    function toggleOffCanvas() {
        setShowOffCanvas(!showOffCanvas)
    }
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light" style={{ boxShadow: "0px 1px 5px rgba(128, 128, 128, 0.5);" }}>
                <div className="container-fluid my-0 py-0" style={{ width: '100%' }}>
                    <a className="navbar-brand" href="#">
                        <img src="/Ahmed/Pictures/logo.png" width="200" height="45" />
                    </a>
                    <button className="navbar-toggler" type="button" onClick={toggleOffCanvas} >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="#"><strong>Transactions</strong></a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#"><strong>Budget</strong></a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#"><strong>Wallet</strong></a>
                            </li>
                        </ul>
                        <div className="dropdown ms-auto">
                            <DropdownButton
                                variant="outline-secondary"
                                title="Dropdown"
                                id="input-group-dropdown-1">
                                <Dropdown.Item href="#">Action</Dropdown.Item>
                                <Dropdown.Item href="#">Another action</Dropdown.Item>
                                <Dropdown.Item href="#">Something else here</Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item href="#">Separated link</Dropdown.Item>
                            </DropdownButton>
                        </div>
                    </div>
                </div>
            </nav>
            <OffCanvas show={showOffCanvas} showToggle={toggleOffCanvas} />
        </>
    )
}

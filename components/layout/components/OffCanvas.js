import React from 'react'
import { Offcanvas, Dropdown, DropdownButton } from 'react-bootstrap'
import { signOut } from 'next-auth/react';
import Link from 'next/link';
export default function OffCanvas(props) {   
    return (
      <>  
        <Offcanvas show={props.show} onHide={props.showToggle}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Sidelist</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Link href='/dashboard/settings?option=1'>
          <a className='btn btn-lg btn-light mb-3' style={{background:'#45a7e6',width:'100%'}}>settings</a>
          </Link>
          <Link href='/dashboard/settings?option=3'>
          <a className='btn btn-lg btn-light mb-3' style={{background:'#45a7e6',width:'100%'}}>Support</a>
          </Link>
          <button onClick={signOut} className='btn btn-lg btn-light mb-3' style={{background:'#45a7e6',width:'100%'}}>Sign out</button>
            </Offcanvas.Body>
        </Offcanvas>
      </>
    );
}

import React from 'react'
import { Offcanvas, Dropdown, DropdownButton } from 'react-bootstrap'

import Link from 'next/link';
export default function OffCanvas(props) { 
            
    return (
      <>  
        <Offcanvas show={props.show} onHide={props.showToggle}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Sidelist</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
          <div>
            Some text as placeholder. In real life you can have the elements you have chosen. Like, text, images, lists, etc.
          </div>
          <div class="dropdown mt-3">
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
            </Offcanvas.Body>
        </Offcanvas>
      </>
    );
}

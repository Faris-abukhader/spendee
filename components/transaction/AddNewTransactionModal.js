import { useState } from 'react'
import { Modal, Button, FloatingLabel,Form } from 'react-bootstrap'
export default function addNewTransactionModal(props) {

  function submit() {
    // todo . . .
    props.toggle()
  }
  return (
    <>
      <Modal centered show={props.show} onHide={props.toggle} style={{ border: 'none', boxShadow: '2px 4px 8px 2px rgba(34,41,47,.12)!important' }}>
        <Modal.Header closeButton style={{ border: 'none' }}>
          <Modal.Title>Add new transaction</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='row align-items-center justify-content-center'>
            <div className='col-sm-12 col-md-6 col-lg-6'>
              <FloatingLabel
                controlId="floatingInput"
                label="Email address"
                className="mb-3">
                <Form.Control type="email" placeholder="name@example.com" />
              </FloatingLabel>
            </div>
            <div className='col-sm-12 col-md-6 col-lg-6'>
              <FloatingLabel
                controlId="floatingInput"
                label="Email address"
                className="mb-3">
                <Form.Control type="email" placeholder="name@example.com" />
              </FloatingLabel>
            </div>
          </div>

        </Modal.Body>
        <Modal.Footer style={{ border: 'none' }}>
          <Button variant="secondary" onClick={props.toggle}>
            Close
          </Button>
          <Button variant="primary" onClick={submit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

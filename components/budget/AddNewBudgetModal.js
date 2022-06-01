import { useState, useEffect } from 'react'
import { Modal, FloatingLabel, Form } from 'react-bootstrap'
import styles from '../../styles/budget.module.css'
import BudgetCategoriesSelector from './BudgetCategoriesSelector'
export default function addNewBudgetModal(props) {
    let [budgetData, setBudgetData] = useState({ title: '', targetCategories: [],startDate:new Date(),endDate: new Date(), note: '', amount: 0 })
    let [disable, setDisable] = useState(true)
    const setTransactionCategories = (categories) => {
        setBudgetData((prevs) => {
            return {
                ...prevs,
                ['targetCategories']: [...categories],
            }
        })
    }

    const inputHandler = (event) => {
        const { name, value } = event.target
        setBudgetData((prevs) => {
            return {
                ...prevs,
                [name]: value
            }
        })
    }

    function validator() {
        if (budgetData.amount > 0 && budgetData.icon.length > 0 && budgetData.note.length > 0) {
            setDisable(false)
        } else {
            setDisable(true)
        }
    }

    useEffect(() => {
        validator()
    }, [inputHandler])


    function submit() {
        // todo . . .
        console.log(budgetData)
        props.toggle()
        reset()
    }

    function reset() {
        setBudgetData({ title: '', icon: '', type: '', date: new Date(), note: '', amount: 0 })
    }
    return (
        <>
            <Modal size={`xl`} centered show={props.show} onHide={props.toggle} style={{ border: 'none', boxShadow: '2px 4px 8px 2px rgba(34,41,47,.12)!important' }}>
                <Modal.Header closeButton style={{ border: 'none' }}>
                    <Modal.Title>Add New Budget</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ border: 'none' }}>
                    <div className='row align-items-center justify-content-center'>
                        <div className='my-3' style={{ fontSize: '1rem' }}><img className='me-2' src='/icons/budget/general.svg' />General Info</div>
                        <div className='col-sm-12 col-md-6 col-lg-6'>
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Title"
                                className="mb-3">
                                <Form.Control type={`text`} name='title' value={budgetData.title} onChange={inputHandler} />
                            </FloatingLabel>
                        </div>
                        <div className='col-sm-12 col-md-6 col-lg-6'>
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Amount"
                                className="mb-3">
                                <Form.Control type={`number`} name='amount' value={budgetData.amount} onChange={inputHandler} />
                            </FloatingLabel>
                        </div>
                        <div className='col-sm-12 col-md-6 col-lg-6'>
                            <div className='my-3' style={{ fontSize: '1rem' }}><img className='me-2' src='/icons/budget/filter.svg' />Budget Category</div>
                            <small style={{ color: 'rgb(0,0,0,0.7)' }}>category</small>
                            <div className='py-3' style={{ width: '100%', display: 'flex', flexDirection: 'row', alignContent: 'center', justifyContent: 'start', overflowY: 'auto' }}>
                                <BudgetCategoriesSelector setTransactionCategories={setTransactionCategories} />
                            </div>
                        </div>
                        <div className='col-sm-12 col-md-6 col-lg-6'>
                        </div>
                        <div className='col-sm-12 col-md-6 col-lg-6'>
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Start date"
                                className="mb-3"
                            >
                                <Form.Control type={`date`} name='startDate' value={budgetData.startDate} onChange={inputHandler} />
                            </FloatingLabel>
                        </div>
                        <div className='col-sm-12 col-md-6 col-lg-6'>
                        <FloatingLabel
                                controlId="floatingInput"
                                label="End date"
                                className="mb-3"
                            >
                                <Form.Control type={`date`} name='endDate' value={budgetData.endDate} onChange={inputHandler} />
                            </FloatingLabel>
                        </div>
                    </div>

                </Modal.Body>
                <Modal.Footer className='text-center' style={{ border: 'none' }}>
                    <div style={{ margin: '0 auto' }}>
                        <button className='btn btn-outline-primary me-2' onClick={() => { reset(); props.toggle() }}>Cancel</button>
                        <button disabled={disable} className='btn btn-primary' onClick={submit}>Confirm</button>
                    </div>
                </Modal.Footer>
            </Modal>
        </>
    )
}

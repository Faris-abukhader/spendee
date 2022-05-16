import { useState, useEffect } from 'react'
import { Modal, FloatingLabel, Form } from 'react-bootstrap'
import styles from '../../styles/budget.module.css'
import BudgetCategoriesSelector from './BudgetCategoriesSelector'
export default function addNewBudgetModal(props) {
    let [budgetData, setBudgetData] = useState({ title: '', targetCategories: '', recurrence: 'once', note: '', amount: 0 })
    let [disable, setDisable] = useState(true)
    const setTransactionTitleTypeAndIcon = (title, type, icon, backgroundColor) => {
        setBudgetData((prevs) => {
            return {
                ...prevs,
                ['title']: title,
                ['type']: type,
                ['icon']: icon
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
                            <div className='my-3' style={{ fontSize: '1rem' }}><img className='me-2' src='/icons/budget/filter.svg' />Budget Period</div>
                            <small style={{ color: 'rgb(0,0,0,0.7)' }}>recurrence</small>
                            <div className='py-3' style={{ width: '100%', display: 'flex', flexDirection: 'row', alignContent: 'center', justifyContent: 'start', overflowY: 'auto' }}>
                                <BudgetCategoriesSelector />
                            </div>
                        </div>
                        <div className='col-sm-12 col-md-6 col-lg-6'>
                        </div>
                        <div className='col-sm-12 col-md-12 col-lg-12'>
                            <div className='my-3' style={{ fontSize: '1rem' }}><img className='me-2' src='/icons/budget/period.svg' />Budget Period</div>
                            <small style={{ color: 'rgb(0,0,0,0.7)' }}>recurrence</small>
                            <div className='py-3' style={{ width: '100%', display: 'flex', flexDirection: 'row', alignContent: 'center', justifyContent: 'start', overflowY: 'auto' }}>
                                <button onClick={inputHandler} name={`recurrence`} value={`once`} className={styles.btn} style={{ background: budgetData.recurrence == 'once' ? '#18b272' : '#f8f9fa' }}>Once</button>
                                <button onClick={inputHandler} name={`recurrence`} value={`daily`} className={styles.btn} style={{ background: budgetData.recurrence == 'daily' ? '#18b272' : '#f8f9fa' }}>Daily</button>
                                <button onClick={inputHandler} name={`recurrence`} value={`weekly`} className={styles.btn} style={{ background: budgetData.recurrence == 'weekly' ? '#18b272' : '#f8f9fa' }}>Weekly</button>
                                <button onClick={inputHandler} name={`recurrence`} value={`monthly`} className={styles.btn} style={{ background: budgetData.recurrence == 'monthly' ? '#18b272' : '#f8f9fa' }}>Monthly</button>
                                <button onClick={inputHandler} name={`recurrence`} value={`yearly`} className={styles.btn} style={{ background: budgetData.recurrence == 'yearly' ? '#18b272' : '#f8f9fa' }}>Yearly</button>
                            </div>
                        </div>
                        <div className='col-sm-12 col-md-6 col-lg-6'>
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Start date"
                                className="mb-3"
                            >
                                <Form.Control type={`date`} name='date' value={budgetData.date} onChange={inputHandler} />
                            </FloatingLabel>
                        </div>
                        <div className='col-sm-12 col-md-6 col-lg-6'>
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

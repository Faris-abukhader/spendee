import { useState, useEffect } from 'react'
import { Modal, FloatingLabel, Form } from 'react-bootstrap'
import BudgetCategoriesSelector from '../budget/BudgetCategoriesSelector'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { modifyOneBudget } from '../../store/slices/budgetSlice'
export default function editBudgetModal(props) {
    let [budgetData, setBudgetData] = useState({ userId: '',id:'', name: '', targetCategories: [], startedDate: new Date(), endDate: new Date(), amount: 0 })
    let [disable, setDisable] = useState(true)
    const dispatch = useDispatch()
    const userId = useSelector(state => state.user.id)

    
    const setBudget = () => {
        setBudgetData({
            userId: userId,
            id:props.data.id,
            name:props.data.name,
            targetCategories:props.data.categories,
            startedDate:props.data.startedDate && props.data.startedDate.substring(0,10),
            endDate:props.data.endDate && props.data.endDate.substring(0,10),
            amount:props.data.amount
            
        })
    }
    const setTransactionCategories = (categories) => {
        setBudgetData((prevs) => {
            return {
                ...prevs,
                ['targetCategories']: categories,
            }
        })
    }
    
    const inputHandler = (event) => {
        const { name, value } = event.target

        setBudgetData((prevs) => {
            return {
                ...prevs,
                [name]: name == 'amount' ? Number.parseInt(value) : value
            }
        })
    }

    function validator() {
        if (budgetData.amount > 0 && budgetData.targetCategories.length > 0 && budgetData.startedDate !== new Date() && budgetData.endDate !== new Date() && budgetData.startedDate < budgetData.endDate) {
            setDisable(false)
        } else {
            setDisable(true)
        }
    }

    useEffect(() => {
        validator()
    }, [inputHandler])

    useEffect(() => {
        setBudget()
    }, [props])

    async function submit() {
        let myBudget = budgetData;
        myBudget.startedDate = new Date(myBudget.startedDate)
        myBudget.endDate = new Date(myBudget.endDate)


        let targetCateg = myBudget.targetCategories.map((item)=>({id:item.id,categoryId:item.categoryId}))

        myBudget.targetCategories = targetCateg

        
        const request = await axios.put(`${process.env.API_URL}/budget/${myBudget.id}`, myBudget, { headers: { token: userId } })
        const data = request.data
        if (data.state) {
            dispatch(modifyOneBudget(data.data))
            props.isLoad((prevs)=>!prevs)
        }
        props.toggle()
        reset()
    }

    function reset() {
        setBudgetData({ userId: userId, name: '', targetCategories: [], startDate: new Date(), endDate: new Date(), note: '', amount: 0 })
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
                                <Form.Control type={`text`} name='name' value={budgetData.name} onChange={inputHandler} />
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
                                <BudgetCategoriesSelector setTransactionCategories={setTransactionCategories} pickedCategories={budgetData.targetCategories} />
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
                                <Form.Control type={`date`} name='startedDate' value={budgetData.startedDate} onChange={inputHandler} />
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

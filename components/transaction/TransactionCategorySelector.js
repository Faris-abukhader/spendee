import { useState,useEffect, useRef } from 'react'
import { OverlayTrigger, Popover,FloatingLabel,Button } from 'react-bootstrap';
import categoriesList from '../../public/icons/categories/categoriesList.json'
export default function TransactionCategorySelector(props) {
    const [show, setShow] = useState(false);
    const target = useRef(null);

    var [isExpense,setExpense] = useState(true)
    var [pickedCategory,selectCategory] = useState({title:'',icon:''})

    useEffect(()=>{
        selectCategory({title:props.title ? props.title:'',icon:props.icon ? props.icon:''})
    },[])


    const dispatchExpense = ()=>{setExpense(true)}
    const dispatchIncome = ()=>{setExpense(false)}
    const assignTarget = (title,icon) =>{selectCategory({title:title,icon:icon})}


    const expenseCategoryList = (
      categoriesList.filter((item)=>item.type=='expense').map((category)=><><button onClick={()=>{assignTarget(category.title,category.icon);props.setTransactionTypeAndIcon(category.title,category.type,category.icon);setShow(false)}} className='btn btn-light p-0' style={{background:'none'}}><img src={`/icons/categories/categories_icon/${category.icon}`} style={{borderRadius:'50%'}}/> <span>{category.title}</span></button><br/><br/></>)
    )

    const incomeCategoryList = (
        categoriesList.filter((item)=>item.type=='income').map((category)=><><button onClick={()=>{assignTarget(category.title,category.icon);props.setTransactionTypeAndIcon(category.title,category.type,category.icon);setShow(false)}} className='btn btn-light p-0' style={{background:'none'}}><img src={`/icons/categories/categories_icon/${category.icon}`} style={{borderRadius:'50%'}}/> <span>{category.title}</span></button><br/><br/></>)
    )
    

    const popover = (
        <Popover id="popover-basic">
            <Popover.Body style={{ maxWidth: '220px', alignItems: 'center', maxHeight: '50vh', overflowY: 'auto' }}>
               <div className='row align-items-center justify-content-center pb-3'>
                   <div className='col-6'>
                   <Button size={`sm`} onClick={dispatchExpense} style={{opacity:isExpense?1:0.8}}>Expense</Button>
                   </div>
                   <div className='col-6'>
                   <Button  size={`sm`} onClick={dispatchIncome} style={{opacity:isExpense?0.8:1}}>Income</Button>
                   </div>
               </div>
               {isExpense ? expenseCategoryList:incomeCategoryList}
            </Popover.Body>
        </Popover>
    );
    return (
        <>
            <OverlayTrigger show={show} trigger="click" placement="bottom" overlay={popover}>
                <button onClick={() => setShow(!show)} className='btn btn-light mb-3' style={{width:'100%',height:'58px',background:'white',border:'1px solid #ced4da'}}>
                   {pickedCategory.title.length > 0 ? <><img className='me-2 p-0 m-0' src={`/icons/categories/categories_icon/${pickedCategory.icon}`} style={{ borderRadius: '50%' }} />{pickedCategory.title}</>:<span>select category</span> }
                </button>
            </OverlayTrigger>
        </>
    )
}
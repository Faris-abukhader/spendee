import { useState, useEffect, useRef, Fragment } from 'react'
import { OverlayTrigger, Popover, FloatingLabel, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
export default function BudgetCategoriesSelector({setTransactionCategories}) {
    const categoriesList = useSelector(state=>state.transactionCategory[0])
    const [show, setShow] = useState(false);
    const target = useRef(null);
    const [selectedCategory,SetCategory] = useState([])


    const checkboxHandler = (event)=>{
     const {value,checked} = event.target
     SetCategory((prevs)=>{
         if(checked){
            if(prevs.map((item)=>item.categoryId).indexOf(value) == -1){
                return [...prevs,{categoryId:value}]
             }    
         }else{
           return prevs.filter((item)=>item.categoryId!=value)
         }
         return [...prevs]
     })
    }

    const toggle = ()=>{
        if(show){
            assignCateogry()
        }
        setShow(!show)
    }

    const assignCateogry = ()=>{
        console.log(selectedCategory)
     setTransactionCategories(selectedCategory)
    }

    console.log(selectedCategory.map((item)=>item.categoryId).indexOf('cl3s5wq4t0003z4qpt8qy6aor'))
    const ExpenseCategoryList = (
        categoriesList.filter((item) => item.type == 'expense').map((category) =>
            <Fragment key={category.id}>
                <div className='row align-items-center justify-content-start'>
                    <div className='col-12'>
                        <button style={{border:'none',background:'none'}}>
                          <div className="form-check">
                            <input className="form-check-input" onChange={checkboxHandler} checked={selectedCategory.map((item)=>item.categoryId).indexOf(category.id) != -1} type="checkbox" value={category.id} id="flexCheckChecked"/>
                              <img src={`/icons/categories/categories_icon/${category.icon}`} style={{width:'20px',height:'20px', borderRadius: '50%' }} />
                            <span className='ms-1'>{category.title}</span>
                        </div>
                      </button>
                    </div>
                </div>
            </Fragment>
        )
    )

    const popover = (
        <Popover id="popover-basic">
            <Popover.Body style={{ maxWidth: '280px', alignItems: 'center', maxHeight: '50vh', overflowY: 'auto' }}>
               {ExpenseCategoryList}
            </Popover.Body>
        </Popover>
    );
    return (
        <>
            <OverlayTrigger show={show} trigger="click" placement="bottom" overlay={popover}>
                <button onClick={toggle} className='btn btn-light mb-3' style={{ width: '100%', height: '58px', background: 'white', border: '1px solid #ced4da' }}>
                    choose category from here 
                </button>
            </OverlayTrigger>
        </>
    )
}

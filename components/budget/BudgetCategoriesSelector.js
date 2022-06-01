import { useState, useEffect, useRef, Fragment } from 'react'
import { OverlayTrigger, Popover, FloatingLabel, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
// import categoriesList from '../../public/icons/categories/categoriesList.json'

export default function BudgetCategoriesSelector({setTransactionCategories}) {
    const categoriesList = useSelector(state=>state.transactionCategory[0])
    console.log(categoriesList)
    const [show, setShow] = useState(false);
    const target = useRef(null);

    

    const CategoryList = (
        categoriesList.filter((item) => item.type == 'expense').map((category) =>
            <Fragment key={category.id}>
                <div className='row align-items-center justify-content-start'>
                    <div className='col-12'>
                        <button style={{border:'none',background:'none'}}>
                          <div className="form-check">
                            <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked"/>
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
                {CategoryList}
            </Popover.Body>
        </Popover>
    );

    return (
        <>
            <OverlayTrigger show={show} trigger="click" placement="bottom" overlay={popover}>
                <button onClick={() => setShow(!show)} className='btn btn-light mb-3' style={{ width: '100%', height: '58px', background: 'white', border: '1px solid #ced4da' }}>
                    choose category from here 
                    {/* {pickedCategory.title.length > 0 ? <><img className='me-2 p-0 m-0' src={`/icons/categories/categories_icon/${pickedCategory.icon}`} style={{ borderRadius: '50%' }} />{pickedCategory.title}</>:<span>select category</span> } */}
                </button>
            </OverlayTrigger>
        </>
    )
}

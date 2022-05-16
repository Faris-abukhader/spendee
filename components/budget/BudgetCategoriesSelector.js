import { useState, useEffect, useRef } from 'react'
import { OverlayTrigger, Popover, FloatingLabel, Button } from 'react-bootstrap';
import categoriesList from '../../public/icons/categories/categoriesList.json'

export default function BudgetCategoriesSelector() {
    const [show, setShow] = useState(false);
    const target = useRef(null);


    const CategoryList = (
        categoriesList.filter((item) => item.type == 'expense').map((category) =>
            <>
                <div className='row align-items-center justify-content-start'>
                    <div className='col-12'>
                        <button style={{border:'none',background:'none'}}>
                          <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked"/>
                              <img src={`/icons/categories/categories_icon/${category.icon}`} style={{width:'20px',height:'20px', borderRadius: '50%' }} />
                            <span className='ms-1'>{category.title}</span>
                        </div>
                      </button>
                    </div>
                </div>
            </>
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
                    click me 
                    {/* {pickedCategory.title.length > 0 ? <><img className='me-2 p-0 m-0' src={`/icons/categories/categories_icon/${pickedCategory.icon}`} style={{ borderRadius: '50%' }} />{pickedCategory.title}</>:<span>select category</span> } */}
                </button>
            </OverlayTrigger>
        </>
    )
}

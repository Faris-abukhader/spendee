import { useState, useRef } from 'react'
import { OverlayTrigger, Popover } from 'react-bootstrap';
import icons from '../../../public/icons/categories/iconsList.json'
export default function ColorSelector(props) {
    const [show, setShow] = useState(false);
    const target = useRef(null);
    const popover = (
        <Popover id="popover-basic">
            <Popover.Body style={{ maxWidth: '60px', alignItems: 'center', maxHeight: '50vh', overflowY: 'auto' }}>
                {icons.map((item, index) =>
                    <div key={index} style={{width:'100%'}} className='text-center mb-1'>
                        <button onClick={() => { setShow(!show); props.selectIcon({ icon: item.icon}) }} className='btn btn-light p-0' style={{ width: '34px', height: '34px', borderRadius: '50%'}}><img src={`/icons/categories/categories_icon/${item.icon}`} /></button>
                    </div>
                )}
            </Popover.Body>
        </Popover>
    );
    return (
        <>
            <OverlayTrigger show={show} trigger="click" placement="bottom" overlay={popover}>
                <button onClick={() => setShow(!show)} className='btn p-0' style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: props.icon.color }}>
                    <img src={`/icons/categories/categories_icon/${props.icon.icon}`} style={{ padding: '3px' }} />
                </button>
            </OverlayTrigger>
        </>
    )
}

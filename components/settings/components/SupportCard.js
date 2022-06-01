import React from 'react'
import Link from 'next/link'
import styles from "../../../styles/SupportCard.module.css"
export default function SupportCard(props) {
    return (
        <Link href={props.url?props.url:''}>
         <a className={styles.card}>
        <div className='card p-2 m-2'>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <div className='me-auto' style={{ display: 'flex', flexDirection: 'row' }}>
                    <img className='me-3' src={`/icons/support_icon/${props.icon}`} />
                    <div>{props.title}</div>
                </div>
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-right" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
                    </svg>
                </div>
            </div>
        </div>
        </a>
      </Link>
    )
}
